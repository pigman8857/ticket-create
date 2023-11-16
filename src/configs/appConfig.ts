import { AppConfigs, Env } from "../types/configs.types";

const localConfigs : AppConfigs = {
    host:"localhost",
    port:"3000"
}

export const getEnv = () : Env => {
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
    console.log('getConfigs >',env);
    return () : AppConfigs  => {
        switch(env){
            case Env.LOCAL : {
                return localConfigs;
            }
            case Env.DEV : {
                return localConfigs;
            }
            default: {
                return localConfigs;
            }
        }
    }

}

export default getConfigs;