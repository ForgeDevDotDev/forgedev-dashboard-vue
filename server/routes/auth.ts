import express from "express";
import { WorkOS } from "@workos-inc/node";

const router = express.Router();

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

router.get("/login", async (req, res) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    clientId: process.env.WORKOS_CLIENT_ID!,
    redirectUri: process.env.WORKOS_REDIRECT_URI!,
    provider: "authkit",
  });

  res.json({ authorizationUrl });
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string;

  try {
    const authResponse = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID!,
      code,
    });

    const { user, accessToken, refreshToken } = authResponse;

    // Assign default role
    const loggedInUser = {
      ...user,
      email: user.email,
      name: user.firstName,
      role: "Client",
    };

    return res.redirect(process.env.FRONTEND_URL!);  //localhost defines in server/.env

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

export default router;