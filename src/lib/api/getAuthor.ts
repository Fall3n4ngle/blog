import { gql } from "graphql-request";
import { Locale } from "../i18n/i18n-config";
import { client } from "../client";
import { cache } from "react";

type GetHomePageDataReturnType = {
  author: {
    data: Author;
  };
};

export const getAuthor = cache(async (locale: Locale) => {
  const query = gql`
    query {
      author(locale: "${locale}") {
        data {
          id
          attributes {
            name
            bio
            position
            about
            image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
    `;

  const {
    author: { data },
  }: GetHomePageDataReturnType = await client.request(query);
  return data;
});
