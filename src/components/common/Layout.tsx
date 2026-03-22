import { Outlet, useNavigate } from 'react-router-dom'
import {Button} from '@/components/ui/button'
function Layout() {


    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        navigate("/")
    }
  return (
    <div className='flex h-screen overflow-hidden'>
        {/* sidebar */}
        <aside className='w-64 bg-gray-900 text-white p-4'>
            <h2 className='text-xl font-bold mb-4'>My App</h2>
            <ul className='space-y-2'>
                <li><button onClick={()=> navigate("/dashboard")}> Dashboard </button></li>
                <li><button onClick={()=> navigate("/products")}>Products</button></li>
            </ul>
        </aside>

        {/* Main Area */}
        <div className='flex flex-col flex-1 h-full  overflow-hidden'>
            {/* header */}
            <header className="h-16 bg-white shadow px-4 flex items-center justify-between flex-shrink-0">
                <h1 className='text-lg font-semibold'> Header</h1>
                <Button onClick={logout} >Logout</Button>
            </header>

            {/* Page content */}
            <main className='flex-1 p-4 overflow-y-auto bg-gray-100'>
                <Outlet/>
            </main>

            {/* Footer */}
            <footer className="h-12 bg-white border-t flex items-center justify-center flex-shrink-0">
                Footer@2026
            </footer>
        </div>
    </div>
  )
}

export default Layout