import { gql } from "graphql-request";
import { client } from "./client";

type Props = {
  name: string;
  email: string;
  content: string;
  post: string;
};

export const postComment = async (props: Props) => {
  const mutation = gql`
    mutation createComment(
      $email: String!
      $name: String!
      $content: String!
      $post: ID!
    ) {
      createComment(
        data: { name: $name, email: $email, content: $content, post: $post }
      ) {
        data {
          id
        }
      }
    }
  `;

  const data = await client.request(mutation, props);
};
