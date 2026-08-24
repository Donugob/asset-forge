import { z } from "zod";

export const generatePayloadSchema = z.object({
  template_id: z.string().min(1, "Template ID is required"),
  branding: z.object({
    primary_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex code (e.g. #FF5733)").optional(),
    background_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
    font_family: z.string().optional(),
  }).optional(),
  data: z.record(z.any()).refine((val) => Object.keys(val).length > 0, {
    message: "Data payload cannot be empty",
  }),
});

export type GeneratePayload = z.infer<typeof generatePayloadSchema>;
