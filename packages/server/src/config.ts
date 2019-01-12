export const database = {
  host: process.env.DB_HOST || '0.0.0.0',
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'database',
  port: 5432,
}
