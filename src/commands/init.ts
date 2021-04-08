import { Middleware } from "telegraf";
import { CustomContextMessageUpdate } from "../@types";

export const init: Middleware<CustomContextMessageUpdate> = async (ctx: CustomContextMessageUpdate) => {
  try {
    return ctx.scene.enter("init-wizard");
  } catch (error) {
    console.error(error);
  }
};
