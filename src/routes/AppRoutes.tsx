import Dashboard from '@/pages/dashboard/Dashboard'
import Login from '@/pages/Login'
import Products from '@/pages/products/Products'
import Register from '@/pages/Register'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import ProductAddEdit from '@/pages/products/ProductAddEdit'
import Layout from '@/components/common/Layout'

function AppRoutes() {
    return (
        <BrowserRouter>
            {/* <ErrorBoundary> */}
            <Routes>
                {/* Public Rout NO any Layout */}
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* Private route with layout */}
                <Route element={<PrivateRoute />}>
                    <Route element={<Layout />}>  {/* Layout applied here */}
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route path='/productAddEdit/:id?' element={<ProductAddEdit />} />
                         </Route>
                        </Route>
                    </Routes>
                    {/* </ErrorBoundary> */}
                </BrowserRouter>
                );
}

                export default AppRoutes