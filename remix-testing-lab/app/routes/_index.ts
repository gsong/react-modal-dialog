import { redirect } from "@remix-run/react";

export const loader = () => {
  throw redirect("/demo");
};
