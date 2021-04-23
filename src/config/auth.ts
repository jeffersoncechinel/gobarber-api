import { Secret } from 'jsonwebtoken';

export default {
  jwt: {
    secret: (process.env.APP_SECRET || 'default') as Secret,
    expiresIn: '1d',
  },
};
