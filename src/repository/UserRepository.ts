import { PrismaClient } from '@prisma/client'
import { UserData } from '../interfaces/UserInterface'

const prisma = new PrismaClient()

export const UserRepository = {
  async createUser(userData: UserData) {
    return prisma.usuario.create({ data: userData })
  },
  async getUserByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } })
  },
  async getAllUsers() {
    return prisma.usuario.findMany()
  },
  async getUserById(id: string) {
    return prisma.usuario.findUnique({ where: { id } })
  },
  async updateUser(id: string, userData: UserData) {
    return prisma.usuario.update({ where: { id }, data: userData })
  },
  async removerUser(id: string) {
    return prisma.usuario.delete({ where: { id } })
  },
}
