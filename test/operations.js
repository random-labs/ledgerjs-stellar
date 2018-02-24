const operations = {
  createAccount: function (account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.createAccount({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        startingBalance: "2000"
      })).addMemo(StellarSdk.Memo.text("create new account"))
      .build();
  },
  payment: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.payment({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        asset: StellarSdk.Asset.native(),
        amount: "2000"
      })).addMemo(StellarSdk.Memo.text("sending starlight"))
      .build();
  },
  pathPayment: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.pathPayment({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        sendAsset: new StellarSdk.Asset("USD", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"),
        sendMax: "100",
        destAsset: new StellarSdk.Asset("NGN", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"),
        destAmount: "1800"
      })).addMemo(StellarSdk.Memo.text("dollar to naira"))
      .build();
  },
  createOffer: function (account) {
    var buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    var selling = StellarSdk.Asset.native();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageOffer({
        buying: buying,
        selling: selling,
        amount: "1000",
        price: { n: 15644199, d: 10000000 }
      })).addMemo(StellarSdk.Memo.text("create offer"))
      .build();
  },
  removeOffer: function(account) {
    var buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    var selling = StellarSdk.Asset.native();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageOffer({
        buying: buying,
        selling: selling,
        amount: "0",
        price: { n: 15644199, d: 10000000 },
        offerId: '209583721'
      }))
      .build();
  },
  changeOffer: function(account) {
    var buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    var selling = StellarSdk.Asset.native();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageOffer({
        buying: buying,
        selling: selling,
        amount: "200",
        price: { n: 5, d: 3 },
        offerId: '6849038322'
      }))
      .build();
  },
  passiveOffer: function(account) {
    var buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    var selling = StellarSdk.Asset.native();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.createPassiveOffer({
        buying: buying,
        selling: selling,
        amount: "1000",
        price: { n: 1, d: 4 }
      })).addMemo(StellarSdk.Memo.text("create offer"))
      .build();
  },
  changeTrust: function(account) {
    var asset = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: "922337203685.4775807"
      }))
      .build();
  },
  removeTrust: function(account) {
    var asset = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: '0'
      }))
      .build();
  },
  allowTrust: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.allowTrust({
        trustor: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        assetCode: "JPY",
        authorize: true
      })).addMemo(StellarSdk.Memo.text("allow trust"))
      .build();
  },
  revokeTrust: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.allowTrust({
        trustor: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        assetCode: "JPY",
        authorize: false
      })).addMemo(StellarSdk.Memo.text("revoke trust"))
      .build();
  },
  setOptions: function(account) {
    var opts = {};
    opts.inflationDest = "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7";
    opts.clearFlags = StellarSdk.AuthRevocableFlag | StellarSdk.AuthImmutableFlag;
    opts.setFlags = StellarSdk.AuthRequiredFlag;
    opts.masterWeight = 255;
    opts.lowThreshold = 255;
    opts.medThreshold = 255;
    opts.highThreshold = 255;

    opts.signer = {
      ed25519PublicKey: "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7",
      // sha256Hash: revokeTrustTx(account).hash().toString('hex'),
      weight: 1
    };
    // opts.homeDomain = "www.longexampleislong.com";
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions(opts)).build();
  },
  accountMerge: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.accountMerge({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
      })).addMemo(StellarSdk.Memo.text("merge account"))
      .build();
  },
  manageData: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "verylongapplicationdataname",
        value: "value"
      }))
      .build();
  },
  inflation: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.text("maximum memo length 28 chars"))
      .build();
  }
};

if (typeof(module) !== 'undefined') {
  module.exports = operations;
}