const bcrypt = require("bcrypt");

const encrypt = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
};

const decrypt = (value, hash) => {
  return bcrypt.compareSync(value, hash);
};

try {
  const result = decrypt("abogaboga", encrypt("abogaboga"));
  console.log(result);
} catch (error) {
  console.log(error.message);
}

// module.exports = { encrypt, decrypt };
