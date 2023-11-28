import { AppConfigs, Env, SSMParameters } from "../types/configs.types";


export const getEnv = () : Env => {
    console.log('call getEnv()');
    const node_env = process.env.NODE_ENV as string;
    console.log('node_env > ',node_env);
    switch(node_env){
        case 'local' : {
            return Env.LOCAL;
        }
        case 'dev' : {
            return Env.DEV;
        }
        default: {
            return Env.LOCAL;
        }  
    }
}
  

export const getConfigs = (env: Env) => {
    console.log('appConfig.getConfigs() env >',env);
    return (ssmParams: SSMParameters) : AppConfigs  => {
        console.log('ssmParams > ',ssmParams);
        console.log('We are in DEV env but we will use localhost');
        switch(env){
            case Env.LOCAL : {
                return {
                    host: process.env.LOCAL_HOST_NAME as string,
                    port: parseInt(process.env.LOCAL_PORT as string)
                };
            }
            case Env.DEV : {
                return {
                    host: 'localhost',//ssmParams.my_service_host_name,
                    port: 3000//ssmParams.my_service_port
                };;
            }
            default: {
                return {
                    host: ssmParams.my_service_host_name,
                    port: ssmParams.my_service_port
                };;
            }
        }
    }

}

export default getConfigs;