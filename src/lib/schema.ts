import { z } from "zod";

export const generatePayloadSchema = z.object({
  template_id: z.string().min(1, "Template ID is required"),
  format: z.enum(["pdf", "image"]).optional(),
  branding: z.object({
    primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex code").optional(),
    background_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    font_family: z.string().optional(),
  }).optional(),
  features: z.record(z.string(), z.boolean()).optional(),
  data: z.record(z.string(), z.string()).refine((val) => Object.keys(val).length > 0, {
    message: "Data payload cannot be empty",
  }),
});

export type GeneratePayload = z.infer<typeof generatePayloadSchema>;
