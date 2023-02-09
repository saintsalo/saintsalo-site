import { config } from '@keystone-6/core';
import "dotenv/config";
import { lists } from './schema';

import { withAuth, session } from './auth';

const databaseURL = process.env["DATABASE_URL"] || "postgres://postgres"
const port = 5000

export default withAuth(
  config({
    graphql: {
      // debug: process.env.NODE_ENV !== "production",
      debug: true,
      // queryLimits: { maxTotalResults: 100 },
      path: "/api/graphql",
      cors: {
        origin: [new RegExp("localhost")],
        credentials: true,
      },
      apolloConfig: {
        debug: true,
      },
    },
    server: {
      cors: {
        origin: ["http://localhost:3000"],
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
