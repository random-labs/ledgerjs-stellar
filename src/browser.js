const LedgerjsStellar = module.exports;

LedgerjsStellar.Transport = require("@ledgerhq/hw-transport-u2f").default;
LedgerjsStellar.Api = require("@ledgerhq/hw-app-str").default;

module.exports = LedgerjsStellar;
