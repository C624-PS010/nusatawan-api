const { z } = require("zod");

const registerSchema = z.object({
  username: z
    .string({
      message: "Username must be string",
    })
    .min(1, { message: "Username is required" })
    .max(25, {
      message: "Username length exceed limit (25 characters)",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username cannot contain special characters",
    }),

  email: z
    .string({
      message: "Email must be string",
    })
    .min(1, { message: "Email is required" })
    .max(50, {
      message: "Username length exceed limit (25 characters)",
    })
    .email(),

  password: z
    .string({
      message: "Password must be string",
    })
    .min(1, { message: "Password is required" })
    .max(16, {
      message: "Password length exceed limit (16 characters)",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Password cannot contain special characters",
    }),

  phone: z
    .string({
      message: "Phone must be string",
    })
    .min(1, { message: "Phone is required" })
    .max(16, {
      message: "Phone length exceed limit (16 characters)",
    })
    .regex(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/, {
      message: "Phone is not valid",
    }),
});

module.exports = registerSchema;
