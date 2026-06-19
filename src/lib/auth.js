import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { role } from "better-auth/client";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('monkey');

export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

  user: {
    additionalFields: {
      role: {
        defaultValue: 'buyer'
      },
      status: {
        defaultValue: 'active'
      },
      phone: {
        defaultValue: '01000000000'
      },
      address: {
        defaultValue: 'Dhaka/Bangladesh'
      }
    }
  },
  plugins: [
    jwt(),
  ]
  ,
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 7
    }
  }
});