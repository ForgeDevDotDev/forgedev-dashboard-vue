import { Request, Response, NextFunction } from "express";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = (req as any).user; //typescript wasn't recognizing req.user
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}