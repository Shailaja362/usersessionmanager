import { db } from './db/index';
import { users } from './db/schema';


export interface User {
  id: number,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}


export async function getUsers() {
   return await db.select().from(users);
}

export async function saveUser(user: Omit<typeof users.$inferInsert, 'id'>) {
  const inserted = await db.insert(users).values(user).returning();
  return inserted[0];
}


