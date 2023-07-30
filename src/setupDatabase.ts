import mongoose from 'mongoose';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export default () => {
  const connect = () => {
    mongoose
      .connect(config.DATABASE_URL!)
      .then(() => {
        log.info('DB Connected.');
      })
      .catch((error) => {
        log.error('DB connect error : ', error);
        return process.exit(1);
      });
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
