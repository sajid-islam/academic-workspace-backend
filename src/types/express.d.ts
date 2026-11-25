import { Role } from '../users/types/user.type.ts';

declare global {
  namespace Express {
    interface Request {
      user: { sub: string; role: Role };
    }
  }
}
