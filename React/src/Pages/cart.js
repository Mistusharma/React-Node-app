import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removefromCart } from '../Redux/cartSlice';
import cartEmpty from "../assets/emptyCart.png"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart);
  console.log("cartItems: ", cartItems);

  // Calculate the total amount
  // const totalAmount = cartItems.reduce((total, item) => {
  //   return total + parseFloat(item.data.variants[0].price) * item.quantity; // Consider quantity
  // }, 0);


  const handleBuyClick = (productId) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {cartItems.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <img src={cartEmpty} alt="Empty Cart" />
        </div>
      ) : (
        <div>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Shopping Cart</h1>
          {cartItems.map((item, index) => (
            <div key={index} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <img src={item.data?.image?.src} alt={item.data.title} style={{ width: '100px', height: 'auto', marginRight: '20px' }} />
              <div>
                <p style={{ marginBottom: '5px' }}>Title: {item.data.title}</p>
                {/* <p style={{ marginBottom: '5px' }}>Price: ${item.data?.variants[0]?.price}</p> */}
                <p style={{ marginBottom: '5px' }}>quantity: {item.quantity}</p>
                <button
                  onClick={() => dispatch(removefromCart({ id: item.data.id }))}
                  style={{ backgroundColor: "red", width: '110px', height: '30px', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', borderRadius: '22px' }}
                >
                  Remove
                </button>
                <button
                  onClick={() => handleBuyClick(item.data.id)}
                  style={{ backgroundColor: "green", width: '110px', height: '30px', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', borderRadius: '22px' }}
                >
                  BUY
                </button>
              </div>
            </div>
          ))}
          {/* <div style={{ textAlign: 'right' }}>
            <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
          </div> */}
        </div>
      )}
    </div>

  );
}
export default Cart;
