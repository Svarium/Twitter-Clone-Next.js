import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
    try {

        const {email, password} = await req.json();

        if(!email && !password){
            return NextResponse.json({error: 'Credenciales Inválidas'}, {status:422})          }

        await connectToDb();
        
        const existingUser = await prisma.user.findFirst({where:{email}})
        
        if(!existingUser){
            return NextResponse.json({message: "usuario no registrado"}, {status:401})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
            return NextResponse.json({error: 'Contraseña incorrecta'}, {status:403})     
        }
        return NextResponse.json({message: "Logueado correctamente"}, {status:200})
        
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};