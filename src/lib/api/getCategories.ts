import { gql } from "graphql-request";
import { client } from "../client";
import { Locale } from "../i18n/i18n-config";

type GetCategoriesReturnType = {
  categories: {
    data: Category[];
  };
};

export const getCategories = async (locale: Locale) => {
  const query = gql`
    query {
      categories(locale: "${locale}") {
        data {
          id
          attributes {
            name
            slug
          }
        }
      }
    }
  `;

  const {
    categories: { data },
  }: GetCategoriesReturnType = await client.request(query);

  return data;
};
