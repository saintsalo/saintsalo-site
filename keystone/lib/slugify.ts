import slugify from "slugify";

export const createSlug = (title: string): string => {
  const options = {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "en",
  };

  return slugify(title, options);
};
