import {Q} from '@nozbe/watermelondb';
import bcrypt from 'react-native-bcrypt';
import isaac from 'isaac';

export const addUser = async (database, collection, body) => {
  try {
    const userExist = await collection
      .query(Q.where('username', body.username))
      .fetch();

    console.log(userExist);

    if (userExist.length !== 0) {
      return;
    }

    bcrypt.setRandomFallback(len => {
      const buf = new Uint8Array(len);
      return buf.map(() => Math.floor(isaac.random() * 256));
    });
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    return await database.action(async () => {
      await collection.create(user => {
        user.username = body.username;
        user.password = hashedPassword;
        user.isAdmin = body.isAdmin;
      });
    });
  } catch (error) {
    console.log(error);
  }
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
