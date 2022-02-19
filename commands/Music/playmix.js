const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
} = require("discord.js");

module.exports = new Command({
  name: "playmix",
  description: `Spiele die bekanntesten Playlisten mit mir`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Zuerst musst du einem Voicechannel joinen **`
      );
    }  else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du musst zuerst __meinem__ Voicechannel joinen **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} Ich bin gemuted, entmutet mich zuerst **`
      );
    } else {
      let menuraw = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("mix")
          .setPlaceholder(`Wähle deine Playlist aus`)
          .addOptions([
            {
              label: "NCS besten Lieder",
              value: `https://www.youtube.com/playlist?list=PLRBp0Fe2GpglvwYma4hf0fJy0sWaNY_CL`,
              description: "Klicke um die Ncs Playlist zu spielen",
              emoji: "924259350976036915",
            },
            {
              label: "English Best Song",
              value: `https://www.youtube.com/playlist?list=PLI_7Mg2Z_-4IWcD4drvDLYWp-eIZQUMUN`,
              description: "Klicke im die besten englischen Songs zu spielen",
              emoji: "924259350976036915",
            },
            {
              label: "BTS besten Lieder",
              value: `https://www.youtube.com/playlist?list=PLOa8BHrUPdaQ3jePqgKJ1vcO5Y8_GTnwq`,
              description: "Klcike um die besten BTS Songs zu spielen",
              emoji: "924259350976036915",
            },
            {
              label: "Arjit Singh besten Lieder",
              value: `https://www.youtube.com/playlist?list=PL0Z67tlyTaWq7xmJYR0Im1fwtIhc0T0_6`,
              description: "Klicke um die besten Songs von Arjt Singh zu spielen",
              emoji: "924259350976036915",
            },
            {
              label: "Die besten Lieder von Aish",
              value: `https://www.youtube.com/playlist?list=PLn745S-SiNkg0pXVX18nRDYupKfA79okd`,
              description: "Klicke um die besten Lieder von Aish zu spielen",
              emoji: "924259350976036915",
            },
            {
              label: "Besten Lieder von Emma Heesters",
              value: `https://www.youtube.com/playlist?list=PLMDOg4hOhCgoXri8t924R3ufPmiU0pqhV`,
              description: "Klicke um die besten Songs von Emma Heesters zu spiele",
              emoji: "924259350976036915",
            },
            {
              label: "Die besten Lieder von All Time BollyWood Best Song",
              value: `https://www.youtube.com/playlist?list=PLsQuyLqYpjSMF6bSX7C4W4e7YNqyXDHOM`,
              description: "Klicke um die besten Lieder von Best BollyWood zu spielen",
              emoji: "924259350976036915",
            },
          ]),
      ]);
      let embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`Die besten Playlisten nur für dich`)
        .setDescription(`>>> Klicke um alle Playlisten zu sehen\n\n Du hast eine gute Playlist schreibe BenB#4849 eine DM, dass er sie hinzufügen kann`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: ee.footertext, iconURL: ee.footericon });

      interaction
        .followUp({ embeds: [embed], components: [menuraw] })
        .then(async (msg) => {
          let filter = (i) => i.user.id === interaction.user.id;
          let collector = await msg.createMessageComponentCollector({
            filter: filter,
          });
          collector.on("collect", async (interaction) => {
            if (interaction.isSelectMenu()) {
              if (interaction.customId === "mix") {
                await interaction.deferUpdate().catch((e) => {});
                let song = interaction.values[0];
                player.play(channel, song, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                });
              }
            }
          });
        });
    }
  },
});
