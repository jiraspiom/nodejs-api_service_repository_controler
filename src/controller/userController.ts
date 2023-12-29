import { FastifyReply, FastifyRequest } from "fastify";
import { UserData } from "../interfaces/UserInterface";
import { userService } from "../services/userServices";

export const userController = {
    async register(request: FastifyRequest, reply: FastifyReply){
        try {
            const userData : UserData = request.body as UserData
            console.log(userData)
            const user = await userService.register(userData);
            reply.send(user);
            
        } catch (error) {
            reply.status(500).send({error: 'Erro no registro de usuário'})
        }

    }
}