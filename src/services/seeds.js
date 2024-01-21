const axios = require('axios');

const seed = {
  execute: async (port) => {
    try {
      await axios.post('http://localhost:' + port + '/root/seed/config');
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = seed;
