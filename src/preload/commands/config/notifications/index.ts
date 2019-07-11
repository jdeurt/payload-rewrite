import { Command } from "../../../../lib/Executables/Command";
import { Bot } from "../../../../types/Bot";
import { Message } from "discord.js";

export default class logsApiKey extends Command {
    constructor() {
        super(
            "notifications",
            "**USING THESE COMMANDS IN A PUBLIC SERVER PUTS YOUR ACCOUNT AT RISK OF BEING HIJACKED! MAKE SURE TO USE THESE COMMANDS ONLY IN BOT DMS!**\n\nSets your Payload notifications level. 2 = all, 1 = major, 0 = none.",
            [
                {
                    name: "level",
                    description: "Your desired notifications level. 2 = all, 1 = major, 0 = none.",
                    required: true,
                    type: "number",
                    options: [2, 1, 0]
                }
            ],
            undefined,
            undefined,
            ["dm"],
            undefined,
            undefined,
            ["config"]
        );
    }

    async run(bot: Bot, msg: Message): Promise<boolean> {
        const args = await this.parseArgs(msg, 1);

        if (args === false) {
            return false;
        }

        const user = await bot.userManager.getUser(msg.author.id);
        user.setProp("notificationsLevel", args[0]);
        await user.save();

        await this.respond(msg, `Set notifications to \`${args[0]}\``);

        return true;
    }
}