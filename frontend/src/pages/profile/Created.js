// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UserCreatedProducts() {
//     const [userCreatedProducts, setUserCreatedProducts] = useState([]); // Declare userCreatedProducts state
//     const userId = sessionStorage.getItem('userID');

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/products')
//             .then((response) => {
//                 const userProducts = response.data.filter((product) => product.user_id === userId);
//                 setUserCreatedProducts(userProducts); 

//                 console.log(userProducts );   
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);
//  return (
//         <div className="rn-authore-profile-area">
//             <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

            

//             <div className="container">
//                 <div className="tab-content rn-bid-content" id="nav-tabContent">
//                     <div
//                         className="tab-pane row g-5 d-flex fade show active"
//                         id="nav-home"
//                         role="tabpanel"
//                         // aria-labelledby="nav-home-tab"
//                     >
//                         {userCreatedProducts.map((product, index) => (
//                             <div key={index} className="col-3 col-lg-4 col-md-3 col-sm-3 col-6">
//                                 <div className="product-style-one no-overlay with-placeBid">
//                                     <div className="card-thumbnail">
//                                         <a href="product-details.html">
//                                             <img src={product.image} alt={product.name} />
//                                         </a>
//                                     </div>
//                                     <div className="product-share-wrapper">
//                                         <div className="profile-share">
//                                             {/* Author avatars and more */}
//                                         </div>
//                                         <div className="share-btn share-btn-activation dropdown">
//                                             {/* Share and report buttons */}
//                                         </div>
//                                     </div>
//                                     <a href="product-details.html">
//                                         <span className="product-name">{product.name}</span>
//                                     </a>
//                                     <span className="latest-bid">Highest bid {product.bidCount}/20</span>
//                                     <div className="bid-react-area">
//                                         <div className="last-bid">{product.highestBid}</div>
//                                         <div className="react-area">
//                                             <svg
//                                                 viewBox="0 0 17 16"
//                                                 fill="none"
//                                                 width="16"
//                                                 height="16"
//                                                 className="sc-bdnxRM sc-hKFxyN kBvkOu"
//                                             >
//                                                 <path
//                                                     d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.21120 14Z"
//                                                     stroke="currentColor"
//                                                     strokeWidth="2"
//                                                 />
//                                             </svg>
//                                             <span className="number">{product.bidCount}</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UserCreatedProducts;
