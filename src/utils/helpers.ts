import { format } from "date-fns";

export const formatTime = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy");
};
