import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

export const BOT_PORT = process.env.BINANCE_BOT_PORT;
export const BINANCE_BOT_TOKEN = process.env.BINANCE_BOT_TOKEN;
export const BINANCE_BACK_URL = process.env.BINANCE_BACK_URL;
