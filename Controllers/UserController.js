const User = require(`../Models/Users`);
const bcrypt = require("bcryptjs");


//create a user
exports.createUser = async (req, res) => {
    try {
        //request body
        const { name, email, password, gender, phone, role } = req.body;

        //check if all required fields are provided
        if (!name || !email || !password || !gender || !phone || !role) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        //email check
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //phone number check
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already exists" });
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            gender: gender,
            phone: phone,
            role: role || 'salesperson', // Default role if not provided
            HasAdminAccess: req.body.HasAdminAccess || false, // Default to false if not provided
        });

        // Save user to database
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }   

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //generate a token (you can use JWT or any other method)
        //const token = generateToken(user); // Implement your token generation logic here
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //login successful
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



