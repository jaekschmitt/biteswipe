import { pgTable, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core';

type Location = {
    googlePlaceId: string;
    displayName: string;
    latitude: number;
    longitude: number;
}

export const Searches = pgTable('searches', {
    id: uuid("search_id").notNull().primaryKey().defaultRandom(),
    location: jsonb('location').$type<Location>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});