import fp from 'fastify-plugin'
import getConfigs, { getEnv , getSSMClient } from '../configs/appConfig';
import { AppConfigs } from '../types/configs.types';
export interface SupportPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate('someSupport',  () => {
    return 'hugs'
  })
  console.log('Call getSSMClient');
  await getSSMClient();
  console.log('Call getEnv');
  const env = getEnv();
  console.log('env > ',env);
  console.log('Call getConfigs');
  const appConfig = getConfigs(env);
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
