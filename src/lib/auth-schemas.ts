import { z } from "zod"

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "emailRequired" })
    .email({ message: "emailInvalid" }),
  password: z
    .string()
    .min(1, { message: "passwordRequired" }),
})

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "firstNameRequired" })
    .max(50, { message: "firstNameTooLong" }),
  lastName: z
    .string()
    .min(1, { message: "lastNameRequired" })
    .max(50, { message: "lastNameTooLong" }),
  email: z
    .string()
    .min(1, { message: "emailRequired" })
    .email({ message: "emailInvalid" }),
  password: z
    .string()
    .min(8, { message: "passwordTooShort" })
    .regex(/[A-Z]/, { message: "passwordUppercase" })
    .regex(/[0-9]/, { message: "passwordNumber" }),
  confirmPassword: z.string().min(1, { message: "confirmPasswordRequired" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwordMismatch",
  path: ["confirmPassword"],
})

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6, { message: "codeLength" })
    .regex(/^\d{6}$/, { message: "codeDigits" }),
})

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
export type VerifyCodeValues = z.infer<typeof verifyCodeSchema>
