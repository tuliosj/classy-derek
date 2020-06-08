import Discord from "discord.js";
import Editor from "./Editor";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "..", "..", ".env"),
});

const client = new Discord.Client({ messageCacheMaxSize: 7 });

client.login(process.env.token);

client.on("error", console.error);

// Link para adicionar bot:
// https://discord.com/oauth2/authorize?client_id=674421465470468106&scope=bot&permissions=3319808
client.on("ready", () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Saia já do meu gramado!");
  } else {
    console.log("Ready, but user not defined!");
  }
});

client.on("guildCreate", (guild) => {
  console.log(`[guildCreate] Added to server "${guild.name}".`);
});

client.on("guildDelete", (guild) => {
  console.log(`[guildDelete] Removed from server "${guild.name}".`);
});

client.on("message", (message) => {
  if (message.attachments) {
    console.log(
      message.attachments.map((msgAtt) => {
        Editor("mario.png", "s", "a");
      })
    );
  }
});
