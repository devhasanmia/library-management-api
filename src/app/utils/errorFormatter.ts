import { z } from 'zod';

export const formatZodError = (zodError: z.ZodError) => {
  const errors: Record<string, any> = {};
  zodError.errors.forEach((issue) => {
    const path = issue.path.join('.');
    const kind = mapZodCodeToKind(issue.code);
    const params = 'params' in issue ? issue.params : {};
    errors[path] = {
      message: issue.message,
      name: "ValidatorError",
      properties: {
        message: issue.message,
        type: kind,
        ...params 
      },
      kind,
      path,
      value: 'received' in issue ? issue.received : undefined
    };
  });
  return {
    name: "ValidationError",
    errors
  };
};
const mapZodCodeToKind = (code: string): string => {
  const mapping: Record<string, string> = {
    too_small: 'min',
    too_big: 'max',
    invalid_type: 'type',
    invalid_string: 'regex',
    invalid_date: 'date',
    custom: 'custom'
  };
  return mapping[code] || code;
};