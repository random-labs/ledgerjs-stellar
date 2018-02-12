const Transport = require("@ledgerhq/hw-transport-u2f").default;

const scripts = {
  getPublicKey: require('./getPublicKey'),
  signTx: require('./signTx')
};

function runScript(script, arg1, arg2) {
  scripts[script](Transport, arg1, arg2);
}

module.exports = runScript;
