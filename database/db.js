const bcrypt = require('bcrypt');

const pgp = require('pg-promise')();

if(process.env.NODE_ENV === 'production'){
  pgp.pg.defaults.ssl = true;
};

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/the_jolly_green_giant';
const db = pgp(connectionString);

const queries = {
  getAll() {
    return db.any('SELECT * FROM users');
  },
  create(user) {
    // console.log('this is the user', user)
    return db.any(`
      INSERT INTO users(username, password, f_name, l_name, email, location, age) 
      VALUES($1, $2, $3, $4, $5, $6, $7)
    `, [user.username, user.password, user.f_name, user.l_name, user.email, user.location, user.age])
    .catch(console.log)
  },
  delete(id) {
    return db.none('DELETE from users WHERE id = $1', [id]);
  },
  edited(id, user) {
    return db.any('UPDATE users SET user=$1 WHERE id = $2 RETURNING user', [user.title, user.id]);
  },
  getOneuser(user, password) {
    // console.log(' this is the user from getOneuser, before the query', user)
    let result = db.one('SELECT * FROM users WHERE username = $1 AND password = $2', [user, password]);
    return result
  },
    getOnePhoto(photos) {
    // console.log('photo from photos', photo)
    const result = db.one('SELECT * FROM users WHERE image = $1', [user.image]);
    // console.log("this is the result: ", result)
    return result
  },
    sendMessage(message) {
    // console.log('this is the message', message)
    return db.any(`
      INSERT INTO messages(sender, message) 
      VALUES($1, $2)
    `, [message.sender, message.message])
    .catch(console.log(message))
  },

};

module.exports = queries;
