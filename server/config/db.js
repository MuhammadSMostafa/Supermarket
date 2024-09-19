const mongoose = require('mongoose');

const url = process.env.DATABASE_URL.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log('connected to the data base');
  } catch (error) {
    console.log(`there was an error ${error}`);
  }
};

module.exports = connect;
