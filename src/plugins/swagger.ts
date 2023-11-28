import fp from "fastify-plugin";
import fastifySwagger, { FastifySwaggerOptions } from "@fastify/swagger";
/**
 * This plugins adds swagger and swagger-ui
 *
 * @see https://github.com/fastify/fastify-swagger
 * @see https://github.com/fastify/fastify-swagger-ui
 */
export default fp<FastifySwaggerOptions>(async (fastify) => {
  console.log('fp swagger.....');
  console.log('fastify.configs >',fastify.configs);
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Test swagger",
        description: "Testing the Fastify swagger API",
        version: "0.1.0",
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here",
      },
      host: `${fastify.configs.host}:${fastify.configs.port}`,
      schemes: ["http","https"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "example", description: "Example related end-points" },
        { name: "default", description: "Default end-points" },
      ],
      definitions: {
        User: {
          type: "object",
          required: ["id", "email"],
          properties: {
            id: { type: "string", format: "uuid" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
  });


  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
});
