require('dotenv').config();
const app = require('./app');

const PORT = 5005;

const main = () => {
  const app_port = process.env.PORT || PORT;
    
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