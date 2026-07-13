declare module "express-serve-static-core" {
  interface user {
      id: string;
      email: string; //email required always(not ?)
      role: string;
    }
    interface Request{
      user: User;
    }
  }

export {};