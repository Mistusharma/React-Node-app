import React, { useEffect, useState } from 'react';
import { products } from '../Helpers/collectionAndProduct';
import Header from '../Components/Header';
import { useDispatch } from 'react-redux';
import './product.css'; // Import the CSS file

function Product() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const getProductById = async (page) => {
    setLoading(true);
    try {
      const result = await products(page);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductById(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!data.length) {
    return <div className="no-data">No data available</div>;
  }

  return (
    <div>
      <Header />
      <div className="product-container2">
        {data.map((item) => (
          <div key={item.id} className="product-card2">
            <img src={item?.images?.[0]?.src} alt={item.title} className="product-image2" />
            <div className="product-info2">
              <h3>{item.title}</h3>
              <p className="product-price2">${item.variants[0].price}</p>
              <button className="add-to-cart-button2">Add to Cart</button>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;
