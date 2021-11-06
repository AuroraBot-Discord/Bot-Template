const { Client, Intents, Interaction, Message } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], restTimeOffset: 0 });

const prefix = "!";

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}.`);
});

/**
 *
 * @param {Interaction} interaction
 */
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName:command, options } = interaction;
    if (command === "eval") {
      if (!["eval実行可能なユーザーID"].includes(interaction.user.id)) return interaction.reply({ content: "あなたはこのコマンドを実行できません。", ephemeral: true });
      await interaction.deferReply();
      const code = options.getString("code");
      const result = new Promise((resolve) => resolve(eval(code)));
      return result
        .then(async (output) => {
          if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
          }
          if (output.includes(client.token)) {
            output = output.replace(client.token, "[TOKEN]");
          }
          interaction.followUp(`\`\`\`js\n${output}\n\`\`\``);
        })
        .catch(async (err) => {
          err = err.toString();
          if (err.includes(client.token)) {
            err = err.replace(client.token, "[TOKEN]");
          }
          interaction.followUp(`\`\`\`js\n${err}\n\`\`\``);
        });
    }
  }
});

/**
 *
 * @param {Message} message
 */
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "eval") {
    if (!["eval実行可能なユーザーID"].includes(message.author.id)) return message.reply({ content: "あなたはこのコマンドを実行できません。" });
    const code = args.join(" ");
    const result = new Promise((resolve) => resolve(eval(code)));
    return result
      .then(async (output) => {
        if (typeof output !== "string") {
          output = require("util").inspect(output, { depth: 0 });
        }
        if (output.includes(client.token)) {
          output = output.replace(client.token, "[TOKEN]");
        }
        message.reply(`\`\`\`js\n${output}\n\`\`\``);
      })
      .catch(async (err) => {
        err = err.toString();
        if (err.includes(client.token)) {
          err = err.replace(client.token, "[TOKEN]");
        }
        message.reply(`\`\`\`js\n${err}\n\`\`\``);
      });
  }
});

client.login(process.env.BOT_TOKEN);
