const JoyError = require("./JoyError");

const existsByPk = async ({ value, model, key }) => {
  if (!value) return value;

  const result = await model.findByPk(value);

  if (!result) {
    throw new JoyError(`${key} not found.`);
  }

  return value;
};

module.exports = {
  existsByPk,
};
