export interface IJWTService {
  generateToken(payload: object): string;
  verifyToken(token: string): object | null;
}
