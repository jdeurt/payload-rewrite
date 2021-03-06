import { Bot } from "../../types";
import { Message } from "discord.js";

export const name = "hello world";
export const description = "A test command that also serves as a template for other commands.";
export const pattern = /test payload hello world/;
export const permissions = ["SEND_MESSAGES"];
export const zones = ["text", "dm"];

export async function run(bot: Bot, msg: Message) {
    msg.channel.send("Hello World!");
}

function matchMsg(msg: Message) {
    let match = msg.content.match(pattern) as RegExpMatchArray;

    return match[0];
}