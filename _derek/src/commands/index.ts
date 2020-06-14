import regex from "../regex";
import Discord from "discord.js";

import meme from "./meme";
import UserController from "../controllers/UserController";

import i18n from "../i18n";

const userController = new UserController();

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
    const user_locale = await userController.check(message);
    const locale = user_locale || "en_US";

    switchCase(message, locale);
  }
};
