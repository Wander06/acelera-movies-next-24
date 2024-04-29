// FILE: @/app/api/get-all-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/app/models/Movie';
import { getDBConnection } from '@/app/database/connection';

export const GET = async (req: Request, { params }: {params: {id : number}}) => {
  const connection = await getDBConnection();
  try {

    const id = params.id

    const movieRepository = connection.getRepository(Movie)
    
    const findMovieId = await movieRepository.findOneBy({ id: id})

    if(!findMovieId){
      return NextResponse.json({ message: "Filme não encontrado"}, {status: 404})
    }

    return NextResponse.json(findMovieId, {status: 200});
  } catch (error) {
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
      return NextResponse.json({message: "Filme não encontrado"}, {status: 404})
    }
    await movieRepository.remove(findMovie)

    return NextResponse.json({message: "Filme deletado com sucesso"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
}

export const PUT = async (req: Request, { params }: {params: {id : number}}) => {
  const connection = await getDBConnection()
  try {
    const id = params.id
    const body = await req.json()

    if (Object.values(body).some((value:any) => !value.trim()) || Object.keys(body).length == 0) {
      return NextResponse.json({ message: "Nenhum dado fornecido ou dados em branco" }, { status: 400 });
    }

    const movieRepository = connection.getRepository(Movie)
    const findMovie = await movieRepository.findOneBy({ id: id})

    if(!findMovie){
      return NextResponse.json({message: "Filme não encontrado"}, {status: 404})
    }

    movieRepository.merge(findMovie, body)
    await movieRepository.save(findMovie)

    return NextResponse.json({message: "Filme atualizado com sucesso"}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
}