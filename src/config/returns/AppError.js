module.exports = function AppError(message = "", statusCode = 400) {
  if (
    typeof message === "object" &&
    message.message &&
    message.customValidation
  ) {
    return message;
  }

  if (
    typeof message === "object" &&
    message.errors &&
    Array.isArray(message.errors)
  ) {
    return {
      message: { success: false, errors: message.errors },
      statusCode,
      customValidation: true,
    };
  }

  if (!Array.isArray(message)) {
    if (typeof message === "object" && message.details) {
      message = message.details.map(e => e.message.replace(/"/g, ""));
    } else if (typeof message === "string") {
      message = [message];
    } else {
      message = ["Internal server error", message];
      statusCode = 500;
    }
  }

  const newMessage = { success: false, errors: message };

  return { message: newMessage, statusCode, customValidation: true };
};
