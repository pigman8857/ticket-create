import { FastifyPluginAsync } from "fastify"
import inside from './inside'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  inside(fastify, opts);

  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })
}

export default example;
