const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = new Command({
  name: "search",
  description: `Sucht dein Lieblingslied`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  options: [
    {
      name: "song",
      description: `gebe mir die Song URL oder den Namen`,
      type: "STRING",
      required: true,
    },
  ],
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
      let query = interaction.options.getString("song");
      interaction.followUp(`** ${emoji.search} Sucht \`${query}\` **`);
      await player
        .search(query, {
          limit: 10,
          retried: true,
          safeSearch: true,
          type: "video",
        })
        .then((ss) => {
          let tracks = ss
            .map((song, index) => {
              return [
                `\`${index + 1}\`) [\`${song.name}\`](${song.url}) \`[${song.formattedDuration}]\``,
              ].join(" ' ");
            })
            .join("\n\n");
          let embed = new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`\`${query}\` Suchergebnisse`)
            .setDescription(tracks.substr(0, 3800))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter({
              text: ee.footertext,
              iconURL: ee.footericon,
            });

          let menuraw = new MessageActionRow().addComponents([
            new MessageSelectMenu()
              .setCustomId("search")
              .setPlaceholder(`Klicke um den besten Song zusehen`)
              .addOptions(
                ss.map((song, index) => {
                  return {
                    label: song.name.substr(0, 50),
                    value: song.url,
                    description: `${song.uploader.name}`,
                    emoji: "🎧",
                  };
                })
              ),
          ]);

          interaction
            .followUp({ embeds: [embed], components: [menuraw] })
            .then(async (msg) => {
              let filter = (i) => i.user.id === interaction.member.id;
              let collector = await msg.createMessageComponentCollector({
                filter: filter,
              });
              collector.on("collect", async (interaction) => {
                if (interaction.isSelectMenu()) {
                  if (interaction.customId === "search") {
                    await interaction.deferUpdate().catch((e) => {});
                    let song = interaction.values[0];
                    player.play(channel, song, {
                      member: interaction.member,
                      textChannel: interaction.channel,
                      unshift: true,
                    });
                  }
                }
              });
            });
        });
    }
  },
});
