import { Bot } from "../../types";
import { Message, RichEmbed } from "discord.js";
import config from "../../../secure-config";
import { User, UserModel } from "../../models/User";

export const name = "leaderboard";
export const description = "Shows the pushcart user leaderboard.";
export const usage = config.PREFIX + name;
export const permissions = ["SEND_MESSAGES"];
export const canBeExecutedBy = ["SEND_MESSAGES"];
export const zones = ["text", "dm"];

export async function run(bot: Bot, msg: Message) {
    if (!bot.leaderboard) return msg.channel.send("Leaderboard has not yet been generated. Try again in a couple minutes.");

    let top10 = bot.leaderboard.users.slice(0, 10);

    let isTop10 = false;
    let leaderboardString = "Pushcart Leaderboard\n```md\n";

    for (let i = 0; i < top10.length; i++) {
        let tag = (bot.users.get(top10[i].id) || await bot.fetchUser(top10[i].id)).tag;

        if (top10[i].id == msg.author.id) {
            leaderboardString += `> ${i + 1}: ${tag} (${top10[i].pushed})\n`;
            isTop10 = true;
        } else {
            leaderboardString += `${i + 1}: ${tag} (${top10[i].pushed})\n`;
        }
    }

    if (!isTop10) leaderboardString += `...\n> ${bot.leaderboard.users.findIndex(user => user.id == msg.author.id) + 1}: ${msg.author.tag} (${(bot.leaderboard.users.find(user => user.id == msg.author.id) || { pushed: 0 }).pushed})\n\`\`\``;

    leaderboardString += `\nLast updated: ${bot.leaderboard.updated.toLocaleString()}`;

    msg.channel.send(leaderboardString);
}