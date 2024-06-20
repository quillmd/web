"use server";

export const serverError = async () => {
  throw new Error("server error test");
};
