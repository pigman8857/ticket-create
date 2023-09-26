import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    console.log('GET /');
    console.log('Some Support',fastify.someSupport());
    return { root: true }
  })
}

export default root;
