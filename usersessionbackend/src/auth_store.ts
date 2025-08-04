import fs from 'fs';

const USERS_FILE = './users.json';
const SESSION_FILE = './sessions.json';

export interface User {
  id: number,
  email: string;
  password: string;
}

export function getUsers(): User[] {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

export function saveUser(user: Omit<User, 'id'>): User {
  const users = getUsers();
  const maxId = users.length > 0
    ? Math.max(...users.map(u => u.id ?? 0))
    : 0;
  const newUser: User = {
    id: maxId + 1,
    ...user,
  };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  return newUser;
}


