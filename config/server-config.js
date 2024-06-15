import { config as configDotenv } from "dotenv"
configDotenv()

export const envVariables= {
    BOT_ID : process.env.BOT_TOKEN,
    API_KEY : process.env.API_KEY
}