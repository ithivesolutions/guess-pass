const messages = {
    VAL_NUMS_ONLY: "Please enter numbers only.",
    VAL_NUMS: "Please enter a number.",
    VAL_LARGER_THAN_0: "Please enter a larger value than 0.",
    VAL_TOO_MANY_DECIMAL: "Please enter a number with at most 1 decimal place",
    VAL_DATEOBJ: "Must input a date!",
    DB_ERROR: "Database error - please check your data.",
  };
  
  const url = () => {
    if (process.env.NODE_ENV === "test") {
      return "http://127.0.0.1:3002";
    } else {
      const urlPart =
        window.location &&
        window.location.protocol + "//" + window.location.hostname;
      return window.location && window.location.hostname === "localhost"
        ? urlPart + ":3002"
        : urlPart;
    }
  };
  
  module.exports.MSG = messages;
  module.exports.url = url;
  