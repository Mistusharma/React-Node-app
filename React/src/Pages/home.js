import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { collections } from '../Helpers/collectionAndProduct';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading';
function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const result = await collections();
        setData(result);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    getCollection();
  }, []);

  return (
    <div style={styles.container}>
      <Header />
      {loading ? (
      <Loading/>
      ) : (
        <div style={styles.collectionContainer}>
          {data.map((item, index) => (
            <div key={item.id} style={styles.collectionItem}>
              <Link to={`/collectionProduct/${item.collection_id}`} style={styles.link}>
                <div style={styles.collectionContent}>
                  <img src={item?.image?.src} alt={`Image ${index}`} style={styles.image} />
                  <p style={styles.title}>{item.title}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;

// Styles
const styles = {
  container: {
    position: 'relative',
    marginTop:'22px',
    marginBottom:'16pc'
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  loader: {
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderLeftColor: '#333',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
  },
  collectionContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '20px',
  },
  collectionItem: {
    margin: '20px',
    display: 'inline-block',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  collectionContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '240px',
    height: '270px',
    objectFit: 'cover',
  },
  title: {
    textAlign: 'center',
    margin: '10px 0 0 0',
  },
};
