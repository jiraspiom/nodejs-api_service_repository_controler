import { FastifyInstance } from "fastify";
import { userController } from "../controller/userController";

export const userRoutes = async (fastify: FastifyInstance) => {
    fastify.post('/register', userController.register)
    fastify.post('/login', userController.login)
    fastify.get('/', userController.getAll)
    fastify.get('/:id', userController.getById)
    fastify.put('/:id', userController.update)
    fastify.delete('/:id', userController.remove)
}