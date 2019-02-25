import { Bot } from "../../types";
import { Message, RichEmbed } from "discord.js";
import got from "got";
import cheerio from "cheerio";

export const name = "tftv";
export const description = "Created thread previews for TFTV threads.";
export const pattern = /teamfortress\.tv\/\d+\/[\w-]+/;
export const permissions = ["SEND_MESSAGES", "EMBED_LINKS"];
export const zones = ["text", "dm"];

export async function run(bot: Bot, msg: Message) {
    const resp = await got("https://" + matchMsg(msg));
    const $ = cheerio.load(resp.body);

    const frags = $("#thread-frag-count").text().trim();
    const title = $(".thread-header-title").text().trim();
    const $post = $("#thread-container > .post:first-child");
    const author = $post.find(".post-header .post-author").text().trim();
    const body = $post.find(".post-body").text().trim();

    let embed = new RichEmbed();
        embed.setAuthor(author);
        embed.setTitle(title);
        embed.setDescription(body.length > 500 ? body.slice(0, 500) + "..." : body);
        embed.setFooter(`${frags} frags`);
        embed.setTimestamp();

    msg.channel.send(embed);
}

function matchMsg(msg: Message) {
    let match = msg.content.match(pattern) as RegExpMatchArray;

    return match[0];
}