export interface User {
  email: string;
  password: string;
}

export interface Session {
  id: string;
  userEmail: string;
  date: string;
  techStack: string;
  topics: string[];
}
