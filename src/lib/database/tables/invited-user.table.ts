export interface InvitedUserTable {
  id: string;
  email: string;
  token: string;
  roleId: string;
  scope: "board" | "team";
  scopeId: string;
  status: "pending" | "accepted";
  acceptedAt: Date | null;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
