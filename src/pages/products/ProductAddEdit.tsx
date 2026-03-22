import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/services/api';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "sonner"

function ProductAddEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
    })

    const fetchProduct = async (id: any) => {
        console.log(id)
        try {
            const res = await api.get(`/product/${id}`);
            console.log(res)
            setForm({
                name: res.data.name,
                description: res.data.description,
                price: res.data.price,
                category: res.data.category,
                quantity: res.data.quantity

            })
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const body = {
            name: form.name,
            description: form.description,
            price: form.price,
            category: form.category,
            quantity: form.quantity
        }
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


    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id])
    return (
        <div className='flex justify-center min-h-screen bg-gray-100'>
            <Card className='p-6 space-y-4 w-full max-w-md shadow-lg rounded-2xl'>
                <h2 className='text-2xl font-semibold text-center'>Product</h2>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label>Name</Label>
                        <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label>Description</Label>
                        <Input placeholder="Description" name="description" value={form.description} onChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label>Price</Label>
                        <Input placeholder="Price" name="price" value={form.price} onChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label>Category</Label>
                        <Input placeholder="Category" name="category" value={form.category} onChange={handleChange} />
                    </div>
                    <div className='space-y-2'>
                        <Label>Quantity</Label>
                        <Input placeholder="Quantity" name="quantity" value={form.quantity} onChange={handleChange} />
                    </div>
                    <Button type='submit' className='w-full mt-2'>Submit</Button>
                </form>
            </Card>

        </div>
    )
}

export default ProductAddEdit