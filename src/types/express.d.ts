declare global {
  namespace Express {
    interface Request {
      user: {
        sub: string;
        roles: string[];
        workspace: string;
      };
    }
  }
}

export {};
