export interface UserTable {
  id: string;
  email: string;
  provider: string;
  providerReference: string;
  avatar: string | null;
  name: string | null;
  accessToken: string;
  refreshToken: string | null;
  tokenExpiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
