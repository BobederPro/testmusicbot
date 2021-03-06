const { Command } = require(`reconlx`);
const ee = require(`../../settings/embed.json`);
const config = require(`../../settings/config.json`);
const { MessageEmbed, version } = require(`discord.js`);
const emoji = require(`../../settings/emoji.json`);
const { duration } = require(`../../handlers/functions`);

module.exports = new Command({
  name: `botinfo`,
  description: `Zeigt Infos ΓΌber den Bot`,
  userPermissions: [`SEND_MESSAGES`],
  botPermissions: [`SEND_MESSAGES`],
  category: `Information`,
  cooldown: 10,
  run: async ({ client, interaction, args, prefix }) => {
    interaction.followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(
            `** Botdeveloper: <@816575271317536828> | Tag: BenB#4849 ** \n\n`
          )
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .addFields([
            {
              name: `π€ Name`,
              value: `>>> \`${client.user.username}\``,
              inline: true,
            },
            {
              name: `π Ping`,
              value: `>>> \`${client.ws.ping}ms\``,
              inline: true,
            },
            {
              name: `ποΈ Server`,
              value: `>>> \`${client.guilds.cache.size} Servers\``,
              inline: true,
            },
            {
              name: `π¨βπ§βπ§ User`,
              value: `>>> \`${client.users.cache.size} Users\``,
              inline: true,
            },
            {
              name: `π Channel`,
              value: `>>> \`${client.channels.cache.size} Channels\``,
              inline: true,
            },
            {
              name: `π Node.js Version`,
              value: `>>> \`${process.version}\``,
              inline: true,
            },
            {
              name: `π Discord.js Version`,
              value: `>>> \`${version}\``,
              inline: true,
            },
            {
              name: `${emoji.setup} Bot Commands`,
              value: `>>> \`\`\` Commands ${client.commands.size} , (/)Commands ${client.subcmd.size}\`\`\``,
            },
            {
              name: `${emoji.time} Bot Uptime`,
              value: `>>> \`\`\`${duration(client.uptime)
                .map((i) => `${i}`)
                .join(` , `)}\`\`\``,
            },
          ])
          .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
      ],
    });
  },
});
