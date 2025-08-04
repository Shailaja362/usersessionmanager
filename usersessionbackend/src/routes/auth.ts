import { Plugin } from '@hapi/hapi';
import { saveUser, getUsers } from '../auth_store';
import { authSchema, authSchemasignin } from '../schemas/auth.schema';
import Jwt from '@hapi/jwt';


const authRoutes: Plugin<{}> = {
  name: 'authRoutes',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/signup',
        options: { auth: false },
        handler: (request, h) => {
          const parseResult = authSchema.safeParse(request.payload);
          if (!parseResult.success) {
            return h
              .response({ errors: parseResult.error.flatten().fieldErrors })
              .code(400);
          }
          const { email, password } = parseResult.data;
          const users = getUsers();
          const existingUser = users.find(user => user.email === email);

          if (existingUser) {
            return h
              .response({ error: 'Email already exists' })
              .code(409);
          }

          saveUser({ email, password });
          return h.response({ success: true }).code(201);
        }
      },
      {
        method: 'POST',
        path: '/signin',
        options: {
          auth: false
        },
        handler: (request, h) => {
          const secretKey = process.env.JWT_SECRET;

          if (!secretKey) {
            console.error('JWT_SECRET not defined in .env');
            return h.response({ error: 'Server misconfiguration' }).code(500);
          }

          const parseResult = authSchemasignin.safeParse(request.payload);
          if (!parseResult.success) {
            return h.response({ errors: parseResult.error.flatten().fieldErrors }).code(400);
          }

          const { email, password } = parseResult.data;
          const users = getUsers();
          const user = users.find(u => u.email === email);

          if (!user || user.password !== password) {
            return h.response({ error: 'Invalid credentials' }).code(401);
          }

          const token = Jwt.token.generate(
            {
              id: user.id,
              email: user.email,
              password: user.password
            },
            {
              key: secretKey,
              algorithm: 'HS256'
            }
          );

          return h.response({
            success: true,
            token
          }).code(200);
        }
      }

    ]);
  }

};


export default authRoutes;
