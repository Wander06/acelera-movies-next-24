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
      return NextResponse.json({ message: "Falha ao encontrar Filme."}, {status: 404})
    }

    console.log(movieRepository)
    return NextResponse.json(movieRepository, {status: 200});
  } catch (error) {
    return NextResponse.json({message: "Erro interno do servidor"}, {status: 500})
  }
  
};
