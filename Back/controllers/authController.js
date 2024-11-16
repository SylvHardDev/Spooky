const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

  
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password; 

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      user: userWithoutPassword, 
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Cet username est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (req.file) {
      user = await User.create({
        username,
        password: hashedPassword,
        profile_image: req.file.path,
      });
    } else {
      user = await User.create({
        username,
        password: hashedPassword,
      });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
