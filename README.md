# Bot-Template
Discord.js v13でBotを作る際のテンプレート

## 使い方
1. Botを`applications.commands`スコープ付きで導入
2. `BOT_TOKEN`という環境変数にBotのTOKENを入れる
3. `npx node register.js コマンドを使うサーバーID`を実行
4. `npx node index.js`でBot実行

## 注意
使い方 3.のサーバーIDはGuildCommandとして設定するためのものです。GlobalCommandとして登録する場合は空欄にしてください。

# Bot-Template
The template for Version13 Discord.js Bot
With EvalCommand and SlashCommand :)

## Manual
1. Invite your BotClient to your any guilds with `Bot` and `application.commands` permissions.
2. Insert the Token to `BOT_TOKEN` enviroment variables.
3. Run `npx node register.js GuildID` in shell.
4. Run `npx node index.js` in shell.

## Notice
The "GuildID" of Step3 value is for setting up GuildCommand. Please put it blank when you want setup GlobalCommand.
