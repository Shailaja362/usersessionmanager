import { pgTable, serial, varchar, integer,timestamp } from "drizzle-orm/pg-core";
import { users } from './schema';
export const user_sessions = pgTable("user_sessions", {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  date: varchar('date', { length: 20 }).notNull(),  
  techStack: varchar('tech_stack', { length: 255 }).notNull(),
  topics: varchar('topics[]').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});