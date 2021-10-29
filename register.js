const commands = [
  {
    name: "eval",
    description: "コードを実行します。",
    options: [
      {
        type: "STRING",
        name: "code",
        description: "実行するコード",
        required: true
      }
    ]
  }
];

const { Client, ClientApplication } = require("discord.js");

(async () => {
  const client = new Client({ intents: [] });
  client.token = process.env.BOT_TOKEN;
  client.application = new ClientApplication(client, {});
  await client.application.fetch();
  const guildId = process.argv[2];
  if (!guildId) await client.application.commands.set(commands); else await client.application.commands.set(commands, guildId);
  console.log("success!");
})().catch(console.error);
