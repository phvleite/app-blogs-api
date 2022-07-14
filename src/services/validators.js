const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);

  if (error) {
    console.log(error);
    let msg = error.details[0].message;
    if (msg.substr(1, 1) === '[') {
      msg = msg.replace(msg.substr(1, 4), '');
    }
    error.message = msg;
    error.type = error.details[0].type;
    throw error;
  }
  return value;
};

module.exports = { runSchema };
