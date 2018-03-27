module.exports = {
  networks: {
      development: {
          host: "localhost",
          port: 8545,
          network_id: "20581"
      },
      production: {
          host: "localhost",
          port: 8545,
          network_id: "9449",
          gasPrice: 10000000000
      }
  }
};