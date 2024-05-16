const User = require('../models/User');

class UserController {
  static async register() {
    const { username, email, password } = req.body;

    try {
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'username already taken' });
      }

      const user = new User({ username, email, password });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  static login() {}
}

module.exports = UserController;
