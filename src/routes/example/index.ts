import { FastifyPluginAsync, FastifyReply, FastifyRequest, FastifySchema } from "fastify"
import inside from './inside'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  inside(fastify, opts);

  const defaultSchema : FastifySchema = {
    params: {},
    tags: ['example'],
  }

  const createSchema: FastifySchema = {
    params: {},
    tags: ['example'],
  }


  fastify.route({
    method: 'GET',
    schema: defaultSchema,
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
    schema: createSchema,
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
