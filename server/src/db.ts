import mongoose from 'mongoose';
import config from 'config';

async function db() {
  const dbUri = config.get('dbUri') as string;
  try {
    await mongoose
      .connect(dbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log(`DB connected`);
      });
  } catch (e) {
    console.error(e);
  }
}

export default db;
