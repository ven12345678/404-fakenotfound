import { z } from 'zod';
import { NextResponse } from 'next/server';

// Validation schemas
export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100)
});

export const resetPasswordSchema = z.object({
  email: z.string().email()
});

export const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(6).max(100)
});

// Validation middleware
export function validateRequest(schema) {
  return async (req, res, next) => {
    try {
      const body = await req.json();
      schema.parse(body);
      req.validatedData = body;
      return next();
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          error: 'Validation failed',
          details: error.errors
        }),
        { status: 400 }
      );
    }
  };
} 