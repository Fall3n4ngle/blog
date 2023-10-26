import { gql } from "graphql-request";
import { client } from "./client";

type GetPostsMetaReturnType = {
  posts: {
    data: {
      id: string;
    }[];
  };
};

export const getPostsMeta = async () => {
  const query = gql`
    query {
      posts {
        data {
          id
        }
      }
    }
  `;

  const {
    posts: { data },
  }: GetPostsMetaReturnType = await client.request(query);
  return data;
};
