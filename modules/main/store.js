let immutable = require('immutable');
let Iflux = require('iflux');
let Messages = Iflux.msg;
let Store = Iflux.Store;
let Request = require('util/ajax/request');

let appStore = Store({
});

export default appStore;