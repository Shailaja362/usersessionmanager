import { Plugin } from '@hapi/hapi';
import { getSessions, saveSession, deleteSessionById, AuthenticatedRequest } from '../sessions_store';
import { sessionSchema } from '../schemas/session.schema';

interface Session {
  id?: number;
  userId: number;
  date: string;
  techStack: string;
  topics: string[];
}


const sessionRoutes: Plugin<null> = {
  name: 'sessionRoutes',
  register: async function (server) {
    server.route({
      method: 'POST',
      path: '/sessions/new',
      options: { auth: 'jwt' },
      handler: (request, h) => {
        const parseResult = sessionSchema.safeParse(request.payload);

        if (!parseResult.success) {
          return h
            .response({ errors: parseResult.error.flatten().fieldErrors })
            .code(400);
        }
        const session: Omit<Session, 'userId' | 'id'> = parseResult.data;
        try {
          const authenticatedRequest = request as unknown as AuthenticatedRequest;
          const saved = saveSession(session, authenticatedRequest);

          return h.response({
            message: 'Session saved successfully',
            session: saved
          }).code(201);
        } catch (error) {
          return h.response({
            message: 'Session not saved',
            error: (error as Error).message
          }).code(500);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/sessions/list',
      options: { auth: 'jwt' },
      handler: (request, h) => {
        const authRequest = request as unknown as AuthenticatedRequest;
        const loggedInUserId = authRequest.auth.credentials.user.id;
        const allSessions = getSessions();
        const userSessions = allSessions.filter(s => s.userId === loggedInUserId);

        return h.response(userSessions).code(200);
      }
    });

    server.route({
      method: 'DELETE',
      path: '/sessions/{id}',
      options: { auth: 'jwt' },
      handler: (request, h) => {
        const id = Number(request.params.id);
        deleteSessionById(id);
        return h.response({ message: 'Session deleted successfully' }).code(200);
      }
    });

    server.route({
      method: 'GET',
      path: '/userget',
      options: { auth: 'jwt' },
      handler: (request, h) => {
        const authRequest = request as unknown as AuthenticatedRequest;
        const useremail = authRequest.auth.credentials.user.email;
        return h.response({ useremail }).type('application/json').code(200);
      }
    });
  }

};

export default sessionRoutes;






