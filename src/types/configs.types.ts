export interface AppConfigs {
    host: string;
    port: number;
}

export interface SSMParameters {
    my_service_host_name: string;
    my_service_port: number;
}

export enum Env {
    LOCAL= 'Local',
    DEV = 'Dev'
}

