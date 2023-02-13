/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query AllPosts($status: String!, $type: String!) {\n  posts(\n    orderBy: {name: asc}\n    where: {status: {equals: $status}, type: {equals: $type}}\n  ) {\n    order\n    seo\n    name\n    slug\n    content {\n      document\n    }\n    images {\n      name\n      altText\n      filename\n    }\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    embed\n  }\n}": types.AllPostsDocument,
    "query PostBySlug($slug: String!) {\n  post: post(where: {slug: $slug}) {\n    name\n    images {\n      name\n      altText\n      filename\n    }\n    seo\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    content {\n      document\n    }\n    embed\n  }\n}": types.PostBySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AllPosts($status: String!, $type: String!) {\n  posts(\n    orderBy: {name: asc}\n    where: {status: {equals: $status}, type: {equals: $type}}\n  ) {\n    order\n    seo\n    name\n    slug\n    content {\n      document\n    }\n    images {\n      name\n      altText\n      filename\n    }\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    embed\n  }\n}"): (typeof documents)["query AllPosts($status: String!, $type: String!) {\n  posts(\n    orderBy: {name: asc}\n    where: {status: {equals: $status}, type: {equals: $type}}\n  ) {\n    order\n    seo\n    name\n    slug\n    content {\n      document\n    }\n    images {\n      name\n      altText\n      filename\n    }\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    embed\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query PostBySlug($slug: String!) {\n  post: post(where: {slug: $slug}) {\n    name\n    images {\n      name\n      altText\n      filename\n    }\n    seo\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    content {\n      document\n    }\n    embed\n  }\n}"): (typeof documents)["query PostBySlug($slug: String!) {\n  post: post(where: {slug: $slug}) {\n    name\n    images {\n      name\n      altText\n      filename\n    }\n    seo\n    promo {\n      name\n      altText\n      filename\n    }\n    description {\n      document\n    }\n    content {\n      document\n    }\n    embed\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;