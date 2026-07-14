import type { RequestHandler } from "express";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export const requireAuth: RequestHandler = (req, res, next) => {
  const user = req.user;

  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (!user.email) {
    res.status(401).json({
      message: "Authenticated user email is missing",
    });
    return;
  }

  next();
};

export function requireRole(...roles: string[]): RequestHandler {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }

    next();
  };
}