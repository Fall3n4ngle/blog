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
    slug: string;
    content: string | null;
    name: string;
    excerpt: string;
    image: {
      data: {
        attributes?: {
          url: string;
        };
      }[];
    };
    publishedAt: string;
    categories: {
      data: Category[];
    };
  };
};

type TComment = {
  id: string;
  attributes: {
    name: string;
    email: string;
    content: string;
    post: string;
    publishedAt: string;
  }
}

type SortBy = "createdAt:desc" | "createdAt:asc" | "name:asc" | "name:desc";
