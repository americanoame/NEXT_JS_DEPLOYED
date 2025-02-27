import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// The `<T>` is a generic. We can use this to specify the type of the value that we are passing in. 
// In this case, `T` represents a placeholder for any type that the function might accept when it is called. 
// It could be a `string`, `object`, `array`, or even a more complex type like a Prisma model.

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}


// It’s a Decimal in the database, which requires precise formatting.
// Form inputs typically provides price as a string (e.g., "49.9"), 
// but we need to ensure it’s valid and formatted properly before passing it to the database.


// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}