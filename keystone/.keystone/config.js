"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");
var import_config2 = require("dotenv/config");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({ ref: "Post.author", many: true }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Image: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      filename: (0, import_fields.text)({ validation: { isRequired: true } }),
      altText: (0, import_fields.text)({ validation: { isRequired: true } }),
      name: (0, import_fields.text)({ validation: { isRequired: true }, label: "Name (Caption)" })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      seo: (0, import_fields.text)(),
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      promo: (0, import_fields.relationship)({ ref: "Image", many: false }),
      images: (0, import_fields.relationship)({ ref: "Image", many: true }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          inlineEdit: { fields: ["name", "email"] },
          linkToItem: true,
          inlineConnect: true
        },
        many: false
      }),
      order: (0, import_fields.text)({ label: "Order (priority)" }),
      content: (0, import_fields_document.document)({
        label: "Short Description",
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      }),
      embed: (0, import_fields.text)({
        ui: {
          displayMode: "textarea"
        }
      }),
      status: (0, import_fields.select)({
        defaultValue: "offline",
        options: [
          { label: "Published", value: "live" },
          { label: "Offline", value: "offline" },
          { label: "Archived", value: "archived" }
        ],
        ui: {
          displayMode: "segmented-control"
        }
      }),
      type: (0, import_fields.select)({
        defaultValue: "music",
        options: [
          { label: "Music", value: "music" },
          { label: "Project", value: "project" },
          { label: "News", value: "news" }
        ],
        ui: {
          displayMode: "segmented-control"
        }
      }),
      description: (0, import_fields_document.document)({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1]
        ],
        links: true,
        dividers: true
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");

// lib/accessEnv.ts
var import_config = require("dotenv/config");
var cache = {};
var accessEnv = (key, defaultValue) => {
  if (!(key in process.env) || typeof process.env[key] === void 0) {
    if (defaultValue)
      return defaultValue;
    throw new Error(`${key} not found in process.env!`);
  }
  if (!(key in cache)) {
    cache[key] = process.env[key];
  }
  return cache[key];
};

// auth.ts
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var sessionDomain = accessEnv("DOMAIN_URL", "localhost");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
  domain: sessionDomain
});

// keystone.ts
var databaseURL = process.env["DATABASE_URL"] || "postgres://postgres";
var deployPrevURL = new RegExp(accessEnv("DEPLOY_PREV_URL", "localhost"));
var prodUrl = accessEnv("PROD_URL", "https://www.saintsalo.com/");
var port = parseInt(accessEnv("PORT", "5000"));
var keystone_default = withAuth(
  (0, import_core2.config)({
    graphql: {
      debug: process.env.NODE_ENV !== "production",
      path: "/api/graphql",
      cors: {
        origin: [new RegExp("localhost"), deployPrevURL, prodUrl],
        credentials: true
      },
      apolloConfig: {
        debug: true
      }
    },
    server: {
      cors: {
        origin: [new RegExp("localhost"), deployPrevURL, prodUrl],
        credentials: true
      },
      port
    },
    db: {
      provider: "postgresql",
      url: databaseURL,
      useMigrations: true
    },
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
