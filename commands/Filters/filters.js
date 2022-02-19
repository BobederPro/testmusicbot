const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const emoji = require("../../settings/emoji.json");
const config = require("../../settings/config.json");
const { check_dj } = require("../../handlers/functions");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { default: DisTube, Queue } = require("distube");
const player = require("../../handlers/player");

module.exports = new Command({
  name: "filter",
  description: `Füge dem Lied Filter hinzu`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Filters",
  cooldown: 10,
  options: [
    {
      name: "8d",
      description: `Füge 8d dem Lied hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "bassboost",
      description: `Füge dem Lied BassBoost hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "clear",
      description: `Fügt einen Clearfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "earrape",
      description: `Fügt einen Earrapefilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "flanger",
      description: `Fügt dem Song einen Flangerfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "gate",
      description: `Füge einen Gatefilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "haas",
      description: `Füge einen Haasfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "heavybass",
      description: `Fügt einen Heavybass hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "karaoke",
      description: `Fügt den Karaoke Filter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "lightbass",
      description: `Fügt einen Lightbass hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "mcompad",
      description: `Fügt einen Mcompad hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "nightcore",
      description: `Fügt einen Nightcore Filter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "phaser",
      description: `Fügt einen Phaserfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "pulsator",
      description: `Fügt einen Pulsatorfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "purebass",
      description: `Fügt einen Purebass hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "reverse",
      description: `Fügt einen Reversefilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "subboost",
      description: `Fügt einen Subboost hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "surround",
      description: `Füge einen Surroundfilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "treble",
      description: `Füge einen Treblefilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "tremolo",
      description: `Füge einen Tremolofilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "vaporware",
      description: `Füge einen Vaporwarefilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "vibrato",
      description: `Füg einen Virbratofilter hinzu`,
      type: "SUB_COMMAND",
    },
    {
      name: "custombassboost",
      description: `Füge einen Bass deiner Wahl hinzu`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: "Gebe das Basslevel zwischen 0 und 20 an",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "customspeed",
      description: `Fügt eine gewählte Geschwindigkeit dem Song hinzu`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: "Gebe die Geschwindigkeit zwischen 0 und 2 an",
          type: "NUMBER",
          required: true,
        },
      ],
    },
  ],
  run: async ({ client, interaction, args, prefix }) => {
    const [subcmd] = args;
    switch (subcmd) {
      case "8d":
        {
          setFilter(client, interaction, player, "8d");
        }
        break;
      case "bassboost":
        {
          setFilter(client, interaction, player, "bassboost");
        }
        break;
      case "clear":
        {
          setFilter(client, interaction, player, false);
        }
        break;
      case "earrape":
        {
          setFilter(client, interaction, player, "earrape");
        }
        break;
      case "flanger":
        {
          setFilter(client, interaction, player, "flanger");
        }
        break;
      case "gate":
        {
          setFilter(client, interaction, player, "gate");
        }
        break;
      case "hass":
        {
          setFilter(client, interaction, player, "hass");
        }
        break;
      case "heavybass":
        {
          setFilter(client, interaction, player, "heavybass");
        }
        break;
      case "karaoke":
        {
          setFilter(client, interaction, player, "karaoke");
        }
        break;
      case "lightbass":
        {
          setFilter(client, interaction, player, "lightbass");
        }
        break;
      case "mcompad":
        {
          setFilter(client, interaction, player, "mcompad");
        }
        break;
      case "nightcore":
        {
          setFilter(client, interaction, player, "nightcore");
        }
        break;
      case "phaser":
        {
          setFilter(client, interaction, player, "phaser");
        }
        break;
      case "pulsator":
        {
          setFilter(client, interaction, player, "pulsator");
        }
        break;
      case "purebass":
        {
          setFilter(client, interaction, player, "purebass");
        }
        break;
      case "reverse":
        {
          setFilter(client, interaction, player, "reverse");
        }
        break;
      case "subboost":
        {
          setFilter(client, interaction, player, "subboost");
        }
        break;
      case "surround":
        {
          setFilter(client, interaction, player, "surround");
        }
        break;
      case "treble":
        {
          setFilter(client, interaction, player, "treble");
        }
        break;
      case "tremolo":
        {
          setFilter(client, interaction, player, "tremolo");
        }
        break;
      case "vaporware":
        {
          setFilter(client, interaction, player, "vaporware");
        }
        break;
      case "vibrato":
        {
          setFilter(client, interaction, player, "vibrato");
        }
        break;
      case "custombassboost":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** Zuerst musst du einem Voicechannel joinen **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** Du musst zuerst __meinem__ Voicechannel joinen **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} Aktuell wird nichts gespielt **`
            );
          } else if (bass > 20 || bass < 0) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} Das Bassboostlimit liegt bei 20 **`
            );
          } else {
            let fns = `bass=g=${bass},dynaudnorm=f=200`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      case "customspeed":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** Zuerst musst du einem Voicechannel joinen **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** Du musst zuerst __meinem__ Voicechannel joinen **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} Aktuell wird nichts gespielt **`
            );
          } else if (bass <= 0 || bass > 2) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} Das Speedlimit ist bei 2 **`
            );
          } else {
            let fns = `atempo=${bass}`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      default:
        break;
    }
  },
});

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {DisTube} player
 * @param {Queue} queue
 * @param {String} filter
 * @returns
 */
async function setFilter(client, interaction, player, filter) {
  let channel = interaction.member.voice.channel;
  let queue = player.getQueue(interaction.guild.id);
  if (!channel) {
    return client.embed(interaction, `** Zuerst musst du einem Voicechannel joinen **`);
  } else if (
    interaction.guild.me.voice.channel &&
    !interaction.guild.me.voice.channel.equals(channel)
  ) {
    return client.embed(
      interaction,
      `** Du musst zuerst __meinem__ Voicechannel joinen **`
    );
  } else if (!queue) {
    return client.embed(
      interaction,
      `** ${emoji.ERROR} Aktuell wird nichts gespielt **`
    );
  } else if (check_dj(client, interaction.member, queue.songs[0])) {
    return interaction.followUp(
      `** ${emoji.ERROR} Du bist kein DJ kannst also kein Lieder spielen **`
    );
  } else {
    await queue.setFilter(filter);
    return client.embed(
      interaction,
      `** ${emoji.SUCCESS} Der Filter \`${filter}\` wurde dem Song erfolgreich hinzugefügt **`
    );
  }
}
