const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log('Registro exitoso: 201');
    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.log('Error en registro: 400', error.message);
    res.status(400).send('Error al registrar usuario');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado: 404');
      return res.status(404).send('Usuario no encontrado');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta: 400');
      return res.status(400).send('Contraseña incorrecta');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('Inicio de sesión exitoso: 200');
    res.json({ token });
  } catch (error) {
    console.log('Error en inicio de sesión: 500', error.message);
    res.status(500).send('Error en el servidor');
  }
};
