const Transport = require("@ledgerhq/hw-transport-node-hid").default;
const Api = require("@ledgerhq/hw-app-str").default;
const Operations = require('./operations');
const StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();

const nodeCmdArgs = process.argv.slice(2);
const operationName = nodeCmdArgs[0];

Transport.create().then(transport => {
  const api = new Api(transport);
  transport.setDebugMode(true);
  api.getPublicKey("44'/148'/0'").then(result => {
      const account = new StellarSdk.Account(result.publicKey, "12345677890");
      const transaction = Operations[operationName](account);
      console.log(transaction.signatureBase().length);
      api.signTransaction("44'/148'/0'", transaction.signatureBase()).then(r => {
        console.log(r);
      })
  });
});
