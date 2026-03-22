import { z } from 'zod';
export const registerSchema = z.object({
    name: z.string().min(2, "First name is required"),
    description : z.string().min(2,"Description is required"),
    price:z.string().min(2,"Prices is required"),
    category: z.string().min(2,"Category is required"),
    quantity:z.string().min(1, "Quantity is required")
}) ;