import bcrypt from "bcryptjs";

export async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const [adminUser, adminPass]: string[] = [
    process.env.ADMIN_USER || "Default user",
    process.env.ADMIN_PASSWORD || "Default password",
  ];
  if (username !== adminUser) {
    return false;
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    await bcrypt.hash(adminPass, 10)
  );
  return isPasswordValid;
}
