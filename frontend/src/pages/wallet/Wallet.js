import React, { useState, useEffect } from 'react'
import useApiData from '../../hooks/fetchAPI';
import axios from '../../components/axios';
import Swal from 'sweetalert2';

export default function Wallet() {

    const [moneyAmount, setMoneyAmount] = useState(0);

    let userID = sessionStorage.getItem('userID');
    console.log(userID);

    const userAPI = `http://127.0.0.1:8000/api/users/${userID}`;

    const { data: user } = useApiData(userAPI);

    const [userBalance, setUserBalance] = useState(user.balance);




    // axios.post(`/chargeWallet/${userID}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Fetch CSRF token
            const csrfResponse = await axios.get('/get-csrf-token');
            const csrfToken = csrfResponse.data.csrf_token;
    
            // Include CSRF token in headers
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    
            // Make the POST request with the CSRF token
            const response = await axios.post(
                `/chargeWallet/${userID}`,
                {
                    money_amount: moneyAmount,
                }
            );
    
            // Update the user balance on a successful response
            if (response.data) {
                Swal.fire(
                    'Done',
                    `You charged your wallet with $${moneyAmount}`,
                    'success'
                );
    
                // Update the user's balance state
                setUserBalance(userBalance + parseFloat(moneyAmount));
    
                // Reset the moneyAmount input field
                setMoneyAmount(0);
            }
        } catch (error) {
            console.error('Error charging wallet:', error);
        }
    };
    
    


    return (

        <>
            {/* create new product area */}
            <div className="create-area rn-section-gapTop">
                <div className="container">
                    <h2>Your Wallet</h2>
                    <div className="row g-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="form-wrapper-one">
                                    <div className="col-md-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="name" className="form-label">
                                                Your Balance
                                            </label>
                                            <input
                                                id="balance"
                                                placeholder=""
                                                disabled
                                                readOnly
                                                value={`$` + user.balance}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="input-box pb--20">
                                            <label htmlFor="dollerValue" className="form-label">
                                                Charge wallet $
                                            </label>
                                            <form onSubmit={handleSubmit}>
                                                <input  value={moneyAmount} onChange={(e) => setMoneyAmount(e.target.value)} name='money_amount' id="dollerValue" placeholder="e. g. `20$`" />
                                                <div className="input-box mt-4 pt-3">
                                                    <button type='submit' className="btn btn-primary btn-large w-100">
                                                        Charge
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-12 col-12">
                                        <div className="input-box">
                                            <button className="btn btn-primary btn-large w-100">
                                                Charge
                                            </button>
                                        </div>
                                    </div> */}

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div
                className="rn-popup-modal upload-modal-wrapper modal fade"
                id="uploadModal"
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
                        <div className="modal-body">
                            <div className="product-style-one no-overlay">
                                <div className="card-thumbnail">
                                    <a href="product-details.html">
                                        <img
                                            src="assets/images/portfolio/portfolio-08.jpg"
                                            alt="NFT_portfolio"
                                        />
                                    </a>
                                </div>
                                <div className="product-share-wrapper">
                                    <div className="profile-share">
                                        <a
                                            href="author.html"
                                            className="avatar"
                                            data-tooltip="Jone lee"
                                        >
                                            <img
                                                src="assets/images/client/client-1.png"
                                                alt="Nft_Profile"
                                            />
                                        </a>
                                        <a
                                            href="author.html"
                                            className="avatar"
                                            data-tooltip="Jone lee"
                                        >
                                            <img
                                                src="assets/images/client/client-2.png"
                                                alt="Nft_Profile"
                                            />
                                        </a>
                                        <a
                                            href="author.html"
                                            className="avatar"
                                            data-tooltip="Jone lee"
                                        >
                                            <img
                                                src="assets/images/client/client-3.png"
                                                alt="Nft_Profile"
                                            />
                                        </a>
                                        <a className="more-author-text" href="#">
                                            9+ Place Bit.
                                        </a>
                                    </div>
                                    <div className="share-btn share-btn-activation dropdown">
                                        <div className="share-btn-setting dropdown-menu dropdown-menu-end">
                                            <button
                                                type="button"
                                                className="btn-setting-text share-text"
                                                data-bs-toggle="modal"
                                                data-bs-target="#shareModal"
                                            >
                                                Share
                                            </button>
                                            <button
                                                type="button"
                                                className="btn-setting-text report-text"
                                                data-bs-toggle="modal"
                                                data-bs-target="#reportModal"
                                            >
                                                Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <a href="product-details.html">
                                    <span className="product-name">Preatent</span>
                                </a>
                                <span className="latest-bid">Highest bid 1/20</span>
                                <div className="bid-react-area">
                                    <div className="last-bid">0.244wETH</div>
                                    <div className="react-area">
                                        <svg
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            width={16}
                                            height={16}
                                            className="sc-bdnxRM sc-hKFxyN kBvkOu"
                                        >
                                            <path
                                                d="M8.2112 14L12.1056 9.69231L14.1853 7.39185C15.2497 6.21455 15.3683 4.46116 14.4723 3.15121V3.15121C13.3207 1.46757 10.9637 1.15351 9.41139 2.47685L8.2112 3.5L6.95566 2.42966C5.40738 1.10976 3.06841 1.3603 1.83482 2.97819V2.97819C0.777858 4.36443 0.885104 6.31329 2.08779 7.57518L8.2112 14Z"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            />
                                        </svg>
                                        <span className="number">322</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
