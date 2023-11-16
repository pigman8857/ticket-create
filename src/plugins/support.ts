import fp from 'fastify-plugin'
import { getEnv } from '../configs/appConfig';
import { AppConfigs } from '../types/configs.types';
import { getSSMClient, getParameters } from '../aws/ssm';
export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport',  () => {
    return 'hugs'
  })
  console.log('Call getEnv');
  const env = getEnv();

  const ssmClient = getSSMClient(env);
  await getParameters(ssmClient);
  // console.log('appConfig > ',appConfig);
  fastify.decorate('configs', {host: 'ec2-18-138-67-142.ap-southeast-1.compute.amazonaws.com', port: '3000'} );
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
    configs: AppConfigs;
  }
}
