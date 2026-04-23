const { Client } = require('pg');
const client = new Client({
  host: 'localhost', port: 5432,
  user: 'postgres', password: 'yourpassword',
  database: 'postgres'
});
client.connect()
  .then(() => client.query('CREATE DATABASE bamboo_paradise'))
  .then(() => { console.log('Database bamboo_paradise created'); client.end(); })
  .catch(e => {
    if (e.code === '42P04') console.log('Database already exists');
    else console.error('Error:', e.message);
    client.end();
  });
