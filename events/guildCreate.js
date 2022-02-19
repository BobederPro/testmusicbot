const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("guildCreate", async (guild) => {
  if (!guild) return;
  let channel = guild.channels.cache.find(
    (ch) =>
      ch.type === "GUILD_TEXT" &&
      ch.permissionsFor(guild.me).has("SEND_MESSAGES")
  );

  if (guild.me.permissions.has("USE_APPLICATION_COMMANDS")) {
    try {
      guild.commands
        .set(client.arrayOfCommands)
        .then((s) => {
          channel.send(`Erfolgreich alle (/) Commands erstellt`);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    channel.send(
      `Ich habe nicht die \`USE_APPLICATION_COMMANDS\` Rechte, deshalb kann ich keine (/) Commands erstellen. Falls du mich trotzdem nützen möchtest, gebe mir die \`USE_APPLICATION_COMMANDS\` Rechte und lade mich neu ein`
    );
  }
});
