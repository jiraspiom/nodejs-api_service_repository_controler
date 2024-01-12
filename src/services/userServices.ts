import { UserRepository } from '../repository/UserRepository'
import { UserData, UserDataSchema } from '../interfaces/UserInterface'

export const userService = {
  async register(userData: UserData) {
    // valida dados usando zod
    const validateData = UserDataSchema.parse(userData)

    // verifica se o email ja esta registrado
    const exitingUser = await UserRepository.getUserByEmail(validateData.email)
    if (exitingUser) {
      throw new Error('email já registrado')
    }

    // chama o repositorio para criar o usuario
    return UserRepository.createUser(userData)
  },

  async login(email: string, password: string) {
    const user = await UserRepository.getUserByEmail(email)

    if (!user || user.password !== password) {
      throw new Error('Credenciais invalidas')
    }

    return user
  },

  async getAll() {
    return UserRepository.getAllUsers()
  },

  async getById(id: number) {
    return UserRepository.getUserById(id)
  },

  async update(id: number, userData: UserData) {
    return UserRepository.updateUser(id, userData)
  },

  async remove(id: number) {
    return UserRepository.removerUser(id)
  },
}
