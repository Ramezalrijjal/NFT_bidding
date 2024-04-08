import React, { useState, useRef, useEffect } from 'react';
import Products from '../products/Products'
import useApiData from '../../hooks/fetchAPI';
import { useParams } from 'react-router-dom';
import CountdownTimer from '../../hooks/countDownTimer';
import Swal from 'sweetalert2';
import axios from '../../components/axios';



export default function ProductDetails() {

    const userId = sessionStorage.getItem('userID');

    const [formData, setFormData] = useState({
        value: '',
    });

    const formRef = useRef(null);

    const { id } = useParams();// Replace with your target date

    const productAPI = `http://127.0.0.1:8000/api/products/${id}`;
    const { data: product } = useApiData(productAPI);

    const categoryAPI = `http://127.0.0.1:8000/api/categories/${product.category_id}`;
    const { data: category } = useApiData(categoryAPI);

    const userAPI = `http://127.0.0.1:8000/api/users/${product.user_id}`;
    const { data: user } = useApiData(userAPI);

    const loggedAPI = `http://127.0.0.1:8000/api/users/${userId}`
    const { data: loggedUser } = useApiData(loggedAPI);

    const winningUserAPI = `http://127.0.0.1:8000/api/Winner/${id}`;
    const { data: winner } = useApiData(winningUserAPI);

    const HighsetBidAPI = `http://127.0.0.1:8000/api/HighestBid/${id}`;
    // const { data: highestBid } = useApiData(HighsetBidAPI);

    const [highestBidding, setHighestBidding] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(HighsetBidAPI);
                setHighestBidding(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [HighsetBidAPI]);

    let targetDate = product.timer;

    console.log("HIGHEST BID: ", highestBidding);

    console.log("USER BALANCE ", loggedUser.balance);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bidValue = formData.value;

        if (bidValue < product.min_target || bidValue <= highestBidding) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You Can\'t Bid Lower Than The Minimum Target',
            });
        } else if (loggedUser.balance < bidValue) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You Don\'t have enough money, Charge your wallet first',
            });
        }
        else {
            try {

                // Create the bidding object to send to the API
                const biddingData = {
                    user_id: userId,
                    product_id: id,
                    amount: bidValue,
                };

                // Send a POST request to your API using Axios
                const response = await axios.post('/Biddings', biddingData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    Swal.fire(
                        'Done!',
                        'You bid to that product',
                        'success'
                    )
                    setHighestBidding(biddingData.amount);
                } else {
                    // Handle any errors if the request fails
                    // You can display an error message or perform other actions
                    console.error('Failed to create a bidding record');
                }
            } catch (error) {
                console.error('An error occurred while creating a bidding record:', error);
            }
        }
    };



    return (
        <div>
            {/* start product details area */}
            <div className="product-details-area rn-section-gapTop">
                <div className="container">
                    <div className="row g-5">
                        {/* product image area */}
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <div className="product-tab-wrapper rbt-sticky-top-adjust">
                                <div className="pd-tab-inner">
                                    <div
                                        className="tab-content rn-pd-content"
                                        id="v-pills-tabContent"
                                    >
                                        <div
                                            className="tab-pane fade show active"
                                            id="v-pills-home"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-home-tab"
                                        >
                                            <div className="rn-pd-thumbnail">
                                                <img
                                                    src={`http://127.0.0.1:8000/assets/images/${product.image}`}
                                                    alt="Nft_Profile"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-profile"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-profile-tab"
                                        >
                                            <div className="rn-pd-thumbnail">
                                                <img
                                                    src="assets/images/portfolio/lg/portfolio-02.jpg"
                                                    alt="Nft_Profile"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="v-pills-messages"
                                            role="tabpanel"
                                            aria-labelledby="v-pills-messages-tab"
                                        >
                                            <div className="rn-pd-thumbnail">
                                                <img
                                                    src="assets/images/portfolio/lg/portfolio-03.jpg"
                                                    alt="Nft_Profile"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* product image area end */}
                        <div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
                            <div className="rn-pd-content-area">
                                <div className="pd-title-area">
                                    <h4 className="title">{product.name}</h4>
                                </div>
                                {/* <span className="bid">
                                    Height bid <span className="price">0.11wETH</span>
                                </span> */}
                                <div className="catagory-collection">
                                    <div className="catagory">
                                        <span>
                                            Catagory <span className="color-body">{category.name}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="rn-bid-details">
                                    <div className="tab-wrapper-one">
                                        <nav className="tab-button-one">
                                            <div className="nav nav-tabs" style={{ justifyContent: 'space-evenly' }} id="nav-tab" role="tablist">
                                                {/* <button
                                                    className="nav-link"
                                                    id="nav-home-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-home"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-home"
                                                    aria-selected="false"
                                                >
                                                    Bids
                                                </button> */}
                                                <button
                                                    className="nav-link active"
                                                    id="nav-profile-tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#nav-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="nav-profile"
                                                    aria-selected="true"
                                                >
                                                    Details
                                                </button>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    Minimum target: ${product.min_target}
                                                </div>
                                            </div>
                                        </nav>
                                        <div className="tab-content rn-bid-content" id="nav-tabContent">
                                            <div
                                                className="tab-pane fade"
                                                id="nav-home"
                                                role="tabpanel"
                                                aria-labelledby="nav-home-tab"
                                            >
                                                {/* single creator */}
                                                <div className="top-seller-inner-one">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-3.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by <a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade show active"
                                                id="nav-profile"
                                                role="tabpanel"
                                                aria-labelledby="nav-profile-tab"
                                            >
                                                {/* single */}
                                                <div className="rn-pd-bd-wrapper">
                                                    <div className="top-seller-inner-one">
                                                        {/* <p class="disc">Lorem ipsum dolor, sit amet consectetur adipisicing
                                              elit. Doloribus debitis nemo deserunt.</p> */}
                                                        <h6 style={{ textAlign: 'left' }} className="name-title">Owner</h6>
                                                        <div className="top-seller-wrapper">
                                                            <div className="thumbnail">
                                                                <a href="#">
                                                                    <img
                                                                        src={`${user.image}`}
                                                                        alt="Nft_Profile"
                                                                    />
                                                                </a>
                                                            </div>
                                                            <div className="top-seller-content">
                                                                <a href="#">
                                                                    <h6 className="name">{user.name}</h6>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* single */}
                                                </div>
                                                {/* single */}
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="nav-contact"
                                                role="tabpanel"
                                                aria-labelledby="nav-contact-tab"
                                            >
                                                {/* single creator */}
                                                <div className="top-seller-inner-one">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-3.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by<a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* single creator */}
                                                {/* single creator */}
                                                <div className="top-seller-inner-one mt--20">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-2.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by<a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* single creator */}
                                                {/* single creator */}
                                                <div className="top-seller-inner-one mt--20">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-4.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by<a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* single creator */}
                                                {/* single creator */}
                                                <div className="top-seller-inner-one mt--20">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-5.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by<a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* single creator */}
                                                {/* single creator */}
                                                <div className="top-seller-inner-one mt--20">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src="assets/images/client/client-8.png"
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content">
                                                            <span>
                                                                0.11wETH by<a href="#">Allen Waltker</a>
                                                            </span>
                                                            <span className="count-number">1 hours ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* single creator */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="place-bet-area">
                                        <div className="rn-bet-create">
                                            <div className="bid-list winning-bid">
                                                <h6 style={{ textAlign: 'left' }} className="title">Winning bit</h6>
                                                <div className="top-seller-inner-one">
                                                    <div className="top-seller-wrapper">
                                                        <div className="thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    src={`${user.image}`}
                                                                    alt="Nft_Profile"
                                                                />
                                                            </a>
                                                        </div>
                                                        <div className="top-seller-content" style={{ display: 'flex' }}>
                                                            <div className="heighest-bid">
                                                                Heighest bid: <a href="#">{winner.name}</a>
                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="count-number fs-2">${highestBidding}</div>
                                                </div>
                                            </div>
                                            <div className="bid-list left-bid">
                                                <h6 className="title">Auction will end in:</h6>
                                                {/* <div className="countdown mt--15" data-date="2023-12-09">
                                                    <div className="countdown-container days">
                                                        <span className="countdown-value"></span>
                                                        <span className="countdown-heading"></span>
                                                    </div>
                                                    <div className="countdown-container hours">
                                                        <span className="countdown-value"></span>
                                                        <span className="countdown-heading"></span>
                                                    </div>
                                                    <div className="countdown-container minutes">
                                                        <span className="countdown-value"></span>
                                                        <span className="countdown-heading"></span>
                                                    </div>
                                                    <div className="countdown-container seconds">
                                                        <span className="countdown-value"></span>
                                                        <span className="countdown-heading"></span>
                                                    </div>
                                                </div> */}
                                                <CountdownTimer targetDate={targetDate} productName={product.id} />
                                            </div>
                                        </div>
                                        {/* <a class="btn btn-primary-alta mt--30" href="#">Place a Bid</a> */}
                                        <button
                                            type="button"
                                            className="btn btn-primary-alta mt--30"
                                            data-bs-toggle="modal"
                                            data-bs-target="#placebidModal"
                                        >
                                            Place a Bid
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End product details area */}

            {/* Modal */}
            <div
                className="rn-popup-modal share-modal-wrapper modal fade"
                id="shareModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <i data-feather="x" />
                </button>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content share-wrapper">
                        <div className="modal-header share-area">
                            <h5 className="modal-title">Share this NFT</h5>
                        </div>
                        <div className="modal-body">
                            <ul className="social-share-default">
                                <li>
                                    <a href="#">
                                        <span className="icon">
                                            <i data-feather="facebook" />
                                        </span>
                                        <span className="text">facebook</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="icon">
                                            <i data-feather="twitter" />
                                        </span>
                                        <span className="text">twitter</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="icon">
                                            <i data-feather="linkedin" />
                                        </span>
                                        <span className="text">linkedin</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="icon">
                                            <i data-feather="instagram" />
                                        </span>
                                        <span className="text">instagram</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="icon">
                                            <i data-feather="youtube" />
                                        </span>
                                        <span className="text">youtube</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div
                className="rn-popup-modal report-modal-wrapper modal fade"
                id="reportModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <i data-feather="x" />
                </button>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content report-content-wrapper">
                        <div className="modal-header report-modal-header">
                            <h5 className="modal-title">Why are you reporting?</h5>
                        </div>
                        <div className="modal-body">
                            <p>
                                Describe why you think this item should be removed from marketplace
                            </p>
                            <div className="report-form-box">
                                <h6 className="title">Message</h6>
                                <textarea
                                    name="message"
                                    placeholder="Write issues"
                                    defaultValue={""}
                                />
                                <div className="report-button">
                                    <button type="button" className="btn btn-primary mr--10 w-auto">
                                        Report
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary-alta w-auto"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal */}
            <div
                className="rn-popup-modal placebid-modal-wrapper modal fade"
                id="placebidModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <i data-feather="x" />
                </button>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Place a bid</h3>
                        </div>
                        <div className="modal-body">
                            <p>You are about to purchase This Product Form Nuron</p>
                            <div className="placebid-form-box">
                                <h5 className="title">Your bid</h5>
                                <div className="bid-content">
                                    <div className="bid-content-top">
                                        <div className="bid-content-left">
                                            <form ref={formRef} className='w-100' >
                                                <input
                                                    min={product.min_target}
                                                    id="value"
                                                    type="number"
                                                    name="value"
                                                    onChange={(e) => setFormData({ value: e.target.value })} />
                                            </form>
                                            <span>$</span>
                                        </div>
                                    </div>
                                    <div className="bid-content-mid">
                                        <div className="bid-content-left">
                                            <span>Your Balance</span>
                                            <span>Total bid amount</span>
                                        </div>
                                        <div className="bid-content-right">
                                            <span>${loggedUser.balance}</span>
                                            <span>$0</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bit-continue-button">
                                    <button onClick={handleSubmit} type='submit' className="btn btn-primary w-100">
                                        Place a bid
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary-alta mt--10"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
