const { z } = require("zod");

const categorySchema = z.object({
  name: z
    .string({
      message: "Name must be string",
    })
    .min(1, { message: "Name is required." })
    .max(25, { message: "Name length exceeds limit (25 characters)" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Category cannot contain special characters",
    }),
});

module.exports = categorySchema;
