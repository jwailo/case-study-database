const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the password you want to hash: ', (password) => {
  const hash = bcrypt.hashSync(password, 10);
  console.log('\nYour hashed password:');
  console.log(hash);
  console.log('\nAdd this to your .env file as:');
  console.log(`APP_PASSWORD_HASH=${hash}`);
  rl.close();
});
