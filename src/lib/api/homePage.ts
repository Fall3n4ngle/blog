import { gql } from "graphql-request";
import { client } from "./client";

type GetHomePageDataReturnType = {
  posts: {
    data: Post[];
  };
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
      posts {
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
    posts: { data: posts },
  }: GetHomePageDataReturnType = await client.request(query);

  return { author, categories, posts };
};
