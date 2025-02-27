import { z } from "zod";
import { insertProductSchema } from "@/lib/validator";


// z.infer brins every field from the type 
export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    createdAt: Date;
    rating: string;
    numReviews: number;
  };