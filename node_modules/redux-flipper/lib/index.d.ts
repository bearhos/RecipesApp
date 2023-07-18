export declare type Configuration = {
    resolveCyclic?: boolean;
    actionsBlacklist?: Array<string>;
    stateWhitelist?: string[];
};
declare const createDebugger: (config?: Configuration) => (store: any) => (next: any) => (action: {
    type: string;
}) => any;
export default createDebugger;
