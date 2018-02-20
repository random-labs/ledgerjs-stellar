const Str = require("@ledgerhq/hw-app-str").default;
const operations = require('./operations');

if (typeof(StellarSdk) === 'undefined') {
  StellarSdk = require('stellar-sdk');
}

function loadAccount(publicKey) {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  return server.loadAccount(publicKey);
}

function signTx(Transport, op, bip32Path) {
  if (!bip32Path) {
    bip32Path = "44'/148'/0'";
  }
  if (!op) {
    op = 'payment';
  }
  Transport.create().then(function (transport) {
    transport.setDebugMode(true);
    const str = new Str(transport);
    str.getPublicKey(bip32Path).then(function (pk) {
      loadAccount(pk.publicKey).then(function (account) {
        StellarSdk.Network.useTestNetwork();
        const tx = operations[op](account);
        str.signTransaction(bip32Path, tx.signatureBase()).then(function (s) {
          const txHash = tx.hash();
          const keyPair = StellarSdk.Keypair.fromPublicKey(pk.publicKey);
          if (keyPair.verify(txHash, s['signature'])) {
            console.log('Success! Good signature');
          } else {
            console.error('Failure: Bad signature');
          }
        });
      })
    });
  });
}

module.exports = signTx;
