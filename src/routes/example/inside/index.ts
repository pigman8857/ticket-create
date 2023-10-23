import { FastifyPluginAsync, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { } from '@fastify/swagger';

const deepInsideExample: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  
  const schema : FastifySchema = {
    params: {
      type: 'object',
      properties: {
        par1: { type: 'string' },
      },
    },
    tags: ['example'],
  }

  fastify.route({ 
    method: "GET", 
    url: "/:param1", 
    schema: schema,
    handler: async function (request: FastifyRequest, reply: FastifyReply) {
        const {param1} = request.params as { param1: string;}
        console.log('contain param1? >',param1);
        reply.status(200);
        reply.send('this is an deep inside example with reply.send()');
        return 
    }
  });

};

export default deepInsideExample;
