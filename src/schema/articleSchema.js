const { z } = require("zod");

const articleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .min(1, { message: "Title is required." })
    .max(50, { message: "Title length exceeds limit (50 characters)" }),

  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .trim()
    .min(1, { message: "Content is required." })
    .max(5000, { message: "Content length exceeds limit (5000 characters)" }),

  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    })
    .trim()
    .min(1, { message: "Image is required." })
    .max(255, { message: "Image length exceeds limit (255 characters)" }),

  location: z
    .string({
      required_error: "Location is required",
      invalid_type_error: "Location must be a string",
    })
    .trim()
    .min(1, { message: "Location is required." })
    .max(5000, { message: "Location length exceeds limit (5000 characters)" }),

  userId: z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .trim()
    .min(1, { message: "User ID is required." }),
});

module.exports = articleSchema;
