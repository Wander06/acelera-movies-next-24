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
      return NextResponse.json({message: "Nenhum filme encontrado"})
    }
    console.log(movieRepository)
    return NextResponse.json(movieRepository);
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"})
  }
  
};

const POST = async () =>{
  const connection = await getDBConnection();
  try {
    
  } catch (error) {
    
  }
}
