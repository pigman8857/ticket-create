import { AppConfigs, Env } from "../types/configs.types";
import { SSMClient, GetParametersCommand, GetParametersCommandInput} from "@aws-sdk/client-ssm";

const devConfigs : AppConfigs = {
    host:"ec2-52-221-209-149.ap-southeast-1.compute.amazonaws.com",
    port:"3000"
}

const localConfigs : AppConfigs = {
    host:"localhost",
    port:"3000"
}

export const getEnv = () : Env => {
    const node_env = process.env.NODE_ENV as string;
    switch(node_env){
        case 'local' : {
            return Env.LOCAL;
        }
        case 'dev' : {
            return Env.DEV;
        }
        default: {
            return Env.DEV;
        }  
    }
}

export const getSSMClient = async () => {
    console.log('###### getSSMClient() #### ');

    const client = new SSMClient({ region: "ap-southeast-1" });
   
    try {
        const params : GetParametersCommandInput = {
            /** input parameters */
            Names : ['ticket-create_host_server', 'ticket-create_port']
        };
        console.log('GetParametersCommandInput params > ',params);
        const command = new GetParametersCommand(params);
        console.log('GetParametersCommand > ',command);
        const data = await client.send(command);
        console.log('GetParametersCommand data  > ',data);
    } catch (error) {
        console.error('',error);
    } finally {
        console.log('###### getSSMClient() ended #### ');
    }
}

export const getConfigs = (env: Env) : AppConfigs => {
    switch(env){
        case Env.LOCAL : {
            return localConfigs;
        }
        case Env.DEV : {
            return devConfigs;
        }
        default: {
            return localConfigs;
        }
    }
}

export default getConfigs;