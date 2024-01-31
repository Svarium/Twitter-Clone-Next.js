import prisma from "@/prisma";
import { connectToDb } from "@/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request, params: {params: {id:string}}) => {
    try {
        await connectToDb();
        const tweet = await prisma.tweets.findFirst({where:{id:params.params.id}});
        return NextResponse.json({tweet}, {status:200})
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};


export const PUT = async (req: Request, params: {params: {id:string}}) => {
    try {
        //@ts-ignore
        const {tweet} = await req.json(); 
        await connectToDb();        
        const updatedTweet = await prisma.tweets.update({data:{tweet}, where:{id:params.params.id}});
        return NextResponse.json({tweet:updatedTweet}, {status:200})
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};


export const DELETE = async (req: Request, params: {params: {id:string}}) => {
    try {
        await connectToDb();
        const tweet = await prisma.tweets.delete({where:{id:params.params.id}});
        return NextResponse.json({message:'Tweet eliminado correctamente!!'}, {status:200})
    } catch (error: any) {
        console.log(error);
        const errorMessage = error?.message || 'Error desconocido';
        return NextResponse.json({error: errorMessage}, {status:500})        
    } finally {
        await prisma.$disconnect();
    }
};