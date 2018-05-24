const Transport = require("@ledgerhq/hw-transport-node-hid").default;
const Api = require("@ledgerhq/hw-app-str").default;
const Operations = require('./operations');
const StellarSdk = require('stellar-sdk');

StellarSdk.Network.useTestNetwork();

Transport.create().then(transport => {
  const api = new Api(transport);
  transport.setDebugMode(true);
  api.getPublicKey("44'/148'/0'").then(result => {
      const account = new StellarSdk.Account(result.publicKey, "12345677890");
      const transaction = Operations.payment(account);
      console.log('hash: ' + transaction.hash().toString('hex'));
      api.signHash("44'/148'/0'", transaction.hash()).then(r => {
        console.log(r);
      })
  });
});
