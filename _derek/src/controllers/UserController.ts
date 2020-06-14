import Discord from "discord.js";
import knex from "../database/connection";

class UserController {
  async create(message: Discord.Message, prompt: string): Promise<string> {
    return await message.author
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
          await knex("users").insert({
            id: message.author.id,
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
    const user = await knex
      .first()
      .from("users")
      .where("id", message.author.id);

    if (!user) {
      // return await this.create(message);
      return undefined;
    }
    const locale = user.locale as string;

    return locale;
  }

  async delete(id: string): Promise<void> {
    await knex.delete().from("users").where("id", id);
  }
}

export default UserController;
