"use server";

export const subscribe = async (formData: FormData) => {
  const email = formData.get("email");
  console.log(email);
};
