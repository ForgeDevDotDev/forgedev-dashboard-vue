import { Router } from "express";
import { WorkOS } from "@workos-inc/node";

const router = Router();

const workos = new WorkOS(process.env.WORKOS_API_KEY!);

router.get("/login", (req, res) => {
  const authorizationUrl =
    workos.userManagement.getAuthorizationUrl({
      clientId: process.env.WORKOS_CLIENT_ID!,
      redirectUri: process.env.WORKOS_REDIRECT_URI!,
      provider: "authkit",
    });

  //redirect instead of returning JSON
  res.redirect(authorizationUrl);
});

/**
 * WorkOS redirects the user here after authentication.
 */
router.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (typeof code !== "string") {
    return res.status(400).json({
      message: "Authorization code is required",
    });
  }

  try {
    const authResponse =
      await workos.userManagement.authenticateWithCode({
        clientId: process.env.WORKOS_CLIENT_ID!,
        code,
      });

    const { user, accessToken, refreshToken } = authResponse;

    if (!user.email) {
      return res.status(400).json({
        message: "WorkOS did not return a user email",
      });
    }

    const loggedInUser = {
      id: user.id,
      email: user.email,
      name: user.firstName ?? "",
      role: "Client",
    };

    
    console.log("Authenticated user:", loggedInUser);

    void accessToken;
    void refreshToken;

    return res.redirect(process.env.FRONTEND_URL!);
  } catch (error) {
    console.error("WorkOS authentication failed:", error);

    return res.status(500).json({
      error: "Authentication failed",
    });
  }
});

export default router;