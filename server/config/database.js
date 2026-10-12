import pg from 'pg' // lets us talk to postgres

// login info comes from .env file
const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false // needed for render
    }
}

// pool = connection we reuse in controllers
export const pool = new pg.Pool(config)