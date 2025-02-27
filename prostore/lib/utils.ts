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