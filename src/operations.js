if (typeof(StellarSdk) === 'undefined') {
  StellarSdk = require('stellar-sdk');
  StellarSdk.Network.useTestNetwork();
}

const operations = {

  createAccount: function (account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.createAccount({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        startingBalance: "2000"
      })).addMemo(StellarSdk.Memo.text("create account"))
      .build();
  },

  payment: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.payment({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        asset: StellarSdk.Asset.native(),
        amount: "2000"
      })).addMemo(StellarSdk.Memo.text("payment"))
      .build();
  },

  pathPayment: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.pathPayment({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        sendAsset: new StellarSdk.Asset("USD", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"),
        sendMax: "100",
        destAsset: new StellarSdk.Asset("NGN", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"),
        destAmount: "1800",
        path: [new StellarSdk.Asset("EUR", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"), new StellarSdk.Asset("CAD", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I")]
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
    // opts.clearFlags = StellarSdk.AuthRevocableFlag | StellarSdk.AuthImmutableFlag | StellarSdk.AuthRequiredFlag;
    opts.setFlags = StellarSdk.AuthRequiredFlag;
    opts.masterWeight = 2;
    // opts.lowThreshold = 255;
    opts.medThreshold = 255;
    // opts.highThreshold = 255;

    StellarSdk.Network.useTestNetwork();
    var hash = new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.accountMerge({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
      })).addMemo(StellarSdk.Memo.text("merge account"))
      .build().hash();

    opts.signer = {
      // ed25519PublicKey: "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7",
      preAuthTx: hash.toString('hex'),
      weight: 0
    };

    opts.homeDomain = "example.com";
    // opts.source = "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7";
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions(opts))
      // .addMemo(StellarSdk.Memo.return(hash))
      .build();
  },

  accountMerge: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.accountMerge({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
        // ,source: "GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7"
      })).addMemo(StellarSdk.Memo.text("merge account"))
      .build();
  },

  setData: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataname",
        value: "largerdatavalue"
      }))
      .build();
  },

  removeData: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataname",
        value: null
      }))
      .build();
  },

  inflation: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.text("run inflation"))
      .build();
  },

  multi: function(account) {
    return new StellarSdk.TransactionBuilder(account,
      {
        fee: 1000000,
        timebounds: {
          minTime: 1441852,
          maxTime: 3541852
        }
      })
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataEntryName",
        value: "dataEntryValueCanBeAVeryLongMax64Characters"
      }))
      .addOperation(StellarSdk.Operation.setOptions({
        homeDomain: "example.com"
      }))
      .addMemo(StellarSdk.Memo.text("zstg530ds0et9422ddg2djl"))
      .build();
  }

};

if (typeof(module) !== 'undefined') {
  module.exports = operations;
}