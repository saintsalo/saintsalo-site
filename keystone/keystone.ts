import { config } from '@keystone-6/core';
import "dotenv/config";
import { lists } from './schema';

import { withAuth, session } from './auth';
import { accessEnv } from './lib/accessEnv';

const databaseURL = process.env["DATABASE_URL"] || "postgres://postgres"
const deployPrevURL = new RegExp(accessEnv("DEPLOY_PREV_URL", "localhost"));
const prodUrl = accessEnv("PROD_URL", "https://www.saintsalo.com/");
const port = parseInt(accessEnv("PORT", "5000"));

export default withAuth(
  config({
    graphql: {
      debug: process.env.NODE_ENV !== "production",
      // debug: true,
      // queryLimits: { maxTotalResults: 100 },
      path: "/api/graphql",
      cors: {
        origin: [new RegExp("localhost"), deployPrevURL, prodUrl],
        credentials: true,
      },
      apolloConfig: {
        debug: true,
      },
    },
    server: {
      cors: {
        origin: [new RegExp("localhost"), deployPrevURL, prodUrl],
        credentials: true,
      },
      port,
    },
    db: {
      provider: 'postgresql',
      url: databaseURL,
      useMigrations: process.env.NODE_ENV === "production" || false,
    },
    lists,
    session,
  })
);
