import { gql } from "graphql-request";
import { Locale } from "../i18n/i18n-config";
import { client } from "./client";

type GetPostsReturnType = {
  posts: {
    data: Post[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
};

type GetPostsProps = {
  sort?: SortBy;
  name?: string;
  category?: string;
  page?: string | number;
  pageSize?: number;
  locale?: Locale;
};

export const getPosts = async ({
  sort = "createdAt:desc",
  name = "",
  category = "",
  page = 1,
  pageSize = 5,
  locale = "es",
}: GetPostsProps) => {
  const query = gql`
      query getPosts($sort: [String]!, $name: String) {
        posts(
          sort: $sort
          filters: {
            name: { containsi: $name }
            ${category}
          }
          pagination: { page: ${page}, pageSize: ${pageSize} }
          locale: "${locale}"
        ) {
          data {
            id
            attributes {
              name
              excerpt
              createdAt
              content
              categories {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page
              pageSize
              pageCount
              total
            }
          }
        }
      }
    `;

  const {
    posts: { data: posts, meta },
  }: GetPostsReturnType = await client.request(query, { sort, name });
  return { posts, meta };
};