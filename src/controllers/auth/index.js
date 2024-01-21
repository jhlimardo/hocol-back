const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//login usuario con creacion de token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login', req.body);
    const user = await UserModel.findOne({ email: email });
    if (user === null) {
      res.status(201).json({ message: 'Usuario inexistente' });
    } else {
      console.log('USUARIO ID', user._id);
      const token = jwt.sign(
        {
          id: user._id,
          email: email,
          role: user.role,
        },
        'secret'
      );
      const passwordValidated = await bcrypt.compare(password, user.password);
      console.log('validate', passwordValidated);
      if (passwordValidated === true) {
        console.log('user', user.email);
        res
          .status(200)
          .header('auth-token', token)
          .json({
            message: 'Usuario logeado correctamente',
            data: { user: user, token: token },
            status: 200,
          });
      } else {
        res.status(401).json({ message: 'Contraseña incorrecta', status: 401 });
      }
    }
  } catch (err) {
    console.log('ERRROR', err);
    res.status(500).json({ message: 'Oops...!!!hubo un error', status: 500 });
  }
};

module.exports = {
  loginUser,
};
