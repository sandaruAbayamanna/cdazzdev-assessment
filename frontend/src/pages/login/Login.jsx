import React, { useEffect, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  

  const [email, setEmail]  = useState("")
  const [password, setPassword] = useState("")
  const[error, setError] = useState(false)
  const[loading, setLoading] =useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
      //history.push('/')
      navigate('/')
    }
  },[])


  const submitHandler= async(e)=>{

    //prevent refreshing the page after submitting the form
    e.preventDefault()

    //console.log(email,password)

    try {

      const config={
        headers:{
          "content-type":"application/json",
        },
      }
      setLoading(true)

      const {data} = await axios.post('http://localhost:5555/auth/login',
      {
        email,
        password,
      },
      config
      )

      console.log(data)
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      
    } catch (error) {
       setError(error.response.data.message)
    }
  }
  
  return (
    <>
<div className='topWrapper'>
<div className="auth-header">
        <div className="auth-header-logo">
          <img src="" alt="" className="auth-header-logo-img" />
        </div>
        <h1 className="auth-header-title">Welcome to CDAZZDEV</h1>
        <p className="auth-header-subtitle">
          Sign-in to your account and start the adventure
        </p>
      </div>
      <div className="auth-body">
        <form className="auth-form-validation"
          onSubmit={submitHandler}
        >
          <div className="input-field">
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <input
              type="text"
              className="input-control"
              placeholder="example@gmail.com"
              autoComplete="off"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input-control"
              placeholder="Password"
              autoComplete="off"
              required
              value={password}
              onChange={(e) =>setPassword(e.target.value)}
            />
          </div>
          <div className="flex-end">
            <Link to={"/auth/forgot-password"} className="link-end">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="btn-submit">
            Sign in
          </button>
        </form>
        <p className="text-center">
          New on our platform?{" "}
          <Link to={"/register"} className="link-text-center">
            Create account here
          </Link>
        </p>
      </div>

      </div>
      </>
      
    
    
  )
}

export default Login