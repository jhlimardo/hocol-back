const bcrypt = require('bcrypt');
const rondasHash = 12;
const hashedPassword = async () => {
  return bcrypt.hash('Ab123456', rondasHash);
};

const userSeed = {
  name: 'root',
  lastname: 'root',
  email: 'root@mail.com',
  password: 'Ab123456',
  isActive: true,
  role: 'root',
};

module.exports = userSeed;
