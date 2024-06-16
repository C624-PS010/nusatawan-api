const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({
      message: "Email must be string",
    })
    .min(1, { message: "Email is required" })
    .max(50, {
      message: "Email length exceed limit (25 characters)",
    })
    .email(),

  password: z
    .string({
      message: "Password must be string",
    })
    .min(8, { message: "Password should contain atleast 8 characters" })
    .max(16, {
      message: "Password length exceed limit (16 characters)",
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Password cannot contain special characters",
    }),
});

module.exports = loginSchema;
