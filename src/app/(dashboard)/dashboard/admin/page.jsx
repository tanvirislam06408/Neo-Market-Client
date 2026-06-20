import { getUserSession } from '@/lib/core/session';
import React from 'react';

const AdminPage = async() => {
    const user=await getUserSession()
    console.log(user);
    
    return (
        <div>
            Admin page
        </div>
    );
};

export default AdminPage;