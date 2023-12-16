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
        const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    
        res.json({ email ,token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
  