// src/utils/statusCode.ts
export const StatusCode = {
  LOADING: "loading",
  IDLE: "idle",
  ERROR: "error",
  SUCCEEDED: "succeeded",
} as const;

// TypeScript type for StatusCode values
export type StatusCodeType = typeof StatusCode[keyof typeof StatusCode];
