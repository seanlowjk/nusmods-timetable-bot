import { Client } from 'discord.js';

import { execute } from "./commands/execute";
import { Config } from "./utils/constants";

// Config global variables
const fetch = require('node-fetch');
if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

const client = new Client();

client.login(Config.DISCORD_TOKEN);

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message: any) => {
  if (!message.content.startsWith('!') || message.author.bot) {
    return; 
  }

  const args: string[] | undefined = message.content.slice('!'.length).trim().split(/ +/);
  execute(message, args); 
});
