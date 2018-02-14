const Str = require("@ledgerhq/hw-app-str").default;

function getPublicKey(Transport, bip32Path, confirm) {
  if (!bip32Path) {
    bip32Path = "44'/148'/0'";
  }
  let boolConfirm = (confirm === 'true');
  Transport.create().then(function (transport) {
    let str = new Str(transport);
    str.getPublicKey(bip32Path, true, boolConfirm).then(function (result) {
      console.log(result);
    });
  });
}

module.exports = getPublicKey;
