import mongoose, { ConnectionOptions} from 'mongoose';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect('mongodb://localhost/aidyfaDemo', dbOptions)

const connection = mongoose.connection;

connection.once('open', (): void => {
  console.log('Mongodb Connection stablished')
});

connection.on('error', (err): void => {
  console.log('Mongodb connection error:', err);
  process.exit();
});