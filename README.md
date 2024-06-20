# 💸 PAYMENT QR GENERATOR TELEGRAM 💸

A telegram bot that generates the qr for payment.

## TABLE OF CONTENT 🍷

- CHART
- INTRODUCTION
- FEATURES
- PRE-REQUISITES
- INSTALLATION
- USAGE
- CODE EXPLANATION
- API CALL
- CONTRIBUTING 
- CONTACT

## CHART AND SCREENSHOTS

![screenshot](<screenshot/Screenshot 2024-06-20 at 1.28.29 PM.png>)

## INTRODUCTION 🙏

PAY-ME BOT is a Telegram bot that allows users to generate payment QR codes by simply sending a message in a specified format. The bot processes the input and creates an order with a payment gateway, returning a link to the QR code that users can scan to complete their payment.

## FEATURES 🔎

- Welcome Message: When users start the bot, they receive a welcome message with instructions.

- Payment Request: Users can request a payment QR code by sending a message with the amount, customer name, customer email, and customer mobile number. 

- QR Code Generation: The bot generates a payment QR code and sends the payment link back to the user.

## PRE-REQUISITES 📛

- Node.js (version 14.x or later)
- Ngrok
- Telegram bot token
- EKQR API GATEWAY key

## INSTALLATION 🧑‍🔧

1. Clone the repository:
    ```bash
    git clone git@github.com:Himanshu-Mendhe/payment-telegram-bot.git

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create the configuration file:
Create a server-config.js file in the config directory with the following content:    
    ```bash
    import { config as configDotenv } from "dotenv"
    configDotenv()

    export const envVariables= {
        BOT_ID : process.env.BOT_TOKEN,
        API_KEY : process.env.API_KEY
    }
    ```

## USAGE 🚧

1. Start the server:
    ```bash
    node index.js
    ```

2. Ngrok setup:
Download the ngrok in your local machine and then do the sign up process. The server will create an Ngrok tunnel for your bot and display the tunnel URL. Ensure your Telegram bot webhook is set to this URL.    

3. Interact with the bot:
Open Telegram and start a chat with your bot.
    ```bash
    /start
    ```
    Then  use the following format to request a payment:
    ```bash
    amount, customer name, customer email, customer mobile
    ```

## CODE EXPLANATION 🔭

### Dependencies

- 'express': Web framework for Node.js.
- 'body-parser': Middleware to parse incoming request bodies.
- 'telegraf': Library to interact with the Telegram Bot API.
- 'ngrok': Tool to expose a local server to the internet.
- 'axios': HTTP client for making requests.

### Bot Initialization

    ```bash
    const bot = new Telegraf(envVariables.BOT_ID);
    ```

### Welcome Message:

    ```bash
    bot.start((ctx) => ctx.reply(
    `🙏 Hello and welcome to the PAY-ME BOT 🤑
    for the payment you want to do, write data in following format 🤝--
    amount, customer name, customer email, customer mobile`
    ));
    ```

### Text Message Handling:

    ```bash
    bot.on('text', async (ctx) => {
    let user_input = ctx.message.text;
    let parse_input = user_input.split(',').map(item => item.trim());
    await createOrder(parse_input[0], parse_input[1], parse_input[2], parse_input[3], ctx);
    });
    ```

### Order Creation

    ```bash
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
    ```
![screenshot](<screenshot/Screenshot 2024-06-20 at 1.27.24 PM.png>)

### QR Code Reply 🔐

    ```bash
    const qr = async (qr_url, ctx) => {
    try {
        await ctx.reply(
      `ʘ click the following link to make the payment 💀
      ${qr_url}
      for further payments write amount, customer name, customer email, customer mobile`
    );
    } catch (error) {
        console.log("ERR-- error in fetching the qr", error);
    }
    };
    ```
![screenshot](<screenshot/Screenshot 2024-06-20 at 1.28.08 PM.png>)

### Server Setup

    ```bash
    const PORT = 3000;
    app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    const url = await ngrok.connect(PORT);
    console.log(`ngrok tunnel created at: ${url}`);

    bot.launch();
    });
    ```

## API CALL 📲

Used EKQR API gateway to manage the payment.

## CONTRIBUTING 🤝

Contributions are most welcomed!
Fork and open the pull request

## Contact 📇

- **GitHub**: [Himanshu-Mendhe](https://github.com/Himanshu-Mendhe)
- **Email**: mendhehimanshu20@gmail.com



🫡