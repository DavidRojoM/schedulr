import { db } from "../src/server/db";

async function main() {
  await db.$transaction([
    db.role.createMany({
      data: [
        {
          name: "admin",
          id: "00000000-0000-0000-0000-000000000001",
        },
        {
          name: "writer",
          id: "00000000-0000-0000-0000-000000000002",
        },
        {
          name: "reader",
          id: "00000000-0000-0000-0000-000000000003",
        },
      ],
    }),
    db.permission.createMany({
      data: [
        {
          id: "00000000-0000-0000-0000-000000000001",
          name: "readBoard",
          description: "Read board",
        },
        {
          id: "00000000-0000-0000-0000-000000000002",
          name: "editBoard",
          description: "Edit board",
        },
        {
          id: "00000000-0000-0000-0000-000000000003",
          name: "updateBoardSettings",
          description: "Update board settings",
        },
        {
          id: "00000000-0000-0000-0000-000000000004",
          name: "inviteMembersToBoard",
          description: "Invite members to board",
        },
        {
          id: "00000000-0000-0000-0000-000000000005",
          name: "removeMembersFromBoard",
          description: "Remove members from board",
        },
        {
          id: "00000000-0000-0000-0000-000000000006",
          name: "updateMemberRole",
          description: "Update member role",
        },
        {
          id: "00000000-0000-0000-0000-000000000007",
          name: "disableBoard",
          description: "Disable board",
        },
        {
          id: "00000000-0000-0000-0000-000000000008",
          name: "deleteBoard",
          description: "Delete board",
        },
        {
          id: "00000000-0000-0000-0000-000000000009",
          name: "recoverBoardFromSnapshot",
          description: "Recover board from snapshot",
        },
      ],
    }),
    db.rolePermission.createMany({
      data: [
        // Admins can do everything.
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000001",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000002",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000003",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000004",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000005",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000006",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000007",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000008",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000001",
          permissionId: "00000000-0000-0000-0000-000000000009",
        },
        // Editors can read the board, edit the board and edit the board settings.
        {
          roleId: "00000000-0000-0000-0000-000000000002",
          permissionId: "00000000-0000-0000-0000-000000000001",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000002",
          permissionId: "00000000-0000-0000-0000-000000000002",
        },
        {
          roleId: "00000000-0000-0000-0000-000000000002",
          permissionId: "00000000-0000-0000-0000-000000000003",
        },
        // Readers can read the board.
        {
          roleId: "00000000-0000-0000-0000-000000000003",
          permissionId: "00000000-0000-0000-0000-000000000001",
        },
      ],
    }),
  ]);

  if (process.env.NODE_ENV !== "production") {
    await db.$transaction([
      db.user.create({
        data: {
          id: "1",
          email: "test@test.com",
          password: "test",
          name: "Test User",
        },
      }),
    ]);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
