const { z } = require("zod");

const teacherSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name is required"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),

  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(60, "Age cannot be greater than 60")
    .optional(),

  subject: z
    .string()
    .default("Full Stack Development"),

  married: z
    .boolean()
    .default(false),

  weight: z
    .number()
    .default(0),

  degrees: z
    .array(z.string())
    .optional(),

  address: z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      country: z
        .string()
        .default("India"),
    })
    .optional(),
});

module.exports = teacherSchema;