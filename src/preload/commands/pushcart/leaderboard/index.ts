import { Command } from "../../../../lib/Executables/Command";
import { Bot } from "../../../../types/Bot";
import { Message, RichEmbed } from "discord.js";

export default class Leaderboard extends Command {
    constructor() {
        super(
            "leaderboard",
            "Shows the pushcart user leaderboard.",
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            ["pushcart"]
        );
    }

    async run(bot: Bot, msg: Message): Promise<boolean> {
        if (!bot.leaderboard) {
            return await this.fail(msg, "Leaderboard has not yet been generated. Try again in a couple minutes.");
        }

        const top10 = bot.leaderboard.users.slice(0, 10);

        let isTop10 = false;
        let leaderboardString = "```md\n";

        for (let i = 0; i < top10.length; i++) {
            let tag = (bot.users.get(top10[i].id) || await bot.fetchUser(top10[i].id)).tag;

            if (top10[i].id == msg.author.id) {
                leaderboardString += `> ${i + 1}: ${tag} (${top10[i].pushed})\n`;
                isTop10 = true;
            } else {
                leaderboardString += `${i + 1}: ${tag} (${top10[i].pushed})\n`;
            }
        }

        if (!isTop10) leaderboardString += `...\n> ${bot.leaderboard.users.findIndex(user => user.id == msg.author.id) + 1}: ${msg.author.tag} (${(bot.leaderboard.users.find(user => user.id == msg.author.id) || { pushed: 0 }).pushed})\n`;

        leaderboardString += "```";

        await msg.channel.send(new RichEmbed({
            title: "Pushcart Leaderboard",
            description: leaderboardString,
            footer: {
                text: `Last updated: ${bot.leaderboard.updated.toLocaleString()}`
            }
        }));

        return true;
    }
}