export interface IPermission {
    name: string;
    requierd?: boolean;
}

export interface IHttpPermission extends IPermission {
    name: string;
    domains: Array<string>;
}
