const mongoose = require('mongoose');

let count = 0;

const options = {
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectWithRetry = () => {
  console.log('MongoDB connection with retry'); // eslint-disable-line no-console
  mongoose.connect(process.env.DB, options).then(() => {
    console.log('MongoDB is connected'); // eslint-disable-line no-console
  }).catch(() => {
    count += 1;
    console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', count); // eslint-disable-line no-console
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

exports.mongoose = mongoose;
