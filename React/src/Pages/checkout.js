import React from 'react'
import { Link, useParams } from 'react-router-dom';
function Checkout() {
  const { productId } = useParams();
  console.log("productId: ", productId);
  return (
    <div>
      
    </div>
  )
}

export default Checkout;
