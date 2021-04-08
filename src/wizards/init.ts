import WizardScene from "telegraf/scenes/wizard";
import { texts, initRequest } from "../utils";

export const initWizard = new WizardScene(
  "init-wizard",
  async (ctx) => {
    try {
      await ctx.telegram.sendMessage(ctx.from.id, texts.init);
      return ctx.wizard.next();
    } catch (error) {
      console.log(error);
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  },
  async (ctx) => {
    try {
      const payload = ctx.message.text;

      const payloadArray = payload.split(" ");

      const apiResponse: any = await initRequest(payloadArray[0], payloadArray[1]);

      if (apiResponse.status === 201) await ctx.telegram.sendMessage(ctx.from.id, `Here your unique token ${apiResponse.data}`);
      else await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    } catch (e) {
      await ctx.telegram.sendMessage(ctx.from.id, "Something went wrong");
      return ctx.scene.leave();
    }
  }
);
