const config = {
  db: {
    url: process.env.MONGO_URI,
  },
  server: {
    port: process.env.PORT || 5000,
  },
};

module.exports = config;
