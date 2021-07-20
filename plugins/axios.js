import axios from "axios";

// set global axios
window.get = (...args) => {
  return new Promise((resolve, reject) => {
    axios
      .get(...args)
      .then(resolve)
      .catch(reject);
  });
};
