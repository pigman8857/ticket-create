import { FastifyPluginAsync } from "fastify"

const deepInsideExample: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/inside', async function (request, reply) {
    return 'this is an deep inside example'
  })
}

export default deepInsideExample;
