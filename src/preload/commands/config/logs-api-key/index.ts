import { Command } from "../../../../lib/Executables/Command";
import { Bot } from "../../../../types/Bot";
import { Message } from "discord.js";

export default class logsApiKey extends Command {
    constructor() {
        super(
            "logs-api-key",
            "**USING THESE COMMANDS IN A PUBLIC SERVER PUTS YOUR ACCOUNT AT RISK OF BEING HIJACKED! MAKE SURE TO USE THESE COMMANDS ONLY IN BOT DMS!**\n\nSets your logs.tf API key to <key>",
            [
                {
                    name: "key",
                    description: "Your logs.tf API key.",
                    required: true,
                    type: "string"
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
        user.user.logsTfApiKey = args[0] as string;
        await user.save();

        await this.respond(msg, `Set logs-api-key to \`${args[0]}\``);

        return true;
    }
}