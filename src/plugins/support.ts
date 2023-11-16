import fp from 'fastify-plugin'
import { getEnv , getConfigs } from '../configs/appConfig';
import { AppConfigs } from '../types/configs.types';
import { getSSMClient, getParameters } from '../aws/ssm';
export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  console.log('fp supports.....');
  fastify.decorate('someSupport',  () => {
    return 'hugs'
  })
  const env = getEnv();

  const ssmClient = getSSMClient(env);
  const parameterConfigs = await getParameters(ssmClient);
  const appConfig = getConfigs(env)(parameterConfigs);
  console.log('appConfig > ',appConfig);
  fastify.decorate('configs', appConfig);
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
    configs: AppConfigs;
  }
}
