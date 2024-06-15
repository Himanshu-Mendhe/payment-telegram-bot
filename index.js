import { envVariables } from './config/server-config.js'
import express from 'express';
import bodyParser from 'body-parser';
import { Telegraf } from 'telegraf';
import ngrok from 'ngrok';

const app = express ();
const url = await ngrok.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const bot = new Telegraf(envVariables.BOT_ID);




const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const url = await ngrok.connect(PORT);
  console.log(`ngrok tunnel created at: ${url}`);
});

bot.launch();