module.exports = function JoyError(message = "") {
  return {
    errors: [message.toString().replace("Error: ", "")],
  };
};
