### Introduction

This repository contains some scripts to demo and test the [Stellar Ledger](https://github.com/lenondupe/ledger-app-stellar) app and a script to create a browserified version of the library.
Note that the libary works the same for both the Ledger Nano S and Blue device. No special handling is required for either.

### Building

Install the dependencies:
```
$ yarn install
```

Create a browserified file containing Ledgerjs U2F transport and Ledgerjs Stellar API:
```
$ yarn run browserify
```

You can find the browserified file at `./browser/ledgerjs-stellar.js`

Minify it:
```
$ yarn run uglify
```

You can find the minified file at `./browser/ledgerjs-stellar-min.js`

### Running the command line demo scripts

#### signing a transaction

```
$ yarn sign [operation]
```

`src/operations.js` contains the list of the operations you can run.

#### signing a hash

```
$ yarn hash
```

#### confirming the address
```
$ yarn address
```


### Running the browser demo

- Build the browserified file as described above.
- Run `python HttpsServer.py`
- In Chrome open `https://localhost:4443/browser/index.html`

The relevant code is contained in `./browser/index.html` and `src/operations.js`.

### Usage of LedgerJS Stellar library

```javascript
// u2f is used in browser applications
import Transport from "@ledgerhq/hw-transport-u2f";
// node hid is used in native applications
// import Transport from "@ledgerhq/hw-transport-node-hid";
import Api from "@ledgerhq/hw-app-str";

let _api = null;
let _appVersion = null;

function open() {
  const openTimeout = 30 * 1000;
  const exchangeTimeout = 30 * 1000;
  return Transport.create(openTimeout).then((transport) => {
    // transport.setDebugMode(true);
    transport.setExchangeTimeout(exchangeTimeout);
    _api = new Api(transport);
    return _api;
  });
}

function connect() {
  if (_api === null) {
    return open().then(api => {
      return api.getAppConfiguration().then(result => {
        _appVersion = result.version;
        return api;
      });
    });
  } else {
    return _api;
  }
}

function getPublicKey() {
  const bip32Path = "44'/148'/0'";
  const verifyKeyPair = true;
  const confirmAddress = false;
  return connect().then(api => {
    return api.getPublicKey(bip32Path, verifyKeyPair, confirmAddress).then(result => {
        return result.publicKey;
      });
  });
}

function getSignature(transaction) {
  const bip32Path = "44'/148'/0'";
  return connect().then(api => {
    return api.signTransaction(bip32Path, transaction.signatureBase()).then(result => {
      return result.signature;
    });
  });
}
```

### Note on the browserified file

When using the browserified file the Transport and Api objects are available from the global variable `LedgerjsStellar`:

```javascript
const Transport = LedgerjsStellar.Transport;
const Api = LedgerjsStellar.Api;
```

### Known Limitations

- Although Firefox now supports U2F the LedgerJS U2F transport does not support Firefox.
