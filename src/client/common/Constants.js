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
module.exports.url = url;
