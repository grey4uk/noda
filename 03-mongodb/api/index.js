require = require("esm")(module);

const { Server } = require("./server");

new Server().start();
