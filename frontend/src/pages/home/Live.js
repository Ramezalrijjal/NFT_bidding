import React, { useState, useEffect } from 'react';
import CountdownTimer from '../../hooks/countDownTimer';
import { Link } from 'react-router-dom';
import useApiData from '../../hooks/fetchAPI';

const Live = () => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState({});

    const usersAPI = `http://127.0.0.1:8000/api/users`;
    const { data: user } = useApiData(usersAPI);

    useEffect(() => {
        // Fetch data from the API
        fetch('http://127.0.0.1:8000/api/products')
            .then((response) => response.json())
            .then((data) => {
                // Filter products with status true
                const filteredProducts = data.filter((product) => product.status === true);
                setProducts(filteredProducts);

                console.log("Filtered ProductsL: ", filteredProducts)

                // Extract unique user IDs from the filtered products
                const uniqueUserIds = [...new Set(filteredProducts.map((product) => product.winning_user))];

                // Fetch user data for each unique user ID
                Promise.all(
                    uniqueUserIds.map((userId) =>
                        fetch(`https://user-api-url/${userId}`).then((response) => response.json())
                    )
                )
                    .then((userResponses) => {
                        // Create a user dictionary with user ID as the key
                        const userDict = {};
                        userResponses.forEach((user) => {
                            userDict[user.id] = user;
                        });
                        setUsers(userDict);
                    })
                    .catch((error) => {
                        console.error('Error fetching user data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div className="rn-live-bidding-area rn-section-gapTop">
                <div className="container">
                    <div className="row mb--50">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h3 className="title mb--0 live-bidding-title " data-sal-delay="150" data-sal="" data-sal-duration="800" style={{ textAlign: 'left' }}>
                                    Live Bidding
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {products.map((product) => {
                            const targetDate = product.timer; // Moved this line outside of the return statement
                            return (
                                <div key={product.id} className="col-lg-4">
                                    <div className="single-slide-product">
                                        <div className="product-style-one">
                                            <div className="card-thumbnail">
                                                {/* <a href={`product/${product.id}`}>
                                                    <img src={product.image} alt={product.name} />
                                                </a> */}
                                                <Link to={`/ProductDetails/${product.id}`}>
                                                    <img
                                                        src={product.image} alt={product.name}
                                                    />
                                                </Link>
                                                <div className="countdown" data-date={product.timer}>
                                                    <CountdownTimer targetDate={targetDate} productName={product.id} />
                                                </div>
                                            </div>
                                                <br />
                                            <a href={`product-details.html/${product.id}`}>
                                                <span className="product-name">{product.name}</span>
                                                <span className="last-bid">Highest bid $ {product.highest_bid}</span>
                                            </a>
                                            <div className="bid-react-area">
                                                <span className="last-bid">Start From $ {product.min_target}</span>
                                                <span className="last-bid">
                                                    {user.first_name} {user.last_name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Live;
