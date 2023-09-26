import { FastifyPluginAsync } from "fastify";

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
    handler: async function (request, reply) {
        const {param1} = request.params as { param1: string;}
        console.log('contain param1? >',param1);
        return 'this is an deep inside example'
    }
  });

};

export default deepInsideExample;
