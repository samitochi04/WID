import pgPromise from 'pg-promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    database: process.env.DB_NAME || 'todo_db',
    user: process.env.DB_USER || 'your_user',
    password: process.env.DB_PASSWORD || 'your_password',
};

const pgp = pgPromise();
const db = pgp(dbConfig);

export default db;
