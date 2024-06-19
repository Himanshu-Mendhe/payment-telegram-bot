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


function txn_id () {
    const time = Date.now()
    const randomNumber = Math.floor(Math.random() * 100000);
    return `TXNID-${time}-${randomNumber}`;
}

const createOrder = async() => {
    try {
        const response = await axios.post('https://api.ekqr.in/api/create_order', {
            "key": `${envVariables.API_KEY}`,
          "client_txn_id": txn_id(),
          "amount": "100",
          "p_info": "Product Name",
          "customer_name": "Jon Doe",
          "customer_email": "jondoe@gmail.com",
          "customer_mobile": "9876543210",
          "redirect_url": "http://google.com",
          "udf1": "user defined field 1 (max 25 char)",
          "udf2": "user defined field 2 (max 25 char)",
          "udf3": "user defined field 3 (max 25 char)"
          })
          console.log (response.data)
    }catch (error) {
        console.error('Error creating order:', error);
    }
}



const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const url = await ngrok.connect(PORT);
  console.log(`ngrok tunnel created at: ${url}`);

  createOrder();
  bot.launch();

});