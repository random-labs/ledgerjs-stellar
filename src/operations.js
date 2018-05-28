if (typeof(StellarSdk) === 'undefined') {
  StellarSdk = require('stellar-sdk');
  StellarSdk.Network.useTestNetwork();
}

const util = {
  createHash: function(account) {
    StellarSdk.Network.useTestNetwork();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.accountMerge({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
      }))
      .build().hash();
  }
};

const operations = {

  createAccount: function (account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.createAccount({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        startingBalance: "2000"
      }))
      .build();
  },

  payment: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.payment({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        asset: StellarSdk.Asset.native(),
        amount: "2000"
      }))
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
        path: [new StellarSdk.Asset("EUR", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"),
               new StellarSdk.Asset("CAD", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I")]
      })).addMemo(StellarSdk.Memo.text("dollar to naira"))
      .build();
  },

  createOffer: function (account) {
    const buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    const selling = StellarSdk.Asset.native();
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageOffer({
        buying: buying,
        selling: selling,
        amount: "1000",
        price: { n: 15644199, d: 10000000 }
      }))
      .build();
  },

  removeOffer: function(account) {
    const buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    const selling = StellarSdk.Asset.native();
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
    const buying = new StellarSdk.Asset("SLT", "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I");
    const selling = StellarSdk.Asset.native();
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
      }))
      .build();
  },

  addTrust: function(account) {
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
      }))
      .build();
  },

  revokeTrust: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.allowTrust({
        trustor: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        assetCode: "JPY",
        authorize: false
      }))
      .build();
  },

  setAllOptions: function(account) {

    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        inflationDest: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
        clearFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthImmutableFlag,
        setFlags: StellarSdk.AuthRequiredFlag,
        masterWeight: 0,
        lowThreshold: 1,
        medThreshold: 2,
        highThreshold: 3,
        homeDomain: "example.com",
        signer: {
          preAuthTx: util.createHash(account).toString('hex'),
          weight: 1
        }
      }))
      .build();
  },

  addHashXSigner: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        signer: {
          sha256Hash: util.createHash(account).toString('hex'),
          weight: 2
        }
      }))
      .build();
  },

  removePublicKeySigner: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        signer: {
          ed25519PublicKey: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
          weight: 0
        }
      }))
      .build();
  },

  setMasterWeight: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        masterWeight: 3
      }))
      .build();
  },

  clearFlags: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        clearFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthImmutableFlag
      }))
      .build();
  },

  setFlags: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        setFlags: StellarSdk.AuthRequiredFlag
      }))
      .build();
  },

  setLowThreshold: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        lowThreshold: 3
      }))
      .build();
  },

  setMediumThreshold: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        medThreshold: 3
      }))
      .build();
  },

  setHighThreshold: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        highThreshold: 3
      }))
      .build();
  },

  setHomeDomain: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.setOptions({
        homeDomain: "stellar.org"
      }))
      .build();
  },

  accountMerge: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.accountMerge({
        destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
      }))
      .build();
  },

  setData: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataKey",
        value: "starlight" // base 64 encoded on device is 'c3RhcmxpZ2h0'
      }))
      .build();
  },

  removeData: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataKey",
        value: null
      }))
      .build();
  },

  inflation: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .build();
  },

  memoText: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.text("via lumina"))
      .build();
  },

  memoId: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.id("1234567890"))
      .build();
  },

  memoHash: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.hash(util.createHash(account)))
      .build();
  },

  memoReturn: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation())
      .addMemo(StellarSdk.Memo.return(util.createHash(account)))
      .build();
  },

  operationSource: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.inflation({
        source: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I"
      }))
      .build();
  },

  timeBounds: function(account) {
    return new StellarSdk.TransactionBuilder(account, {
        timebounds: {
          minTime: 1441852,
          maxTime: 3541852
        }
      })
      .addOperation(StellarSdk.Operation.inflation())
      .build();
  },

  multiOp: function(account) {
    return new StellarSdk.TransactionBuilder(account)
      .addOperation(StellarSdk.Operation.manageData({
        name: "dataEntryName",
        value: "dataEntryValue"
      }))
      .addOperation(StellarSdk.Operation.setOptions({
        homeDomain: "example.com"
      }))
      .addOperation(StellarSdk.Operation.payment({
          destination: "GADFVW3UXVKDOU626XUPYDJU2BFCGFJHQ6SREYOZ6IJV4XSHOALEQN2I",
          asset: StellarSdk.Asset.native(),
          amount: "2000"

        }))
      .build();
  }

};

if (typeof(module) !== 'undefined') {
  module.exports = operations;
}