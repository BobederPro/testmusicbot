const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  name: "loop",
  description: `Die Dauerschleife wird aktiviert/deaktiviert`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "loopmode",
      description: `Wähle die Dauerschleifenmethode`,
      type: "STRING",
      required : true,
      choices: [
        {
          name: "Lied",
          value: `1`,
        },
        {
          name: "Wiedergabeliste",
          value: `2`,
        },
        {
          name: "Aus",
          value: `0`,
        },
      ],
    },
  ],
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} Zuerst musst du einem Voicechannel joinen **`
      );
    } else if (
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
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Aktuell wird nichts gespielt **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du bist kein DJ kannst also kein Lieder spielen **`
      );
    } else {
      let loopmode = Number(interaction.options.getString("loopmode"));
      await queue.setRepeatMode(loopmode);
      if (queue.repeatMode === 0) {
        return client.embed(
          interaction,
          `** ${emoji.ERROR} Dauerschleife deaktiviert!! **`
        );
      } else if (queue.repeatMode === 1) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Song Dauerschleife aktiviert!! **`
        );
      } else if (queue.repeatMode === 2) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Wiedergabelistendauerschleife aktiviert!! **`
        );
      }
    }
  },
});
