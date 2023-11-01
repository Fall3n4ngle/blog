import { gql } from "graphql-request";
import { client } from "../client";

type GetPostsMetaReturnType = {
  posts: {
    data: {
      id: string;
      attributes: {
        updatedAt: string;
      };
    }[];
  };
};

export const getPostsMeta = async () => {
  const query = gql`
    query {
      posts {
        data {
          id
          attributes {
            updatedAt
          }
        }
      }
    }
  `;

  const {
    posts: { data },
  }: GetPostsMetaReturnType = await client.request(query);
  return data;
};
