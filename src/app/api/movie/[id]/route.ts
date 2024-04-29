// FILE: @/app/api/get-all-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '@/app/database/connection';
import { Movie } from '@/app/models/Movie';

export const GET = async (req: Request, { params }: {params: {id : number}}) => {
  const connection = await getDBConnection();
  try {

    const id = params.id

    const movieRepository = connection.getRepository(Movie)
    
    const findMovieId = await movieRepository.findOneBy({ id: id})

    if(!findMovieId){
      return NextResponse.json({ message: "Filme não encontrado"}, {status: 404})
    }

    console.log(findMovieId)
    return NextResponse.json(findMovieId, {status: 200});
  } catch (error) {
    console.error(error)
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
  
};

export const DELETE = async (req: Request, { params }: {params: {id : number}}) => {
  const connection = await getDBConnection()
  try {
    const id = params.id

    const movieRepository = connection.getRepository(Movie)
    const findMovie = await movieRepository.findOneBy({ id: id})

    if(!findMovie){
      return NextResponse.json({message: "Filme não encontrado"}, {status: 200})
    }
    await movieRepository.remove(findMovie)

    return NextResponse.json({message: "Filme deletado com sucesso"}, {status: 500})
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
}
