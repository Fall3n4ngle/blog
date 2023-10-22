type Author = {
  id: string;
  attributes: {
    name: string;
    bio: string;
    position: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

type Category = {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
};

type Post = {
  id: string;
  attributes: {
    content: string | null;
    name: string;
    excerpt: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
    createdAt: string;
    categories: {
      data: Category[];
    };
  };
};

type SortBy = "createdAt:desc" | "createdAt:asc" | "name:asc" | "name:desc";