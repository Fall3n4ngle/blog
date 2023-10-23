export const formatCategory = (category: string) => {
  const categoriesArray = category.split(".");
  const stringified = JSON.stringify(categoriesArray);

  const result = `categories: { slug: { in: ${stringified} } }`;

  return result;
};
