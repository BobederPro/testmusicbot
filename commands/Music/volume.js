const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  name: "volume",
  description: ` Verändert die Lautstärke des Songs`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "amount",
      description: `Gebe an wie laut die Musik sein soll, in Zahlen`,
      type: "NUMBER",
      required: true,
    },
  ],
  run: async ({ client, interaction, args, prefix }) => {
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} Zuerst musst du einem Voicechannel joinen **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} Du musst zuerst __meinem__ Voicechannel joinen**`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} Ich bin gemuted, entmutet mich zuerst **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} Es wird zur Zeit nichts gespielt **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} Du bist kein DJ kannst also kein Lieder spielen **`
      );
    } else {
      let volume = interaction.options.getNumber("amount");
      if (volume > 250) {
        return interaction.followUp(
          `** ${emoji.ERROR} Gebe die Lautstärke zwischen 1 und 250 **`
        );
      } else {
        await queue.setVolume(volume);
        interaction.followUp(
          `** ${emoji.SUCCESS} Lautstärke geändert zu ${queue.volume}% **`
        );
      }
    }
  },
});
