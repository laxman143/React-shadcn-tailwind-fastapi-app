import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/services/api';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async () => {

        const params = new URLSearchParams();
        params.append("username", username);
        params.append("password", password);
        params.append("grant_type", "password");

        const res = await api.post('./auth/token', params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log(res)
        localStorage.setItem("token", res.data.access_token)
        toast.success(`${username} is Logged in successfully!`)
        navigate("/dashboard")
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='p-6 space-y-4 w-80'>
                <Input placeholder="username"  onChange={(e) => setUsername(e.target.value)} />
                <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleLogin}> Login </Button>

                {/* Register link */}
                <p className='text-center text-sm text-muted-foreground'>
                    Don't have account ? {" "}
                    <Button variant="link" onClick={()=>navigate('/register')}>Register</Button>
                </p>
            </Card>
        </div>
    )
}

export default Login