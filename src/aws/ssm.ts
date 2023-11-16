import {
  SSMClient,
  GetParametersCommand,
  GetParametersCommandInput,
  GetParameterCommandOutput,
} from "@aws-sdk/client-ssm";
import { Env } from "../types/configs.types";

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
): Promise<GetParameterCommandOutput | null> => {
  let data: GetParameterCommandOutput | null = null;
  try {
    const params: GetParametersCommandInput = {
      /** input parameters */
      Names: ["ticket-create_host_server", "ticket-create_port"],
      WithDecryption : true
    };
    const command = new GetParametersCommand(params);
    data = await client.send(command);
    console.log("GetParametersCommand data  > ", data);
  } catch (error) {
    console.error("!!!Error!!! -> ", error);
  } finally {
    console.log("###### getSSMClient() ended #### ");
    return data;
  }
};
