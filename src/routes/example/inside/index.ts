import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";

const deepInsideExample: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  
  const paramsJsonSchema = {
    type: 'object',
    properties: {
      par1: { type: 'string' },
    }
  }

  fastify.route({ 
    method: "GET", 
    url: "/inside/:param1", 
    schema: {params : paramsJsonSchema},
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
