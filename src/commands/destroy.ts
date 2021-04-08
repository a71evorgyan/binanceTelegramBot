import { Middleware } from "telegraf";
import { CustomContextMessageUpdate } from "../@types";

export const destroy: Middleware<CustomContextMessageUpdate> = async (ctx: CustomContextMessageUpdate) => {
  try {
    return ctx.scene.enter("destroy-wizard");
  } catch (error) {
    console.error(error);
  }
};
