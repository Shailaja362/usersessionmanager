import Hapi from '@hapi/hapi';
import authRoutes from './routes/auth';
import sessionRoutes from './routes/sessions';
import Jwt from '@hapi/jwt';
import dotenv from 'dotenv';
  
dotenv.config();
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        credentials: true,
        additionalHeaders: ['cache-control', 'x-requested-with'],
        additionalExposedHeaders: ['content-type']
      }
    }
  });

  await server.register(Jwt);
  const secretKey = process.env.JWT_SECRET!;

  server.auth.strategy('jwt', 'jwt', {
    keys: secretKey, 
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true
    },
    validate: (artifacts, request, h) => {
      
      return {
        isValid: true,
        credentials: { user: artifacts.decoded.payload }
      };
    } 

  });

  server.auth.default('jwt'); 

  await server.register([authRoutes, sessionRoutes]);

  await server.start();
  console.log('Server running on', server.info.uri);
};

init();
