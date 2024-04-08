import React, { useState, useEffect } from 'react';
import sal from 'sal.js';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [data, setData] = useState([]);
  const apiUrl = 'http://127.0.0.1:8000/api/categories';
  const productApiUrl = 'http://127.0.0.1:8000/api/products';
  const [loading, setLoading] = useState(true);
  const [productCounts, setProductCounts] = useState({});

  useEffect(() => {
    sal();
  }, []);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const getProductCount = async (categoryId) => {
    try {
      const response = await fetch(`${productApiUrl}?categoryId=${categoryId}`);
      if (response.ok) {
        const products = await response.json();
        return products.length;
      }
    } catch (error) {
      console.error(`Error fetching product data for category ${categoryId}:`, error);
    }
    return 0;
  };

  useEffect(() => {
    const counts = {};
    data.forEach((category) => {
      getProductCount(category.id)
        .then((count) => {
          counts[category.id] = count;
          setProductCounts({ ...counts });
        });
    });
  }, [data]);

  return (
    <div style={{ marginTop: '160px' }}>
      <div className="rbt-single-widget widget_categories mt-30">
        <h3 className="title">Categories</h3>
        <div className="inner">
          <ul className="category-list">
            {data.map((category) => (
              <li key={category.id}>
                <Link to={`/category/${category.id}`}>
                  <div className="collection-big-thumbnail">
                    <img
                      src={`http://127.0.0.1:8000/${category.image}`}
                      alt={category.name}
                      style={{ width: '100px', borderRadius: '50%' }}
                    />
                  </div>
                  <span className="left-content">{category.name}</span>
                  <span className="count-text">{productCounts[category.id] || 0}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rbt-single-widget widget_tag_cloud mt--40">
        <h3 className="title">Tags</h3>
        <div className="inner mt--20">
          <div className="tagcloud">
            <a href="#">Corporate</a>
            <a href="#">Agency</a>
            <a href="#">Creative</a>
            <a href="#">Design</a>
            {/* Add more tags here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;