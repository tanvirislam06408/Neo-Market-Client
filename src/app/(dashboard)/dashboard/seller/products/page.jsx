import { protectedFetch } from '@/lib/core/server';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import MyProductsPage from './MyProductsPage';

const ProductDashboard = async () => {
    const user = await getUserSession();
    const productData = await protectedFetch(`/api/seller-product?id=${user.id}`)
    
    
    return (
        <div>
            <MyProductsPage productData={productData}/>
        </div>
    );
};

export default ProductDashboard;