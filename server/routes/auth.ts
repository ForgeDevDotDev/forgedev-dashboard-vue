import { Router } from "express";
import { WorkOS } from "@workos-inc/node";

const router = Router();

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

/**
 * Start WorkOS login.
 */
router.get("/login", (req, res) => {
  const authorizationUrl =
    workos.userManagement.getAuthorizationUrl({
      clientId: process.env.WORKOS_CLIENT_ID!,
      redirectUri: process.env.WORKOS_REDIRECT_URI!,
      provider: "authkit",
    });

  res.json({ authorizationUrl });
});

/**
 * WorkOS redirects the user here after authentication.
 */
router.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (typeof code !== "string") {
    res.status(400).json({
      message: "Authorization code is required",
    });
    return;
  }

  try {
    const authResponse =
      await workos.userManagement.authenticateWithCode({
        clientId: process.env.WORKOS_CLIENT_ID!,
        code,
      });

    const { user, accessToken, refreshToken } = authResponse;

    if (!user.email) {
      res.status(400).json({
        message: "WorkOS did not return a user email",
      });
      return;
    }

    const loggedInUser = {
      id: user.id,
      email: user.email,
      name: user.firstName ?? "",
      role: "Client",
    };

    /*
     * Temporary debugging only.
     * Do not log accessToken or refreshToken.
     */
    console.log("Authenticated user:", loggedInUser);

    /*
     * We will replace this section with secure session storage.
     * The tokens are currently available here:
     *
     * accessToken
     * refreshToken
     */
    void accessToken;
    void refreshToken;

    res.redirect(process.env.FRONTEND_URL!);
  } catch (error) {
    console.error("WorkOS authentication failed:", error);

    res.status(500).json({
      error: "Authentication failed",
    });
  }
});

export default router;