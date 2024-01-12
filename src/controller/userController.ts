import { FastifyReply, FastifyRequest } from 'fastify'
import { UserData } from '../interfaces/UserInterface'
import { userService } from '../services/userServices'

export const userController = {
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userData: UserData = request.body as UserData
      console.log(userData)

      const user = await userService.register(userData)
      reply.send(user)
    } catch (error) {
      reply.status(500).send({ error: 'Erro no registro de usuário' })
    }
  },

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string
        password: string
      }

      const user = await userService.login(email, password)
      reply.send(user)
    } catch (error) {
      reply.status(500).send({ error: 'Credenciais inválidas' })
    }
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userService.getAll()
      reply.send(users)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter usuários' })
    }
  },

  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const userId = parseInt(request.params.id, 10)

      const user = await userService.getById(userId)

      if (user) {
        reply.send(user)
      } else {
        reply.status(404).send({ erro: 'Usuário não encontrado' })
      }
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao obter usuário por ID' })
    }
  },

  async update(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const userId = parseInt(request.params.id, 10)
      const userData: UserData = request.body as UserData

      const updatedUser = await userService.update(userId, userData)
      reply.send(updatedUser)
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao atualizar usuário' })
    }
  },

  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const userId = parseInt(request.params.id, 10)

      await userService.remove(userId)
      reply.send({ message: 'Usuário removido com sucesso' })
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao remover usuário' })
    }
  },
}
