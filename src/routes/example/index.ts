import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import inside from './inside'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  inside(fastify, opts);

  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })

  fastify.route({
    method: 'POST',
    url: '/create',
    handler: async function(request: FastifyRequest, reply: FastifyReply) {
      reply.status(201);
      reply.send('created');
      return;
    }
  });
}

export default example;
