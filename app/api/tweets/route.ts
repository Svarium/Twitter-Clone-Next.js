import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        await connectToDb();
        const tweets = await prisma.tweets.findMany();
        return NextResponse.json({tweets}, {status:200})
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};


export const POST = async (req: Request) => {
    try {

        const {tweet, userId} = await req.json();

        if(!tweet && !userId ){
            return NextResponse.json({error: 'Informacion inválida'}, {status:422})}

        await connectToDb();    
        
        const user = await prisma.user.findFirst({where:{id:userId}});    
        if(!user){
            return NextResponse.json({message: 'Usuario inválido'}, {status:401})  
        }

        const newTweet = await prisma.tweets.create({data:{tweet, userId}})
        return NextResponse.json({tweet:newTweet}, {status:201}) 
       
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};