import regex from "../regex";
import Discord from "discord.js";

import meme from "./meme";
import UserController from "../controllers/UserController";
import GuildController from "../controllers/GuildController";

import i18n from "../i18n";

const userController = new UserController();
const guildController = new GuildController();

const switchCase = async (message: Discord.Message, locale: string) => {
  // Meme
  if (message.content.search(regex.meme.find) >= 0) {
    if (message.attachments.first()) {
      if (message.content.search(regex.meme.syntax) >= 0) {
        meme(message);
      } else {
        message.channel.send(i18n[locale].meme.syntaxExample);
      }
    } else {
      message.channel.send(i18n[locale].meme.missingImage);
    }
  }

  // Server config
  else if (message.content.search(regex.server) >= 0) {
    if (
      message.channel.type === "text" &&
      message.member?.hasPermission("MANAGE_GUILD")
    ) {
      await guildController.delete(message.guild!.id);
      const new_locale = await guildController.create(
        message.channel,
        message.author.id,
        i18n[locale].guildController.prompt
      );
      if (new_locale === "expired") {
        message.channel.send(i18n[locale].guildController.expired);
      } else {
        locale = new_locale;
        message.channel.send(i18n[locale].guildController.saved);
      }
    } else {
      message.channel.send(i18n[locale].guildController.unauthorized);
    }
  }

  // User config
  else if (message.content.search(regex.user) >= 0) {
    await userController.delete(message.author.id);
    const new_locale = await userController.create(
      message,
      i18n[locale].userController.prompt
    );
    if (new_locale === "expired") {
      message.author.send(i18n[locale].userController.expired);
    } else {
      locale = new_locale;
      message.author.send(
        i18n[locale].userController.saved(message.author.username)
      );
    }
  }

  // Help
  else if (message.content.search(regex.help) >= 0) {
    message.channel.send(i18n[locale].help);
  }

  // Default response
  else {
    message.channel.send(
      i18n[locale].default_responses[
        Math.floor(Math.random() * i18n[locale].default_responses.length)
      ]
    );
  }
};

export default async (message: Discord.Message) => {
  if (
    message.content.search(regex.derek) >= 0 ||
    message.channel.type === "dm"
  ) {
    const guild_locale = await guildController.check(message);
    const user_locale = await userController.check(message);
    const locale = user_locale || guild_locale || "en_US";

    switchCase(message, locale);
  }
};
