import { Command } from "../../../lib/Executables/Command";
import { Bot } from "../../../types/Bot";
import { Message } from "discord.js";
import { random } from "../../../utils/random";

export default class RTD extends Command {
    constructor() {
        super(
            "rtd",
            "Rolls a die with 6 sides or a die with [sides] sides if specified or [amount] dice with [sides] sides if specified.",
            [
                {
                    name: "sides",
                    description: "The amount of sides that the dice should have.",
                    required: false,
                    type: "number",
                    min: 2
                },
                {
                    name: "amount",
                    description: "The amount of dice to roll.",
                    required: false,
                    type: "number",
                    min: 1,
                    max: 50
                }
            ]
        );
    }

    async run(bot: Bot, msg: Message): Promise<boolean> {
        const args = await this.parseArgs(msg);

        if (args === false) {
            return false;
        }

        const sides = args[0] as Number || 6;
        const amount = args[1] as Number || 1;

        let dice: number[] = [];

        for (let i = 0; i < Math.round(Number(amount)); i++) {
            dice.push(random(1, Math.round(Number(sides))));
        }

        await this.respond(msg, dice.map(roll => `🎲 **${roll}**`).join(" | "));

        return true;
    }
}