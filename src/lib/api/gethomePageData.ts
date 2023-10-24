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

