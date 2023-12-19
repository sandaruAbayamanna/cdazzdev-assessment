import { User } from '../models/user.js';
import expres from 'express'
import bcrypt from 'bcryptjs'
import Jwt  from 'jsonwebtoken';
import auth from '../middleware/auth.js'

const router = expres.Router();




//register
router.post("/register", async(req, res)=>{

   try {

    const {username,email,password} = req.body;

   /*  // Validate user input
    if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      } */

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //encrypt the password
    const encryptedPassword = await bcrypt.hash(password,10)


    const user = await User.create({
        username:username,
        email:email,
        password: encryptedPassword
    })

    //create token
    const token =Jwt.sign(
        { user_id:user._id,email},process.env.TOKEN_KEY,
        {
            expiresIn:"2h",
        }

     )
     //save the token
     user.token = token

     //return the new user
     res.status(201).json(user)

   } catch (error) {
    console.log(error)
   }


})


// login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json("Wrong password or username!!");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        // Token creation
        const token = Jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
  
        // Save user token
        user.token = token;
  
        return res.status(200).json(user);
      }
  
      return res.status(401).json("Invalid credentials");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal Server Error");
    }
  });


//testing the auth middleware(jwt token)
  router.post('/welcome', auth, (req,res)=>{
    res.status(200).send("welcome!!")
  })
  


export default router;