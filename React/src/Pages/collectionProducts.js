import React, { useEffect, useState } from 'react';
import { CollectionByIdProduct } from '../Helpers/collectionAndProduct';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './CollectionProducts.css';
import Loading from '../Components/Loading';

function CollectionProducts() {
  const { collection_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const collectionPro = async () => {
    try {
      const result = await CollectionByIdProduct(collection_id);
      setData(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    collectionPro();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="products-container1">
          {data.map((item, index) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card1">
      <Link to={`/productDetail/${product.id}`}>
        <img src={product?.images?.[0]?.src} alt={product.title} className="product-image1" />
        <div className="product-details1">
          <h3 className="product-title1">{product.title}</h3>
          <p className="product-price1">${product.variants[0].price}</p>
        </div>
      </Link>
    </div>
  );
}

export default CollectionProducts;
