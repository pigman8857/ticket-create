import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify"
import inside from './inside'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  inside(fastify, opts);

  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: async (request, reply) => {
      // E.g. check authentication
      console.log('prehandler of GET /example/');
    },
    preValidation:async (requst,reply,done) => {
      console.log('preValidation GET /example/');
      done();
    },
    handler:async (request,reply) => {
      console.log('reached GET /example/');
      reply.status(200);
      reply.send('this is example');
      return;
    }
  });

  fastify.route({
    method: 'POST',
    url: '/create',
    preHandler: async (request, reply) => {
      // E.g. check authentication
      console.log('prehandler of POST /example/create');
    },
    preValidation:async (requst,reply,done) => {
      console.log('preValidation GET /example/create');
      done();
    },
    handler: async function(request: FastifyRequest, reply: FastifyReply) {
      console.log('reached POST /example/create');
      reply.status(201);
      reply.send('created');
      return;
    }
  });
}

export default example;
