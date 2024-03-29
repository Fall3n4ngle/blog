import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(`${process.env.CMS_URL}/graphql`, {
  headers: {
    authorization: `Bearer ${process.env.CMS_TOKEN}`,
  },
});
