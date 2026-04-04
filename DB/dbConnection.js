import pkg from "pg";
import { DBconfig } from "../playwright.config";
const {Client} = pkg;

export const client=new Client(DBconfig);

export async function connectDB(){
    await client.connect();
    console.log("*** CONNECTED TO DATABASE ***")
}
export async function DisconnectDB(){
    await client.end();
    console.log("*** DISCONNECTED TO DATABASE ***")
}