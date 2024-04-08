import React, { useState, useEffect } from 'react';
import sal from 'sal.js';
import { Link } from 'react-router-dom';



const Category = () => {
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
                console.log('Products:', products); 
                return products.length;
            }
        } catch (error) {
            console.error(`Error fetching product data for category ${categoryId}:`, error);
        }
        return 0;
    };

    useEffect(() => {
        const counts = {};
        data.forEach((Category) => {
            getProductCount(Category.id)
                .then((count) => {
                    counts[Category.id] = count;
                    setProductCounts({ ...counts });
                });
        });
    }, [data]);


    return (
        <div>
            <div className="rn-collection-area rn-section-gapTop">
                <div className="container">
                    <div className="row mb--50 align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <h3 className="title mb--0" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800" style={{ textAlign:'left' }}>
                                Top Collection
                            </h3>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
                            <div className="view-more-btn text-start text-sm-end" data-sal-delay="150" data-sal="slide-up" data-sal-duration="800">
                                <a className="btn-transparent" href="/products">
                                    VIEW ALL<i data-feather="arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                                      
                    <div className="row g-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            data.map((Category, index) => (
                                <div key={index} data-sal="" className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-12">
                                    <Link to={`/Category/${Category.id}/Products`} className="rn-collection-inner-one">   
                                    <a className="rn-collection-inner-one">
                                        <div className="collection-wrapper">
                                            <div className="collection-big-thumbnail">
                                            <img src={`http://127.0.0.1:8000/${Category.image}`} alt={Category.image} />
                                            </div>

                                            <div className="collection-deg">
                                                <h6 className="title">{Category.name}</h6>
                                                <span className="items">{productCounts[Category.id]} Items</span>
                                            </div>
                                        </div>
                                    </a>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
