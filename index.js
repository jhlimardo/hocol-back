const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const port = process.env.PORT || 3001;
const seed = require('./src/services/seeds.js');

/*
 * Sincronizacin de todos los modelos a la base de datos
 */
// conn.sync({ force: false }).then(() => {
//   server.listen(port, () => {
//     console.log('%s listening at ', port); // eslint-disable-line no-console
//   });
// });

conn();
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`); // eslint-disable-line no-console
  seed.execute(port);
});
