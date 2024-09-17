import { PRIVATE_POSTGRES_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as Schema from './schema';

const client = postgres(PRIVATE_POSTGRES_URL);
const db = drizzle(client, { schema: Schema });

export {
    db,
    Schema
}