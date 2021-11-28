import { Client } from "faunadb";

//https://fauna.com/
//https://supabase.com/
//https://firebase.google.com/?hl=pt

export const fauna = new Client({
  secret: String(process.env.FAUNADB_KEY),
  domain: "db.eu.fauna.com",
});
