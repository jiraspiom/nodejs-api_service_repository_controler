import { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes";


export const configureRouters = (fastify: FastifyInstance) =>{
    fastify.register(userRoutes,{prefix: '/users'})
    // fastify.register(salesRoutes,{prefix: '/sales'})
}