import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleLogout = async () => {
    await localStorage.removeItem('token');
    navigate('/signup');
  };

  return (
    <header style={headerStyle}>
      <h2 style={h4Style}>Cloth County</h2>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <button
              style={{
                width: '90px',
                height: '22px',
                backgroundColor: 'black',
                color: 'white',
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </li>
          <li style={liStyle}>
            <a href="/home">Home</a>
          </li>
          <li style={liStyle}>
            <a href="/product">Product</a>
          </li>
          <li style={liStyle}>
            <Link to="/cart">
              {cartItems.length}
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
          <li style={liStyle}>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#ede7f6',
  color: '#fff',
  position: 'sticky',
  top: '0',
};

const h4Style = {
  color: '#fff',
  margin: '0',
  fontFamily: 'serif',
  textAlign: 'center',
};

const navStyle = {
  marginLeft: 'auto',
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const liStyle = {
  display: 'inline',
  marginLeft: '30px',
  fontSize: '16px',
};

export default Header;
