'use client';

import ShowToast from './ShowToast';

export default function OrderToast({insertedId}) {
  if(!insertedId){
    return null
  }
  return <ShowToast message="Order placed successfully!" type="success" />;
}
