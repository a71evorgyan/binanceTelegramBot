import WizardScene from "telegraf/scenes/wizard";
import { texts, getAllTradinPairsRequest } from "../utils";

export const getAllTradinPairsWizard = new WizardScene(
  "get-all-trading-pairs-wizard",
  async (ctx) => {
    try {
      await ctx.telegram.sendMessage(ctx.from.id, texts.getAllTradinPairs);
      return ctx.wizard.next();
    } catch (error) {
      console.log(error);
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      const apiResponse: any = await getAllTradinPairsRequest(ctx.message.text);
      const pairs = apiResponse.data.slice(0, 100).join("\t\t\t"); // fix this to show more data with continue...

      if (apiResponse.status === 200) await ctx.telegram.sendMessage(ctx.from.id, pairs);
      else await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    } catch (e) {
      console.log(e.message);

      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  }
);
