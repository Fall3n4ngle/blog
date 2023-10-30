export const isActiveLink = (href: string, pathname: string) => {
  if (href !== "/") {
    return pathname.includes(href);
  }

  return pathname.split("/").length === 2;
};
