import WizardScene from "telegraf/scenes/wizard";
import { texts, destroyRequest } from "../utils";

export const destroyWizard = new WizardScene(
  "destroy-wizard",
  async (ctx) => {
    try {
      await ctx.telegram.sendMessage(ctx.from.id, texts.destroy);
      return ctx.wizard.next();
    } catch (error) {
      console.log(error);
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      const apiResponse: any = await destroyRequest(ctx.message.text);
      if (apiResponse.status === 204) await ctx.telegram.sendMessage(ctx.from.id, `Destroyed`);
      else await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    } catch (e) {
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  }
);
