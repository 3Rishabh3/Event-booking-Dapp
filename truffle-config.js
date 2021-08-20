const path = require("path");

module.exports = {
 
  networks: {
    network_id: "4", // Any network (default: none)
  },
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
    },
  },
};
