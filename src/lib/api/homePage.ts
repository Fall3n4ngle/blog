import { gql } from "graphql-request";
import { client } from "./client";

type GetHomePageDataReturnType = {
  categories: {
    data: Category[];
  };
  author: {
    data: Author;
  };
};

export const getHomePageData = async () => {
  const query = gql`
    query {
      categories {
        data {
          id
          attributes {
            name
            slug
          }
        }
      }

      author {
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
};

export const getPosts = async ({
  sort = "createdAt:desc",
  name = "",
  category = "",
  page = 1,
  pageSize = 5,
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
