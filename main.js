require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose')


const main = () => {
  const app_port = process.env.PORT;
  const db_uri = process.env.MONGODB_URI;

  mongoose.connect(db_uri, {useNewUrlParser: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error!! Error: '));
  db.once('open', function() {
    console.log("Connected to MongoDB");
  });
  
  app().listen(app_port, () => {
    console.log(`Media server up in port ${app_port}!`);
  });
};


process.on('SIGINT', function() {
  process.exit();
});

if (require.main === module) {
  main();
}