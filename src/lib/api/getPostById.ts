import { gql } from "graphql-request";
import { client } from "./client";
import { Locale } from "../i18n/i18n-config";

type Props = {
  id: string;
  locale?: Locale;
};

type GetPostBySlugReturnType = {
  post: {
    data: Post | null;
  };
};

export const getPostById = async ({ id, locale = "en" }: Props) => {
  const query = gql`
    query getPostById($id: ID!, $locale: I18NLocaleCode) {
      post(id: $id, locale: $locale) {
        data {
          id
          attributes {
            slug
            image {
              data {
                attributes {
                  url
                }
              }
            }
            name
            publishedAt
            content
            categories {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const response: GetPostBySlugReturnType = await client.request(query, {
    id,
    locale,
  });
  return response;
};