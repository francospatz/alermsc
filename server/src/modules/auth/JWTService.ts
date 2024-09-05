import { IJWTService } from "./interfaces/interfaces";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JWTService implements IJWTService {
  private readonly secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("No JWT_SECRET");
    }
    this.secret = process.env.JWT_SECRET;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.secret);

      if (typeof decoded === "object" && decoded != null) {
        return decoded as JwtPayload;
      }

      // Returning null if decoded's a string (because we are expecting an object)
      return null;
    } catch (error) {
      console.error("There was an error verifying the token:", error);
      return null;
    }
  }
}
