const express = require('express');

const {
  getUsers,
  addUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const {
  getAssets,
  addAssets,
  updateAssets,
  deleteAssets,
} = require('../controllers/assets');

const {
  getCompensations,
  addCompensations,
  updateCompensations,
  deleteCompensations,
} = require('../controllers/compensations');

const {
  getEvidence,
  addEvidence,
  updateEvidence,
  deleteEvidence,
} = require('../controllers/evidence');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsers);
router.post('/users', addUser);
router.post('/auth/login', loginUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/assets', getAssets);
router.get('/assets/:id', getAssets);
router.post('/assets', addAssets);
router.put('/assets/:id', updateAssets);
router.delete('/assets/:id', deleteAssets);

router.get('/compensations', getCompensations);
router.get('/compensations/:id', getCompensations);
router.post('/compensations', addCompensations);
router.put('/compensations/:id', updateCompensations);
router.delete('/compensations/:id', deleteCompensations);

router.get('/evidences', getEvidence);
router.get('/evidences/:id', getEvidence);
router.post('/evidences', addEvidence);
router.put('/evidences/:id', updateEvidence);
router.delete('/evidences/:id', deleteEvidence);

router.get('/', (req, res) => {
  res.status(200).send('Bienvenidos a MyPropChain');
});

module.exports = router;
