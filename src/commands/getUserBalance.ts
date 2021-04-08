import { Middleware } from "telegraf";
import { CustomContextMessageUpdate } from "../@types";

export const getUserBalance: Middleware<CustomContextMessageUpdate> = async (ctx: CustomContextMessageUpdate) => {
  try {
    return ctx.scene.enter("get-user-balance-wizard");
  } catch (error) {
    console.error(error);
  }
};


