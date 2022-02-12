const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'weekend-to-do-app',
    host: 'Localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

// create new pool instance to manage our connections
const pool = new Pool(config);

// useful for debugging per tuesday lecture
pool.on('connect', () => {
    console.log('PostgreSQL is connected!');
});

// pool will emit an error on behalf of any idle clients
pool.on('error', (error) => {
    console.log('Error with PostgreSQL:', error);
});

// allow access to this pool instance from other code
module.exports = pool;