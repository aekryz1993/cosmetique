import bcrypt from 'react-native-bcrypt';

export function checkPassword(guess, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(guess, password, (err, checkedPassword) => {
      err ? reject(err) : resolve(checkedPassword);
    });
  });
}
