const Transport = require("@ledgerhq/hw-transport-node-hid").default;

const nodeCmdArgs = process.argv.slice(2);
const scriptName = nodeCmdArgs[0];
let arg1 = null;
if (nodeCmdArgs.length > 1) {
  arg1 = nodeCmdArgs[1];
}
let arg2 = null;
if (nodeCmdArgs.length > 2) {
  arg2 = nodeCmdArgs[2];
}

require('./' + scriptName)(Transport, arg1, arg2);
