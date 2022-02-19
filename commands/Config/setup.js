const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const { MessageEmbed } = require("discord.js");
const emoji = require("../../settings/emoji.json");

module.exports = new Command({
  // options
  name: "setup",
  description: `Richtet den Musikchannel ein`,
  userPermissions: ["MANAGE_GUILD"],
  botPermissions: ["MANAGE_GUILD"],
  category: "Config",
  cooldown: 10,
  run: async ({ client, interaction, args, prefix }) => {
    await interaction.guild.channels
      .create(`ScheBa Musik`, {
        type: "GUILD_TEXT",
        parent: interaction.channel.parentId,
        userLimit: 3,
        rateLimitPerUser: 3,
      })
      .then(async (ch) => {
        await ch.send({ embeds: [client.queueEmed] }).then(async (queuemsg) => {
          await ch
            .send({ embeds: [client.playembed], components: [client.buttons2] })
            .then(async (playmsg) => {
              await client.music.set(interaction.guildId, {
                enable: true,
                channel: ch.id,
                playmsg: playmsg.id,
                queuemsg: queuemsg.id,
              });
              client.embed(
                interaction,
                `${emoji.SUCCESS} Das Musik System wurde erfolgreich in ${ch} aktiviert`
              );
            });
        });
      });
  },
});