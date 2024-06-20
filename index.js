import { envVariables } from './config/server-config.js'
import express from 'express';
import bodyParser from 'body-parser';
import { Telegraf } from 'telegraf';
import ngrok from 'ngrok';
import axios from 'axios';

const app = express ();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const bot = new Telegraf(envVariables.BOT_ID);


bot.start((ctx) => ctx.reply(
`Hello and welcome to the PAY-ME BOT
for the payment you want to do, write data in following format--
amount,customer name, customer email, customer mobile`
))


bot.on('text',async(ctx) => {
    let user_input = ctx.message.text
    let parse_input = user_input.split(',').map(item => item.trim());

    await createOrder(parse_input[0],parse_input[1],parse_input[2],parse_input[3], ctx)

})


function txn_id () {
    const time = Date.now()
    const randomNumber = Math.floor(Math.random() * 100000);
    return `TXNID-${time}-${randomNumber}`;
}

const createOrder = async( user_amount, user_name, user_email, user_mobile_no, ctx) => {
    try {
        const response = await axios.post('https://api.ekqr.in/api/create_order', {
            "key": `${envVariables.API_KEY}`,
          "client_txn_id": txn_id(),
          "amount": user_amount,
          "p_info": "Product Name",
          "customer_name": user_name,
          "customer_email": user_email,
          "customer_mobile": user_mobile_no,
          "redirect_url": "http://google.com",
          "udf1": "user defined field 1 (max 25 char)",
          "udf2": "user defined field 2 (max 25 char)",
          "udf3": "user defined field 3 (max 25 char)"
          })
          const qr_url = response.data.data.payment_url
          await qr(qr_url, ctx);

    }catch (error) {
        ctx.reply('There was an error fetching the QR code. Please try again.');
        console.error('Error creating order:', error);
    }
}

const qr = async(qr_url, ctx) => {
    try {
        await ctx.reply(
`click the following link to make the payment
${qr_url}
for further payments make `);
    } catch (error) {
        console.log ("ERR-- error in fetching the qr", error)
    }
}

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const url = await ngrok.connect(PORT);
  console.log(`ngrok tunnel created at: ${url}`);

   bot.launch();

});