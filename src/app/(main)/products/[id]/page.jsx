
import ProductDetailsPage from '@/components/shared/ProductDetails';
import { serverFetch } from '@/lib/core/server';
import React from 'react';

const ProductDetails = async ({ params }) => {
    const { id } = await params;

    const productDetails = await serverFetch(`/api/product/${id}`)
    
    return (
        <div>
           <ProductDetailsPage product={productDetails}/>
        </div>
    );
};

export default ProductDetails;