// FILE: @/app/api/get-all-users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Movie } from '@/app/models/Movie';
import { getDBConnection } from '@/app/database/connection';

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
    return NextResponse.json(movieRepository, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
  
};

export const POST = async (req: Request) =>{
  const connection = await getDBConnection();
  try {
    const body = await req.json()

    if (Object.keys(body).length == 0 || Object.values(body).some((value:any) => !value.trim())) {
      return NextResponse.json({ message: "Nenhum dado fornecido ou dados em branco" }, { status: 400 });
    }

    const movieRepository = connection.getRepository(Movie)
    const createMovie = movieRepository.create({ 
      title: body.title,
      gender: body.gender, 
      classification: body.classification , 
      subtitle: body.subtitle, 
      image: body.image, 
      releaseDate: body.releaseDate, 
      director: body.director, 
      writer: body.writer, 
      studio: body.studio, 
      actors: body.actors, 
      resume: body.resume, 
      awards: body.awards, 
      note: body.note
    })
    if(!createMovie){ 
    return NextResponse.json({message: "Falha ao criar filme"}, {status:500})
    }

    await movieRepository.save(createMovie)

    return NextResponse.json({message: "Filme criado com sucesso"}, {status:200})

  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
}

