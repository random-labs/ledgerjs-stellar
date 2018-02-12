const StellarLedger = module.exports;

StellarLedger.Transport = require("@ledgerhq/hw-transport-u2f").default;
StellarLedger.Api = require("ledger-libs/packages/hw-app-str").default;

module.exports = StellarLedger;
