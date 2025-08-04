import fs from 'fs';

const SESSIONS_FILE = './sessions.json';

export interface Session {
  id?: number;
  userId: number; 
  date: string;
  techStack: string;
  topics: string[];
 }

export interface AuthenticatedRequest extends Request {
  auth: {
    credentials: {
      user: {
        id: number;
        email: string;
      }
    };
  };
}
 
export function getSessions(): Session[] {
  if (!fs.existsSync(SESSIONS_FILE)) return [];
  return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf-8'));
}

export function saveSession(session: Omit<Session, 'userId' | 'id'>,
  request: AuthenticatedRequest) {
  const sessions = getSessions();
  const users = request.auth.credentials;
   const maxId = sessions.length > 0
    ? Math.max(...sessions.map(s => s.id ?? 0))
    : 0;
   const newSession: Session = {
    id: maxId + 1,
    ...session,
    userId: users.user.id,   
  };

  sessions.push(newSession);
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
  return newSession;
 }

export function deleteSessionById(id: number) {
  const sessions = getSessions();  
  const filtered = sessions.filter(s => s.id !== id); 
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(filtered, null, 2));
}
