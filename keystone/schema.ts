import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';


import { document } from '@keystone-6/fields-document';

import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'Post.author', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),
  Image: list({
    access: allowAll,
    fields: {
      // image: cloudinaryImage({ cloudinary, label: "Project Image" }),
      filename: text({ validation: { isRequired: true } }),
      altText: text({ validation: { isRequired: true } }),
      name: text({ validation: { isRequired: true }, label: "Name (Caption)" }),
    }
  }),
  Post: list({
    access: allowAll,
    fields: {
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
      seo: text(),
      name: text({ validation: { isRequired: true } }),
      slug: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      promo: relationship({ ref: "Image", many: false }),
      images: relationship({ ref: "Image", many: true }),
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: 'User.posts',

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },
        many: false,
      }),
      order: text({ label: "Order (priority)"}),
      content: document({
        label: "Short Description",
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
      embed: text({
        ui: {
          displayMode: "textarea"
        }
      }),
      status: select({
        defaultValue: "offline",
        options: [
          { label: "Published", value: "live" },
          { label: "Offline", value: "offline" },
          { label: "Archived", value: "archived" },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      type: select({
        defaultValue: "music",
        options: [
          { label: "Music", value: "music" },
          { label: "Project", value: "project" },
          { label: "News", value: "news" },
        ],
        ui: {
          displayMode: "segmented-control",
        },
      }),
      description: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),
    },
  }),
};
