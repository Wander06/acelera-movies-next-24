// FILE: @/app/all-users/page.tsx
import { getDBConnection } from '@/app/database/connection';
import { Movie } from '@/app/models/Movie';

const getMovies = async (): Promise<Movie[]> => {
  const connection = await getDBConnection();

  return connection.getRepository(Movie).find();
};

const allMovies = async () => {
  const movies = await getMovies();
   
  return (
    <ul>
      {movies.map((movie: any)=>(
         <li key={movie.id}>{`${movie.title} (ID: ${movie.id})`}</li>
      ))}
    </ul>
  );
};

export default allMovies
