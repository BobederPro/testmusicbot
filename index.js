const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
module.exports = client;

const config = require("./settings/config.json");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.mcommands = new Collection();
client.aliases = new Collection();
client.temp = new Map();
client.temp2 = new Map();
client.categories = fs.readdirSync("./commands/");

["event_handler", "slash_handler", "Player_Handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

const Enmap = require("enmap");
client.settings = new Enmap({
  name: "settings",
  dataDir: "./Database/Settings",
});
client.music = new Enmap({
  name: "music",
  dataDir: "./Database/Music",
});

client.login(process.env.token || config.token);

process.on("unhandledRejection", (reason, p) => {
//  console.log(" [Error_Handling] :: Frage BenB nach Hilfe");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
//  console.log(" [Error_Handling] :: Frage BenB nach Hilfe");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
//  console.log(" [Error_Handling] :: Frage BenB nach Hilfe");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
//  console.log(" [Error_Handling] :: Frage BenB nach Hilfe");
  console.log(type, promise, reason);
});
