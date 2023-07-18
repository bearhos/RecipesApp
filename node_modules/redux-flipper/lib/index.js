"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_flipper_1 = require("react-native-flipper");
const dayjs = require("dayjs");
const defaultConfig = {
    resolveCyclic: false,
    actionsBlacklist: [],
};
let currentConnection = null;
const error = {
    NO_STORE: 'NO_STORE',
};
const createStateForAction = (state, config) => {
    return config.stateWhitelist
        ? config.stateWhitelist.reduce((acc, stateWhitelistedKey) => (Object.assign(Object.assign({}, acc), { [stateWhitelistedKey]: state[stateWhitelistedKey] })), {})
        : state;
};
// To initiate initial state tree
const createInitialAction = (store, config) => {
    const startTime = Date.now();
    let initState = store.getState();
    if (config.resolveCyclic) {
        const cycle = require('cycle');
        initState = cycle.decycle(initState);
    }
    let state = {
        id: startTime,
        time: dayjs(startTime).format('HH:mm:ss.SSS'),
        took: `-`,
        action: { type: '@@INIT' },
        before: createStateForAction({}, config),
        after: createStateForAction(initState, config),
    };
    currentConnection.send('actionInit', state);
};
const createDebugger = (config = defaultConfig) => (store) => {
    if (currentConnection == null) {
        react_native_flipper_1.addPlugin({
            getId() {
                return 'flipper-plugin-redux-debugger';
            },
            onConnect(connection) {
                currentConnection = connection;
                currentConnection.receive('dispatchAction', (data, responder) => {
                    console.log('flipper redux dispatch action data', data);
                    // respond with some data
                    if (store) {
                        store.dispatch(Object.assign({ type: data.type }, data.payload));
                        responder.success({
                            ack: true,
                        });
                    }
                    else {
                        responder.success({
                            error: error.NO_STORE,
                            message: 'store is not setup in flipper plugin',
                        });
                    }
                });
                createInitialAction(store, config);
            },
            onDisconnect() {
                currentConnection = null;
            },
            runInBackground() {
                return true;
            },
        });
    }
    else {
        createInitialAction(store, config);
    }
    return (next) => (action) => {
        var _a;
        let startTime = Date.now();
        let before = store.getState();
        let result = next(action);
        if (currentConnection) {
            let after = store.getState();
            let now = Date.now();
            let decycledAction = null;
            if (config.resolveCyclic) {
                const cycle = require('cycle');
                before = cycle.decycle(before);
                after = cycle.decycle(after);
                decycledAction = cycle.decycle(action);
            }
            let state = {
                id: startTime,
                time: dayjs(startTime).format('HH:mm:ss.SSS'),
                took: `${now - startTime} ms`,
                action: decycledAction || action,
                before: createStateForAction(before, config),
                after: createStateForAction(after, config),
            };
            const blackListed = !!((_a = config.actionsBlacklist) === null || _a === void 0 ? void 0 : _a.some((blacklistedActionType) => { var _a; return (_a = action.type) === null || _a === void 0 ? void 0 : _a.includes(blacklistedActionType); }));
            if (!blackListed) {
                currentConnection.send('actionDispatched', state);
            }
        }
        return result;
    };
};
exports.default = createDebugger;
