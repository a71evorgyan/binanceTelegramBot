import WizardScene from "telegraf/scenes/wizard";
import { texts, getUserBalanceRequest } from "../utils";

export const getUserBalanceWizard = new WizardScene(
  "get-user-balance-wizard",
  async (ctx) => {
    try {
      await ctx.telegram.sendMessage(ctx.from.id, texts.getUserBalance);
      return ctx.wizard.next();
    } catch (error) {
      console.log(error);
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      const apiResponse: any = await getUserBalanceRequest(ctx.message.text);

      if (apiResponse.status === 200) await ctx.telegram.sendMessage(ctx.from.id, apiResponse.data);
      else await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    } catch (e) {
      console.log(e.message);

      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  }
);
