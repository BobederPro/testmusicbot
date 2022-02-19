const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "dj",
  description: `Richtet, dass DJ System ein`,
  userPermissions: ["MANAGE_ROLES"],
  botPermissions: ["MANAGE_ROLES"],
  category: "Config",
  cooldown: 10,
  options: [
    {
      name: "set",
      description: `Fügt eine DJ Rolle hinzu`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: `Gebe die DJ Rolle an`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: `Entfernt eine DJ Rolle`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "rolle",
          description: `Gebe die Rolle an, welche entfernt werden soll`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "show",
      description: `Zeigt alle DJ Rollen vom Server`,
      type: "SUB_COMMAND",
    },
    {
      name: "djonly",
      description: `Aktiviert/Deaktiviert das DJ System`,
      type: "SUB_COMMAND",
    },
    {
      name: "reset",
      description: `Resetet alle DJ Rollen`,
      type: "SUB_COMMAND",
    },
  ],
  run: async ({ client, interaction, args, prefix }) => {
    let subcmd = interaction.options.getSubcommand();
    switch (subcmd) {
      case "set":
        {
          let role = interaction.options.getRole("role");
          client.settings.push(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS} Die Rolle ${role} wurde erfolgreich als DJ Rolle hinzugefügt **`
          );
        }
        break;
      case "remove":
        {
          let role = interaction.options.getRole("role");
          client.settings.remove(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS} Die Rolle ${role} wurde erfolgreich entfernt **`
          );
        }
        break;
      case "show":
        {
          let djroleids = client.settings.get(interaction.guild.id, "djroles");
          if (djroleids === []) {
            return interaction.followUp(`>>> ** Das DJ System wurde noch nicht eingerichtet **`);
          } else {
            let data = [...djroleids];
            let string = await data.map((roleid, index) => {
              let role = interaction.guild.roles.cache.get(roleid);
              return `${role}`;
            });
            interaction.followUp({
              embeds: [
                new MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(`** Alle DJ Rollen von ${interaction.guild.name} **`)
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                  .setDescription(
                    `>>> ${
                      string.join(" ' ").substr(0, 3000) ||
                      `** Es wurden noch keine DJ Rollen gesetuped **`
                    }`
                  )
                  .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
              ],
            });
          }
        }
        break;
      case "djonly":
        {
          let data = await client.settings.get(interaction.guild.id, "djonly");
          if (data === false) {
            client.settings.set(interaction.guild.id, true, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly Aktiviert **`
            );
          } else if (data === true) {
            client.settings.set(interaction.guild.id, false, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly Deaktiviert **`
            );
          }
        }
        break;
      case "reset":
        {
          let data = await client.settings.get(interaction.guild.id, "djroles");
          client.settings.delete(interaction.guild.id, "djroles");
          if (data === []) {
            interaction.followUp(`** ${emoji.ERROR} Not Found DJ Role **`);
          } else {
            interaction.followUp(
              `** ${emoji.SUCCESS} Successfully Deleted all DJ Roles **`
            );
          }
        }
        break;
      default:
        break;
    }
  },
});
