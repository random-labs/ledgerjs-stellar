# ledgerjs-test

Some scripts to demo and test Stellar Ledger integration and a script to create a browserified version of the library.

### Building

Install the dependencies:
```
$ yarn install
```

Create a browserified file containing Ledgerjs U2F transport and Ledger Stellar API:
```
$ yarn run browserify
```

Minify it:
```
$ yarn run uglify
```

### Running the NodeJS scripts

Get public key:
```
$ node test/node.js getPublicKey [bip32Path] [confirm]
```

Transaction signing:
```
$ node test/node.js signTx [operation]
```

### Running the browser demo

- Make sure to enable browser support
- Build the browserified file as described above.
- Run `python HttpsServer.py`
- In Chrome open `https://localhost:4443/test/index.html` 
