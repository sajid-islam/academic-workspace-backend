import { Role } from '../user/types/user.type.ts';

declare global {
  namespace Express {
    interface Request {
      user: { sub: string; role: Role };
    }
  }
}
