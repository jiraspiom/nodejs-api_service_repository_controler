import { FastifyInstance } from "fastify";
import { userController } from "../controller/userController";

export const userRoutes = async (fastify: FastifyInstance) =>{
    fastify.post('/register', userController.register)
}