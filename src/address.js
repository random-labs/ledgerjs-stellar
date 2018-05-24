const Transport = require("@ledgerhq/hw-transport-node-hid").default;
const Api = require("@ledgerhq/hw-app-str").default;

Transport.create().then(transport => {
  const api = new Api(transport);
  transport.setDebugMode(true);
  api.getPublicKey("44'/148'/0'", true, true).then(result => {
      console.log(result);
  });
});
