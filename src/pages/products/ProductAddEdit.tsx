import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/lib/validation"

function ProductAddEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) })
    // const [form, setForm] = useState({
    //     name: "",
    //     description: "",
    //     price: "",
    //     category: "",
    //     quantity: "",
    // })

    const fetchProduct = async (id: any) => {
        console.log(id)
        try {
            const res = await api.get(`/product/${id}`);
             // setForm({
            //     name: res.data.name,
            //     description: res.data.description,
            //     price: res.data.price,
            //     category: res.data.category,
            //     quantity: res.data.quantity
            // })
            setValue("name", res.data.name);
            setValue("description", res.data.description);
            setValue("price", res.data.price.toString());
            setValue("category", res.data.category);
            setValue("quantity", res.data.quantity.toString());
        } catch (error) {
            toast.error("Failed to fetch product")
        }
    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (body: any) => {
        // e.preventDefault()
        // const body = {
        //     name: form.name,
        //     description: form.description,
        //     price: form.price,
        //     category: form.category,
        //     quantity: form.quantity
        // }
        try {
            if (id) {
                await api.put(`/product/${id}`, body);
                toast.success("Product update successfully")
            } else {
                await api.post('/product', body);
                toast.success("Product add successfully")
            }
            navigate("/products")
        } catch (error) {
            toast.error("Failed to add Product")
        }
    }

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault()
    //     const body = {
    //         name: form.name,
    //         description: form.description,
    //         price: form.price,
    //         category: form.category,
    //         quantity: form.quantity
    //     }
    //     try {
    //         if (id) {
    //             await api.put(`/product/${id}`, body);
    //             toast.success("Product update successfully")
    //         } else {
    //             await api.post('/product', body);
    //             toast.success("Product add successfully")
    //         }
    //         navigate("/products")
    //     } catch (error) {
    //         toast.error("Failed to add Product")
    //     }
    // }


    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id])
    return (
        <div className='flex justify-center min-h-screen bg-gray-100'>
            <Card className='p-6 space-y-4 w-full max-w-md shadow-lg rounded-2xl'>
                <h2 className='text-2xl font-semibold text-center'>Product</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label>Name</Label>
                        <Input  {...register("name")} />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                        {/* <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} /> */}
                    </div>
                    <div className='space-y-2'>
                        <Label>Description</Label>
                        <Input  {...register("description")} />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                        )}
                        {/* <Input placeholder="Description" name="description" value={form.description} onChange={handleChange} /> */}
                    </div>
                    <div className='space-y-2'>
                        <Label>Price</Label>
                        <Input  {...register("price")} />
                        {errors.price && (
                            <p className="text-red-500 text-sm">{errors.price.message}</p>
                        )}

                        {/* <Input placeholder="Price" name="price" value={form.price} onChange={handleChange} /> */}
                    </div>
                    <div className='space-y-2'>
                        <Label>Category</Label>
                        <Input  {...register("category")} />
                        {errors.category && (
                            <p className="text-red-500 text-sm">{errors.category.message}</p>
                        )}
                        {/* <Input placeholder="Category" name="category" value={form.category} onChange={handleChange} /> */}
                    </div>
                    <div className='space-y-2'>
                        <Label>Quantity</Label>
                        <Input  {...register("quantity")} />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                        )}
                        {/* <Input placeholder="Quantity" name="quantity" value={form.quantity} onChange={handleChange} /> */}
                    </div>
                    <Button type='submit' className='w-full mt-2'>Submit</Button>
                </form>
            </Card>

        </div>
    )
}

export default ProductAddEdit