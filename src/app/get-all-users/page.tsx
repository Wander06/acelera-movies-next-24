// FILE: @/app/all-users/page.tsx
import { getDBConnection } from '@/app/database/connection';
import { User } from '@/app/models/User';
import { Movie } from '@/app/models/Movie';

const getUsers = async (): Promise<User[]> => {
  const connection = await getDBConnection();

  return connection.getRepository(User).find();
};

const getMovies = async (): Promise<Movie[]> => {
  const connection = await getDBConnection();

  return connection.getRepository(Movie).find();
};

const AllUsersPage = async () => {
  const users = await getUsers();
  const movies = await getMovies();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{`${user.email} (ID: ${user.id})`}</li>
      ))}
      {movies.map((movie)=>(
         <li key={movie.id}>{`${movie.title} (ID: ${movie.id})`}</li>
      ))}
    </ul>
  );
};

export default AllUsersPage;
