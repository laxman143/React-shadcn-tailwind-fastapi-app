import api from '@/services/api';
import { useCallback, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

function Products() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const handleEdit = (item: any) => {
        navigate(`/productAddEdit/${item.id}`)
    }
    // const handleDelete = async (id: number) => {
    //     console.log("id", id)
    //     try {
    //         await api.delete(`/product/${id}`);
    //         toast.success("Product deleted successfully")
    //         fetchProducts();
    //     } catch (error) {
    //         toast.error("Delete to failed product")
    //     }


    // }
    const handleDelete = useCallback(async (id: any) => {
        try {
            await api.delete(`/product/${id}`);
            toast.success("Product deleted successfully")
            fetchProducts();
        } catch (error) {
            toast.error("Delete to failed product")
        }
    }, []);

    // const handleDelete = useCallback((id:any,test:any)=> {
    //       console.log("id", id)
    //     try {
    //         await api.delete(`/product/${id}`);
    //         toast.success("Product deleted successfully")
    //         fetchProducts();
    //     } catch (error) {
    //         toast.error("Delete to failed product")
    //     } 
    // })
    const fetchProducts = async () => {
        const res = await api.get("/product")
        console.log(res)
        setProducts(res.data);
    }
    const addProdcut = () => {
        navigate('/productAddEdit')
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className='p-6'>
            <div>
                <Button className='text-right' onClick={addProdcut}>Add Product</Button>
            </div>
            <div className="rounded-2xl border shadow-sm overlfow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((item: any) => {
                            return (<TableRow key={item.id}>
                                <TableCell className='font-medium'>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>₹{item.price}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                {/* Actions */}
                                <TableCell className="text-right space-x-2">
                                    <Button size="icon" variant="outline" onClick={() => handleEdit(item)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="outline" onClick={() => handleDelete(item.id)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>)
                        })}

                        {/* Empty state */}
                        {products.length == 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className='text-center'>
                                    No Product found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default Products