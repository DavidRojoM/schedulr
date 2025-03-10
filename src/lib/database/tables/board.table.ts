export interface BoardTable {
  id: string;
  name: string;
  type: "public" | "private";
  description: string | null;
  state: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
