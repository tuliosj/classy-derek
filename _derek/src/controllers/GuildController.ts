import Discord from "discord.js";
import knex from "../database/connection";

class GuildController {
  async create(message: Discord.Message, prompt: string): Promise<string> {
    if (message.guild && message.member?.hasPermission("MANAGE_GUILD")) {
      return await message.channel
        .send(prompt)
        .then(async (localeQuestion) => {
          await localeQuestion.react("🇺🇸");
          await localeQuestion.react("🇧🇷");

          const filter = (
            reaction: Discord.MessageReaction,
            user: Discord.User | Discord.PartialUser
          ) =>
            ["🇺🇸", "🇧🇷"].includes(reaction.emoji.name) &&
            user.id === message.author.id;

          const reaction = await (
            await localeQuestion.awaitReactions(filter, { max: 1, time: 60000 })
          ).first();

          if (reaction) {
            let lang = "en_US";
            if (reaction.emoji.name === "🇧🇷") {
              lang = "pt_BR";
            }
            await knex("guilds").insert({
              id: message.guild!.id,
              locale: lang,
            });
            await localeQuestion.delete();
            return lang;
          } else {
            await localeQuestion.delete();
            return "expired";
          }
        })
        .catch((e) => {
          console.error(e);
          return "expired";
        });
    }
    return "unauthorized";
  }

  async check(message: Discord.Message): Promise<string | undefined> {
    if (message.guild) {
      const guild = await knex
        .first()
        .from("guilds")
        .where("id", message.guild.id);

      if (!guild) {
        // return await this.create(message);
        return undefined;
      }
      const locale = guild.locale as string;
      return locale;
    }
    return undefined;
  }

  async delete(id: string): Promise<void> {
    await knex.delete().from("guilds").where("id", id);
  }
}

export default GuildController;
