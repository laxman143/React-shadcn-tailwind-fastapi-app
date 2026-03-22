import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import api from '@/services/api'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { toast } from "sonner"
import {Link} from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        role: ""
    })

    const handleChange = (e: any) => {
         setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: any) => {
         e.preventDefault();
        const body = {
            email: form.email,
            username: form.username,
            first_name: form.first_name,
            last_name: form.last_name,
            password: form.password,
            phone_number: form.phone_number,
            role: form.role
        }

        try {
            await api.post("/auth/", body);
            navigate("/")
            toast.success(`${form.username} Registed successfully!`)
        } catch (err) {
            toast.error(`${form.username} is Failed to register!`)
        }
    }



    return (
        <div className='flex justify-center items-center  min-h-screen bg-gray-100'>
            <Card className='p-6 space-y-4 w-full max-w-md shadow-lg rounded-2xl'>
                <h2 className='text-2xl font-semibold text-center'>Register</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="First Name" name="first_name" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Last Name" name="last_name" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Email" name="email" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label>Username</Label>
                        <Input placeholder="Username" name="username" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>
                        <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input placeholder="Phone number" name="phone_number" onChange={handleChange} />
                    </div>

                    <div className="space-y-2">
                        <Label>Role</Label>
                        <Input placeholder="Role" name="role" onChange={handleChange} />
                    </div>

                    <Button type='submit' className='w-full mt-2'>Register</Button>
                    <p className='text-sm text-center mt-2'>
                        Already have an account? {" "}
                        <Link to="/" className='text-blue hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    )
}

export default Register