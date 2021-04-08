import express from "express";
import bodyParser from "body-parser";
import Telegraf, { Stage, Telegram } from "telegraf";
import session from "telegraf/session";
import { init, destroy, getAllTradingPairs, getUserBalance } from "./commands";
import { initWizard, destroyWizard, getAllTradinPairsWizard, getUserBalanceWizard } from "./wizards";
import { BOT_PORT, BINANCE_BOT_TOKEN } from "./utils";

const bot = new Telegraf(BINANCE_BOT_TOKEN);
const telegram = new Telegram(BINANCE_BOT_TOKEN);

// @ts-ignore
telegram.getUpdates(0, 100, -1).then((updates) => {
  if (updates.length > 0) {
    // @ts-ignore
    telegram.getUpdates(0, 100, updates[updates.length - 1].update_id + 1);
  }
});

const stage = new Stage([initWizard, destroyWizard, getAllTradinPairsWizard, getUserBalanceWizard]);

bot.use(session());
bot.use(stage.middleware());

const app = express();

app.use(express.urlencoded());
app.use(bodyParser.json());

bot.command("start", (ctx) => ctx.replyWithMarkdown("Hello ✊\nPlease use commands with / to control me"));
bot.command("init", init);
bot.command("destroy", destroy);
bot.command("getAllTradingPairs", getAllTradingPairs);
bot.command("getUserBalance", getUserBalance);
// bot.command("createAlert", createAlert);
// bot.command("alertPull", alertPull);

bot.launch();

/*
For set commands list in bot
    init - initialize alert system
    destroy - destroy alert system
    getalltradingpairs - get all trading pairs
    getuserbalance - get user balance
    createalert - create custom alert
    alertpull - real time binance data
 */

app.listen(BOT_PORT, () => {
  console.info(`🚀 Binance Alert Bot ready`);
});
