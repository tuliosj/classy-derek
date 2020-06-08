import regex from "../regex";
import Discord from "discord.js";

import meme from "./meme";

export default (message: Discord.Message) => {
  if (message.content.search(regex.derek) >= 0) {
    // if someone types meme
    if (message.content.search(regex.meme.find) >= 0) {
      // checking for syntax
      if (message.attachments.first()) {
        if (message.content.search(regex.meme.syntax) >= 0) {
          meme(message);
        } else {
          message.channel.send(
            "Derek only works with something like: derek meme *top text* -bottom text- optional message"
          );
        }
      } else {
        message.channel.send("Derek needs image for meme");
      }
    } else {
      // Send a default answer
      const default_answers = [
        "Derek?",
        "DEEEREK!",
        "Derek!",
        "Derek...",
        "derek",
      ];
      message.channel.send(
        default_answers[Math.floor(Math.random() * default_answers.length)]
      );
    }
  }
};
