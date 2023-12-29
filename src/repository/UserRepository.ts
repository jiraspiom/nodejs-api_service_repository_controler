import { PrismaClient } from "@prisma/client";
import { UserData } from "../interfaces/UserInterface";

const prisma = new PrismaClient

export const UserRepository = {
    async createUser(userData: UserData){
        return prisma.user.create({data: userData})
    },
    async getUserByEmail(email: string){
        return prisma.user.findUnique({where: {email}})
    },
    async getAllUsers(){
        return prisma.user.findMany()
    },
    async getUserById(id: number){
        return prisma.user.findUnique({where: {id}})
    },
    async updateUser(id: number, userData: UserData){
        return prisma.user.update({where: {id}, data: userData})
    },
    async removerUser(id: number){
        return prisma.user.delete({where: {id}})
    }
}