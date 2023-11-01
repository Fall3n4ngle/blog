import { gql } from "graphql-request";
import { client } from "../client";

type Props = {
  email: string;
};

export const postSubscribe = async ({ email }: Props) => {
  const mutation = gql`
    mutation subscribe($email: String!) {
      createSubscriber(data: { email: $email }) {
        data {
          id
        }
      }
    }
  `;

  const data = await client.request(mutation, { email });
  return data;
};
