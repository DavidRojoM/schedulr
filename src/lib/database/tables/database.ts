import { BoardSnapshotTable } from "./board-snapshot";
import { BoardUserTable } from "./board-user.table";
import { BoardTable } from "./board.table";
import { InvitedUserTable } from "./invited-user.table";
import { PermissionTable } from "./permission.table";
import { RolePermissionTable } from "./role-permission.table";
import { RoleTable } from "./role.table";
import { UserTable } from "./user.table";

export interface Database {
  user: UserTable;
  invitedUser: InvitedUserTable;
  board: BoardTable;
  boardUser: BoardUserTable;
  role: RoleTable;
  permission: PermissionTable;
  rolePermission: RolePermissionTable;
  boardSnapshot: BoardSnapshotTable;
}
