/**
 *
 * @param {import('kysely').Kysely<import('../tables/database').Database>} db
 */
export async function up(db) {
  await db
    .insertInto("role")
    .values([
      { id: "00000000-0000-0000-0000-000000000001", name: "admin" },
      { id: "00000000-0000-0000-0000-000000000002", name: "writer" },
      { id: "00000000-0000-0000-0000-000000000003", name: "reader" },
    ])
    .execute();

  await db
    .insertInto("permission")
    .values([
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
    ])
    .execute();

  await db
    .insertInto("role_permission")
    .values([
      // Admins can do everything.
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000001",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000002",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000003",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000004",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000005",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000006",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000007",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000008",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000001",
        permission_id: "00000000-0000-0000-0000-000000000009",
      },

      // Editors can read the board, edit the board and edit the board settings.
      {
        role_id: "00000000-0000-0000-0000-000000000002",
        permission_id: "00000000-0000-0000-0000-000000000001",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000002",
        permission_id: "00000000-0000-0000-0000-000000000002",
      },
      {
        role_id: "00000000-0000-0000-0000-000000000002",
        permission_id: "00000000-0000-0000-0000-000000000003",
      },

      // Readers can read the board.
      {
        role_id: "00000000-0000-0000-0000-000000000003",
        permission_id: "00000000-0000-0000-0000-000000000001",
      },
    ])
    .execute();
}

/**
 *
 * @param {import('kysely').Kysely<import('../tables/database').Database} db
 */
export async function down(db) {
  await db.deleteFrom("role_permission").execute();
  await db.deleteFrom("permission").execute();
  await db.deleteFrom("role").execute();
}
