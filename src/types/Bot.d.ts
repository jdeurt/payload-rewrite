import { Client, Collection, Message } from "discord.js";
import { Command } from "../lib/Executables/Command";
import { AutoResponse } from "./AutoResponse";
import UserManager from "../lib/UserManager";
import ServerManager from "../lib/ServerManager";
import { ScheduledScript } from "./ScheduledScript";

/**
 * Payload Bot interface.
 */
export interface Bot extends Client {
    /**
     * Whether or not the bot's database is ready to be accessed.
     */
    isReady: boolean,

    /**
     * A collection of scheduled scripts.
     */
    scheduled: Array<ScheduledScript>,

    /**
     * A collection of commands indexed by each of their names.
     */
    commands: Collection<string, Command>,

    /**
     * A collection of automatic responses indexed by each of their names.
     */
    autoResponses: Collection<string, AutoResponse>,

    userManager: UserManager,
    serverManager: ServerManager,

    leaderboard: {
        users: Array<{ id: string, pushed: number }>,
        updated: Date
    },

    /**
     * The bot's temporary cache.
     */
    cache: {

        /**
         * Snipe cache.
         */
        snipe: {
            [guild: string]: {
                [channel: string]: Collection<string, Message>
            }
        },

        pings: {
            [guild: string]: {
                [channel: string]: Collection<string, Message>
            }
        },

        /**
         * Music cache.
         */
        music: {
            [guild: string]: {
                isPlaying?: boolean,
            }
        }
    }
}