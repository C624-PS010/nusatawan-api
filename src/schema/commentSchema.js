const { z } = require("zod");

const commentSchema = z.object({
  comment: z
    .string({
      required_error: "Comment is required",
      invalid_type_error: "Comment must be a string",
    })
    .trim()
    .min(1, { message: "Comment is required." })
    .max(50, { message: "Comment length exceeds limit (50 characters)" }),

  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .trim()
    .min(1, { message: "User ID is required." }),

  articleId: z
    .string({
      required_error: "Article ID is required",
      invalid_type_error: "Article ID must be a string",
    })
    .trim()
    .min(1, { message: "Article ID is required." }),
});

module.exports = commentSchema;
