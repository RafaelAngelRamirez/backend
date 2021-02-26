import { ConnectionOptions, connect, connection } from 'mongoose';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const { MONGODB_URI } = process.env

connect(MONGODB_URI || 'mongodb://localhost/aidyfa-demo', dbOptions)

connection.once('open', (): void => {
  console.log('Mongodb Connection stablished')
});

connection.on('error', (error): void => {
  console.log('Mongodb connection error');
  new Error(error)
  process.exit();
});