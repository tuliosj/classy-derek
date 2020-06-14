import Discord from "discord.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

import commands from "./commands";
import GuildController from "./controllers/GuildController";

const guildController = new GuildController();

const client = new Discord.Client({ messageCacheMaxSize: 7 });

client.login(process.env.token);

client.on("error", console.error);

// Link para adicionar bot (permissões básicas):
// https://discord.com/oauth2/authorize?client_id=719551785978822756&scope=bot&permissions=3319808
// Link para adicionar bot (admin):
// https://discord.com/oauth2/authorize?client_id=719551785978822756&scope=bot&permissions=8
client.on("ready", () => {
  if (client.user) {
    console.log(
      `Logged in as ${client.user.tag} on ${client.guilds.cache.size} servers!`
    );
    client.user.setActivity("Just call for Derek!");
  } else {
    console.log("Ready, but user not defined!");
  }
});

client.on("guildCreate", (guild) => {
  console.log(`[guildCreate] Added to server "${guild.name}".`);
  guildController.newGuild(guild);
});

client.on("guildDelete", (guild) => {
  console.log(`[guildDelete] Removed from server "${guild.name}".`);
  guildController.delete(guild.id);
});

client.on("message", (message) => {
  // Ignore bot messages
  if (message.system || message.author.bot) return;

  // look for commands
  commands(message);
});

// client.on("messageReactionAdd", async (reaction, user) => {
//   // Ignore DMs
//   if (reaction.message.channel.type === "dm") return;
//   if (!reaction.message.guild || !reaction.message.guild.available) return;

//   // Ignore bot messages and reactions
//   if (reaction.message.system || reaction.message.author.bot || user.bot)
//     return;
// });
