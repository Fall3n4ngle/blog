import { gql } from "graphql-request";
import { client } from "../client";
import { Locale } from "../i18n/i18n-config";
import { cache } from "react";

type Props = {
  id: string;
  locale?: Locale;
};

type GetPostBySlugReturnType = {
  post: {
    data: Post | null;
  };
};

export const getPostById = cache(async ({ id, locale = "en" }: Props) => {
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
                  width
                  height
                }
              }
            }
            name
            publishedAt
            updatedAt
            content
            excerpt
            categories {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
            comments {
              data {
                id
                attributes {
                  name
                  content
                  publishedAt
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
});
