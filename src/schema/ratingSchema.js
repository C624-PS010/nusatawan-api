const { z } = require("zod");

const ratingSchema = z.object({
  articleId: z
    .string({
      required_error: "ArticleId is required",
      invalid_type_error: "ArticleId must be a string",
    })
    .trim()
    .min(1, { message: "ArticleId is required." })
    .max(255, { message: "ArticleId length exceeds limit (255 characters)" }),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),

  userId: z
    .string({
      required_error: "UserId is required",
      invalid_type_error: "UserId must be a string",
    })
    .trim()
    .min(1, { message: "UserId is required." })
    .max(255, { message: "UserId length exceeds limit (255 characters)" }),
});

module.exports = ratingSchema;
