import { gql } from "graphql-request";
import { client } from "./client";
import { Locale } from "../i18n/i18n-config";

type GetHomePageDataReturnType = {
  categories: {
    data: Category[];
  };
  author: {
    data: Author;
  };
};

export const getHomePageData = async (locale: Locale) => {
  const query = gql`
    query {
      categories(locale: "${locale}") {
        data {
          id
          attributes {
            name
            slug
          }
        }
      }

      author(locale: "${locale}") {
        data {
          id
          attributes {
            name
            bio
            position
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
    author: { data: author },
    categories: { data: categories },
  }: GetHomePageDataReturnType = await client.request(query);

  return { author, categories };
};

