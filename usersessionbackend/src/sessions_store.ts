import { db } from './db/index';
import { user_sessions } from './db/sessions';
import { eq } from 'drizzle-orm';

export interface Session {
  id?: number,
  userId: number,
  date: string,
  techStack: string,
  topics: string[]
 }

export interface AuthenticatedRequest extends Request {
  auth: {
    credentials: {
      user: {
        id: number;
        email: string;
        name: string;
      }
    };
  };
}
  
export async function getSessions() {
   return await db.select().from(user_sessions);
}

export async function saveSession(
  session: Omit<Session, 'userId' | 'id'>,
  request: AuthenticatedRequest
) {
  const user = request.auth.credentials.user;

  const [newSession] = await db
    .insert(user_sessions)
    .values({
      userId: user.id,
      date: session.date,
      techStack: session.techStack,
      topics: session.topics,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return newSession;
}

export async function deleteSessionById(id: number) {
  await db.delete(user_sessions).where(eq(user_sessions.id, id));
}

