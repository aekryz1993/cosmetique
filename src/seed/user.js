import {Q} from '@nozbe/watermelondb';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

export const addUser = (database, collection, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      await database.action(async action => {
        const userExist = await collection
          .query(Q.where('username', body.username))
          .fetch();

        if (userExist.length !== 0) {
          console.log(false);
          resolve(false);
          return;
        }
        bcrypt.setRandomFallback(len => {
          const buf = new Uint8Array(len);
          return buf.map(() => Math.floor(isaac.random() * 256));
        });
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(body.password, salt);

        await action.subAction(() =>
          database.action(async () => {
            const newUser = await collection.create(user => {
              user.username = body.username;
              user.password = hashedPassword;
              user.isAdmin = body.isAdmin;
            });
            if (newUser) {
              resolve(true);
              return;
            }
          }),
        );
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const admin = {
  username: 'fethiadmin',
  password: 'admin123',
  isAdmin: 1,
};

export const employee = {
  username: 'mohamed',
  password: 'employee',
  isAdmin: 0,
};
