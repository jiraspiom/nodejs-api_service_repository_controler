import jwt from '@fastify/jwt';
import cors from '@fastify/cors'
import fastify from 'fastify';
import { configureRouters } from './routers';

const server = fastify({ logger: true })

server.register(cors, {
  origin: true,
})

server.register(jwt, {
  secret: 'supersecretkey', 
});

configureRouters(server)

server
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  })
  .then(() => {
    console.log('👌 HTTP server rodando bunito!')
  })