// Welcome to some authentication for Keystone
//
// This is using @keystone-6/auth to add the following
// - A sign-in page for your Admin UI
// - A cookie-based stateless session strategy
//    - Using a User email as the identifier
//    - 30 day cookie expiration
//
// Access control lives in schema.ts: writes (and all User access) require a session.
//
// If you want to learn more about how our out-of-the-box authentication works, please
// read https://keystonejs.com/docs/apis/auth#authentication-api

import { randomBytes } from 'crypto';
import { createAuth } from '@keystone-6/auth';

// see https://keystonejs.com/docs/apis/session for the session docs
import { statelessSessions } from '@keystone-6/core/session';
import { accessEnv } from './lib/accessEnv';

// for a stateless session, a SESSION_SECRET should always be provided
//   especially in production (statelessSessions will throw if SESSION_SECRET is undefined)
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== 'production') {
  sessionSecret = randomBytes(32).toString('hex');
}

const sessionDomain = accessEnv("DOMAIN_URL", "localhost")

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',

  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: 'name createdAt',
  secretField: 'password',
});

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30;

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret!,
  domain: sessionDomain,
});

export { withAuth, session };
