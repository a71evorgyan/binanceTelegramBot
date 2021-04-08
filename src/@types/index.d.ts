import { ContextMessageUpdate } from "telegraf";

export interface CustomContextMessageUpdate extends ContextMessageUpdate {
  session?: any;
  scene?: any;
  replyWithMarkdown(...args: any): Promise<any>;
}
