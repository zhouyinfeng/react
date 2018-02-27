import React from "react";
import Immutable from "immutable";
import {msg as Msg, Store as store} from "iflux";
import Request from "util/ajax/request";

/**
 * 数据集合；
 */
let appStore = store({
});

export default appStore;