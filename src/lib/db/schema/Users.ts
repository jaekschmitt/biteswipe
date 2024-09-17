import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const Users = pgTable('users', {
    id: uuid("user_id").notNull().primaryKey().defaultRandom(),
    authId: uuid("auth_id").unique(),
    displayName: text("display_name"),
    phoneNumber: text("phone_number").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});