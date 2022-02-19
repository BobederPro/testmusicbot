const { MessageEmbed } = require("discord.js");
const client = require("..");
const { cooldown, databasing } = require("../handlers/functions");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");

client.on("interactionCreate", async (interaction) => {
  await databasing(interaction.guild.id, interaction.member.id);
  if (interaction.isCommand()) {
    await interaction
      .deferReply({
        ephemeral: false,
      })
      .catch((e) => {});
    let prefix = "/";
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "Ein Fehler ist aufgetreten" });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
        return client.embed(
          interaction,
          `Du hast nicht die \`${cmd.userPermissions}\` Rechte um den \`${cmd.name}\` Command zu nutzen!!`
        );
      } else if (
        !interaction.guild.me.permissions.has(cmd.botPermissions || [])
      ) {
        return client.embed(
          interaction,
          `Ich habe nicht die \`${cmd.botPermissions}\` Rechte um den \`${cmd.name}\` Command zu nutzen!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` Cooldown aktiv , warte \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Sekunden`
        );
      } else {
        cmd.run({ client, interaction, args, prefix });
      }
    }
  }
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
