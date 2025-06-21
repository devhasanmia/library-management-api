import { z } from "zod";

export const borrowValidationSchema = z.object({
  book: z.string({
    invalid_type_error: "Book must be a Book Id",
    required_error: "Book Must a Requird"
  }),
  quantity: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: "Quantity must be a number" })
      .min(1, { message: "Quantity must be at least 1" })
  ),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid due date",
  }),
});
