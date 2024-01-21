const UserModel = require('../../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userSeed = require('../../helpers/seeds/seed-root');

//metodo get de usuarios

let salt = 12;
const getUsers = async (req, res) => {
  const id = req.params.id;
  const queryObj = { ...req.query };
  // console.log("QUERY", queryObj);
  // console.log("PARMS", id);
  if (!id && Object.keys(req.query).length === 0) {
    console.log('SIN PARAMETROS');
    try {
      const users = await UserModel.find();
      res.status(200).json({ message: 'GET EXITOSO', users: users });
    } catch (err) {
      res.status(500).send({ message: 'Oops...!!!hubo un error' });
    }
  } else if (id) {
    try {
      console.log('id', id);
      const user = await UserModel.find({ _id: id });
      console.log('user', user[0]);
      // res.status(200).json({message: "GET EXITOSO", data: user, status: 200});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send({ message: 'Oops...!!!hubo un error', status: 500 });
    }
  } else if (Object.keys(req.query).length > 0) {
    try {
      console.log('QUERY', queryObj);
      const user = await UserModel.find(req.query);
      console.log('user', user[0]);
      // res.status(200).json({message: "GET EXITOSO", data: user, status: 200});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).send({ message: 'Oops...!!!hubo un error', status: 500 });
    }
  }
};
//metodo post de ususario con encriptacion de password
const addUser = async (req, res) => {
  const rondasHash = 12;
  const {
    name,
    lastname,
    email,
    password,
    role,
    isActive,
    privateKey,
    publicKey,
    trxid,
  } = req.body;
  console.log('add', req.body);
  const encryptedPassword = await bcrypt.hash(password, rondasHash);
  console.log('encrypted password', encryptedPassword);

  try {
    if (name && lastname && email && password && role && isActive) {
      let user;
      user = await UserModel.find({ email: email });
      console.log('user', user);
      if (user.length === 0) {
        user = await UserModel.create({
          name: name,
          lastname: lastname,
          email: email,
          password: encryptedPassword,
          role: role,
          isActive: isActive,
          privateKey: privateKey,
          publicKey: publicKey,
          trxid: trxid,
        });
        console.log('Create a new user', user);
        res.status(201).json({
          data: user,
          message: 'Usuario creado correctamente',
          status: 201,
        });
      } else
        res
          .status(400)
          .json({ message: 'El usuario ya esxiste!', status: 400 });
    } else
      res.status(400).json({ message: 'Verifique los datos', status: 400 });
  } catch (err) {
    console.error(err);
  }
};

//login usuario con creacion de token
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign(
    {
      email: email,
    },
    'secret'
  );
  try {
    console.log('Login', req.body);
    const user = await UserModel.findOne({ email: email });
    if (user === null) {
      res.status(201).json({ message: 'Usuario inexistente' });
    } else {
      console.log('USUARIO', user);
      const token = jwt.sign(
        {
          id: user.id,
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

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log('DESDE BACK', data);
    // const { name, lastname, email, password, role, isActive } = req.body;
    // const rondasHash = 12;
    // const encryptedPassword = await bcrypt.hash(password, rondasHash);
    const user = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
    if (!user)
      return res
        .status(404)
        .json({ message: 'Usuario no encontrado', status: 404 });
    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      status: 200,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Oops...!!!hubo un error', status: 500 });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete(id, {
      useFindAndModify: false,
    });
    if (!user)
      return res
        .status(404)
        .json({ message: 'Usuario no encontrado', status: 404 });
    res.status(200).json({
      message: 'Usuario eliminado correctamente',
      status: 200,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Oops...!!!hubo un error', status: 500 });
  }
};

const seed = async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(userSeed.password, salt);
    const config = await UserModel.find();
    if (config.length === 0) {
      const newConfig = await UserModel.create({
        name: userSeed.name,
        lastname: userSeed.lastname,
        email: userSeed.email,
        password: encryptedPassword,
        role: userSeed.role,
        isActive: userSeed.isActive,
        privateKey: '',
        publicKey: '',
        trxid: '',
      });
      if (!newConfig) {
        console.log('ERROR CREATING SEED');
        res.status(403).send({ error: 'NOT CREATE SEED' });
      } else {
        console.log('SEED UP', newConfig);
        return res.status(200).send({ data: newConfig });
      }
    } else {
      console.log('NOT SEED UP, DATA ALREADY EXIST');
    }
    return res.status(200).send({ message: 'SEED UP' });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ error: 'GENERAL ERROR', message: e.message, code: '600.500' });
  }
};

module.exports = {
  getUsers,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
  seed,
};
