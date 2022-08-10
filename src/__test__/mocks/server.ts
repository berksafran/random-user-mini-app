import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { mockRandomUserResponse } from "./mockResponse";

export const server = setupServer(
    rest.get(`https://randomuser.me/api`, (req, res, ctx) => {
      return res(ctx.json(mockRandomUserResponse));
    }),
    rest.options(`https://randomuser.me/api`, (req, res, ctx) => {
      return res(ctx.json(mockRandomUserResponse));
    }),
  );