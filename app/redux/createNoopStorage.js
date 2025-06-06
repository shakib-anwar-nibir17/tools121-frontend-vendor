/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// createNoopStorage.js
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

export default createNoopStorage;
