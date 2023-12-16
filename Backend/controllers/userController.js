import User from "../schema/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const addUser = async (req, res) => {
    try {
        const { firstName,lastName,email, phone, password,designation,location, manager } = req.body;
    
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({ firstName,lastName,email,phone, password: hashedPassword,designation,location,manager });
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
        console.log("User registered successfully!!!")
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };

export const login = async(req, res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
    
        if (!user) {
            console.log("invalid credentials");
          return res.status(401).json({ error: 'Invalid credentials' });
          
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            console.log("invalid credentials")
          return res.status(401).json({ error: 'Invalid credentials' });
          
        }
    
        // Generate a JWT token
        const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });
    
        res.json({ email ,token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
  export const getAllUsers = async(req,res)=>{
    try {
        // Find all users in the database
        const users = await User.find();
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
// export const loginWithGmail = async(req, res)=>{
//     //
//     const transporter = nodemailer.createTransport({
//         service: emailService,
//         auth: {
//           user: emailUser,
//           pass: emailPass,
//         },
//       });


//       try {
//         const { email } = req.body;
    
//         // Find the user by email
//         const user = await User.findOne({ email });
    
//         if (!user) {
//           return res.status(401).json({ error: 'Invalid credentials' });
//         }
    
//         // Generate a random 6-digit OTP
//         const otp = Math.floor(100000 + Math.random() * 900000);
    
//         // Send the OTP to the user's email
//         const mailOptions = {
//           from: 'your_email@gmail.com', // replace with your email
//           to: user.email,
//           subject: 'Login OTP for Your App',
//           text: `Your OTP is: ${otp}`,
//         };
    
//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ error: 'Failed to send OTP' });
//           }
    
//           console.log('Email sent: ' + info.response);
    
//           // In a real-world scenario, you might want to store the OTP in the database for verification
//           // For simplicity, we're just sending it in the response for demonstration purposes
//           res.json({ message: 'OTP sent to your email', otp });
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
// }