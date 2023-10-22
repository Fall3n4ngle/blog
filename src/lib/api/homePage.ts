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
  };
};

type GetPostsProps = {
  sort?: SortBy;
};

export const getPosts = async ({ sort = "createdAt:desc" }: GetPostsProps) => {
  const query = gql`
    query getPosts($sort: [String]!) {
      posts(sort: $sort) {
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
      }
    }
  `;

  const {
    posts: { data: posts },
  }: GetPostsReturnType = await client.request(query, { sort });
  return { posts };
};
