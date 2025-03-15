import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const boardRouter = createTRPCRouter({
  getUserBoards: protectedProcedure
    .output(
      z.promise(
        z.array(
          z.object({
            // id: string;
            // type: string;
            // name: string;
            // description: string | null;
            // state: JsonValue;
            // isEnabled: boolean;
            // ownerId: string;
            // createdAt: Date;
            // updatedAt: Date;
            id: z.string(),
            type: z.string(),
            name: z.string(),
            description: z.string().nullish(),
            state: z.object({
              // TODO(David): add schema shape
            }),
            isEnabled: z.boolean(),
            ownerId: z.string(),
          }),
        ),
      ),
    )
    .query(async (input) => {
      const userId = input.ctx.session.user.id;
      const boards = await input.ctx.db.boardUser
        .findMany({
          select: {
            board: true,
          },
          where: {
            userId,
            board: {
              isEnabled: true,
            },
          },
          orderBy: {
            board: {
              createdAt: "desc",
            },
          },
        })
        .then((result) => result.map((userBoard) => userBoard.board));

      return boards as any;
    }),
});
