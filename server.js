require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

main().catch((err) => {
  console.log('An error occurred while starting the server');
  console.error(err);
});

async function main() {
  const mongodbURI = process.env.MONGODB_URI;
  const port = process.env.PORT ?? 3000;

  await mongoose.connect(mongodbURI);
  console.log('MongoDB server is running ...');
  app.listen(port, () => {
    console.log(`Server is running on port: ${port} ...`);
  });
}
