import Discord from "discord.js";
import regex from "../../regex";

import Editor from "./Editor";
import fs from "fs";

export default async (message: Discord.Message) => {
  // Pegando variáveis da mensagem
  const top = message.content.match(regex.meme.top);
  const bottom = message.content.match(regex.meme.bottom);
  const rest = message.content.match(regex.meme.rest);
  const attachment = message.attachments.first();

  if (top && bottom && rest && attachment) {
    const file = await Editor(attachment.url, top[0], bottom[0]);
    await message.channel.send(rest[0], {
      files: [file],
    });
    // Deletando o arquivo após enviar mensagem
    fs.unlink(file, (err) => {
      return err && console.log(err);
    });
  } else {
    message.channel.send(
      "Derek's power was way too much for Discord. Not Derek's fault!"
    );
  }
};
