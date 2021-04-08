import { Middleware } from "telegraf";
import { CustomContextMessageUpdate } from "../@types";

export const getAllTradingPairs: Middleware<CustomContextMessageUpdate> = async (ctx: CustomContextMessageUpdate) => {
  try {
    return ctx.scene.enter("get-all-trading-pairs-wizard");
  } catch (error) {
    console.error(error);
  }
};
