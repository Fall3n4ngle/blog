import { gql } from "graphql-request";
import { client } from "./client";
import { Locale } from "../i18n/i18n-config";

type Props = {
  slug?: string;
  locale?: Locale;
};

type GetPostBySlugReturnType = {
  post: {
    data: Post | null;
  };
};

export const getPostBySlug = async ({ slug = "", locale = "en" }: Props) => {
  const query = gql`
    query getPostBySlug($slug: String!, $locale: I18NLocaleCode) {
      post(slug: $slug, locale: $locale) {
        data {
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
    slug,
    locale,
  });
  return response;
};
