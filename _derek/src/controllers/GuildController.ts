import Discord from "discord.js";
import knex from "../database/connection";
import i18n from "../i18n";

class GuildController {
  async newGuild(guild: Discord.Guild) {
    if (guild.owner) {
      const locale = await this.create(
        guild.owner,
        guild.owner.id,
        i18n["en_US"].guildController.prompt
      );
      guild.owner.send(i18n[locale].guildController.saved);
      if (guild.systemChannel)
        guild.systemChannel.send(i18n[locale].guildController.hi);
    } else {
      console.log(
        "É sério que adicionaram o bot em um server que não tem dono?"
      );
    }
  }

  async create(
    channel: Discord.TextChannel | Discord.GuildMember,
    authorId: string,
    prompt: string
  ): Promise<string> {
    return await channel
      .send(prompt)
      .then(async (localeQuestion) => {
        await localeQuestion.react("🇺🇸");
        await localeQuestion.react("🇧🇷");

        const filter = (
          reaction: Discord.MessageReaction,
          user: Discord.User | Discord.PartialUser
        ) => ["🇺🇸", "🇧🇷"].includes(reaction.emoji.name) && user.id === authorId;

        const reaction = await (
          await localeQuestion.awaitReactions(filter, { max: 1, time: 60000 })
        ).first();

        if (reaction) {
          let lang = "en_US";
          if (reaction.emoji.name === "🇧🇷") {
            lang = "pt_BR";
          }
          await knex("guilds").insert({
            id: channel.guild.id,
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
