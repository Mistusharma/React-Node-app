import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productById } from '../Helpers/collectionAndProduct';
import Header from '../Components/Header';
import { addtoCart } from '../Redux/cartSlice';
import Loading from '../Components/Loading';
import './productDetail.css';

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductById = async () => {
      try {
        const result = await productById(id);
        setData(result[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProductById();
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % data.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === 0 ? data.images.length - 1 : prevIndex - 1));
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    dispatch(addtoCart({ data }));
    setMessage('Successfully added!');
  };

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>No product found</div>;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(data.body_html, 'text/html');
  const textContent = doc.body.textContent;

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-images">
          <button className="image-nav-button" onClick={prevImage}>&lt;</button>
          <img
            src={data.images[currentImageIndex]?.src}
            alt={data.title}
            className="product-image"
          />
          <button className="image-nav-button" onClick={nextImage}>&gt;</button>
        </div>
        <div className="product-details">
          <h2 className="product-title">{data.title}</h2>
          <p className="product-price">${data.variants[0].price}</p>
          <div className="variant-buttons">
            {data.variants.map((item, index) => (
              <button
                key={index}
                className={`variant-button ${selectedVariant === item.option1 ? 'selected' : ''}`}
                onClick={() => handleVariantClick(item.option1)}
              >
                {item.option1}
              </button>
            ))}
          </div>
          <p className="product-description">{textContent}</p>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
         
          {message && <p className="success-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
