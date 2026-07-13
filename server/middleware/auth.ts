import type { Request, Response, NextFunction } from "express"; //type

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user; //avoid (req as any).user
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if (!user ||!user.role || !roles.includes(user.role)) { //!user.req 
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
}