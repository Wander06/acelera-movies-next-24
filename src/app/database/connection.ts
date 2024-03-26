// FILE: @/app/database/connection.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@/app/models/User';
import { Movie } from '../models/Movie';

const pgConnection = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'acelera_movies',
  username: 'wandersonsilva',
  password: '',
  synchronize: true,
  logging: true,
  entities: [User, Movie],
  migrations: [],
  subscribers: [],
});

export const getDBConnection = async (): Promise<DataSource> => {
  if (!pgConnection.isInitialized) {
    console.log('Carregando entidades:', pgConnection.options.entities);
    await pgConnection.initialize();
  }
  return pgConnection;
};