const successResponse = (data, message = "Success") => {
  return {
    error: false,
    message,
    data,
  };
};

module.exports = successResponse;
