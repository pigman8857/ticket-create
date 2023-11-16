import {
  SSMClient,
  GetParametersCommand,
  GetParametersCommandInput,
  GetParametersCommandOutput,
} from "@aws-sdk/client-ssm";
import { Env, SSMParameters } from "../types/configs.types";

export const getSSMClient = (env: Env): SSMClient => {
  console.log("###### getSSMClient() #### ");
  switch (env) {
    case Env.DEV: {
      return new SSMClient({ region: "ap-southeast-1" });
    }
    case Env.LOCAL: {
      return new SSMClient({
        region: "ap-southeast-1",
        credentials: { accessKeyId: process.env.AWS_ACCESS_KEY as string, secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY as string },
      });
    }
  }
};

export const getParameters = async (
  client: SSMClient
): Promise<SSMParameters> => {
  let data: GetParametersCommandOutput | undefined;
  try {
    const params: GetParametersCommandInput = {
      /** input parameters */
      Names: ["my_service_configs"],
      WithDecryption : true
    };
    const command = new GetParametersCommand(params);
    data = await client.send(command);
    console.log("GetParametersCommand data  > ", data.Parameters![0]);
  } catch (error) {
    console.error("!!!Error!!! -> ", error);
  } finally {
    console.log("###### getSSMClient() ended #### ");

    if(data){
        return JSON.parse(data.Parameters![0].Value!) as SSMParameters;
    }
    else{
        return {
            my_service_host_name : 'localhost',
            my_service_port : 3000
        }
    }   
    
  }
};