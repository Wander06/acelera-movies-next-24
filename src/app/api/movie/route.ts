// FILE: @/app/api/get-all-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBConnection } from '@/app/database/connection';
import { Movie } from '@/app/models/Movie';

export const GET = async () => {
  const connection = await getDBConnection();
  try {

    const movieRepository = 
    await connection.getRepository(Movie)
    .createQueryBuilder('movies')
    .select(["movies.id", "movies.title", "movies.releaseDate", "movies.resume", "movies.note"])
    .getMany()

    if(!movieRepository){
      return NextResponse.json({message: "Nenhum filme encontrado"}, {status: 404})
    }
    console.log(movieRepository)
    return NextResponse.json(movieRepository, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
  
};

export const POST = async (req: Request) =>{
  const connection = await getDBConnection();
  try {
    const data = await req.json()

    if(!data){
       return NextResponse.json({message: "Nenhum dado fornecido"}, {status: 204})
    }

    const movieRepository = connection.getRepository(Movie)
    const createMovie = movieRepository.create({ 
      title: data.title,
      gender: data.gender, 
      classification: data.classification , 
      subtitle: data.subtitle, 
      image: data.image, 
      releaseDate: data.releaseDate, 
      director: data.director, 
      writer: data.writer, 
      studio: data.studio, 
      actors: data.actors, 
      resume: data.resume, 
      awards: data.awards, 
      note: data.note
    })
    if(!createMovie){ 
    return NextResponse.json({message: "falha"}, {status:500})
    }

    await movieRepository.save(createMovie)

    return NextResponse.json({message: "sucesso"}, {status:200})

  } catch (error) {
    console.error("Algo deu errado: ", error)
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
}

