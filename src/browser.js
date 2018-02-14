const StellarLedger = module.exports;

StellarLedger.Transport = require("@ledgerhq/hw-transport-u2f").default;
StellarLedger.Api = require("@ledgerhq/hw-app-str").default;

module.exports = StellarLedger;
