import $ from "jquery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { logoutSuccess } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import axios from "../components/axios";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from 'react-feather';

const Header = ({ logoutSuccess }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  console.log(user);
  console.log(isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.csrf_token;
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      await axios.post("/logout");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log('isAuthenticated ', isAuthenticated);
  console.log("Is Logged In? ", sessionStorage.getItem('isLoggedIn'))
  const handleLogoutSession = () => {
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.removeItem('userID');
    console.log("IS NOW? ", sessionStorage.getItem('isLoggedIn'));
  }


  return (
    <div>
      {/* Start Header */}
      <header className="rn-header haeder-default header--sticky">
        <div className="container">
          <div className="header-inner">
            <div className="header-left">
              <div className="logo-thumbnail logo-custom-css">
                <Link className="logo-light" href="index.html">
                  <img
                    src="/assets/images/logo/logo-white.png"
                    alt="nft-logo"
                  />
                </Link>
                <Link className="logo-dark" href="index.html">
                  <img src="/assets/images/logo/logo-dark.png" alt="nft-logo" />
                </Link>
              </div>
              <div className="mainmenu-wrapper">
                <nav id="sideNav" className="mainmenu-nav d-none d-xl-block">
                  {/* Start Mainmanu Nav */}
                  <ul className="mainmenu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/About">About</Link>
                    </li>
                    <li className="has-menu-child-item">
                      <Link to="/Activity_pages">Activity</Link>
                    </li>
                    <li className="has-menu-child-item">
                      <Link to="/AddProduct">Create NFT</Link>
                    </li>

                    <li>
                      <Link to="/Contact">Contact</Link>
                    </li>
                  </ul>
                  {/* End Mainmanu Nav */}
                </nav>
              </div>
            </div>
            <div className="header-right">
              <div className="setting-option d-none d-lg-block">
                <form className="search-form-wrapper" action="#">
                  <input
                    type="search"
                    placeholder="Search Here"
                    aria-label="Search"
                  />
                  <div className="search-icon">
                    <button>
                      <i className="feather-search" />
                    </button>
                  </div>
                </form>
              </div>
              <div className="setting-option rn-icon-list d-block d-lg-none">
                <div className="icon-box search-mobile-icon">
                  <button>
                    <i className="feather-search" />
                  </button>
                </div>
                <form
                  id="header-search-1"
                  action="#"
                  method="GET"
                  className="large-mobile-blog-search"
                >
                  <div className="rn-search-mobile form-group">
                    <button type="submit" className="search-button">
                      <i className="feather-search" />
                    </button>
                    <input type="text" placeholder="Search ..." />
                  </div>
                </form>
              </div>
              {
                sessionStorage.getItem('isLoggedIn') === 'true' ? (
                  <div className="setting-option header-btn rbt-site-header" id="rbt-site-header">
                    <div className="icon-box">
                      <Link to="/Wallet" id="connectbtn" className="btn btn-primary-alta btn-small">
                        Wallet
                      </Link>
                    </div>
                  </div>
                ) : null // Added null for the case when the condition is false
              }
              <div className="setting-option rn-icon-list notification-badge">
                <div className="icon-box">
                  <Link to="activity.html">
                    <i className="feather-bell" />
                    <span className="badge">6</span>
                  </Link>
                </div>
              </div>
              <div className="header_admin" id="header_admin">
                <div className="setting-option rn-icon-list user-account">
                  <div className="icon-box">
                    <Link to="author.html">
                      <img
                        src="/assets/images/icons/boy-avater.png"
                        alt="Images"
                      />
                    </Link>
                    <div className="rn-dropdown">
                      <div className="rn-inner-top">
                        <h4 className="title">
                          <Link to="product-details.html">
                            Christopher William
                          </Link>
                        </h4>
                        <span>
                          <Link to="#">Set Display Name</Link>
                        </span>
                      </div>
                      <div className="rn-product-inner">
                        <ul className="product-list">
                          <li className="single-product-list">
                            <div className="thumbnail">
                              <Link to="product-details.html">
                                <img
                                  src="/assets/images/portfolio/portfolio-07.jpg"
                                  alt="Nft Product Images"
                                />
                              </Link>
                            </div>
                            <div className="content">
                              <h6 className="title">
                                <Link to="product-details.html">Balance</Link>
                              </h6>
                              <span className="price">25 ETH</span>
                            </div>
                            <div className="button" />
                          </li>
                          <li className="single-product-list">
                            <div className="thumbnail">
                              <Link to="product-details.html">
                                <img
                                  src="/assets/images/portfolio/portfolio-01.jpg"
                                  alt="Nft Product Images"
                                />
                              </Link>
                            </div>
                            <div className="content">
                              <h6 className="title">
                                <Link to="product-details.html">Balance</Link>
                              </h6>
                              <span className="price">25 ETH</span>
                            </div>
                            <div className="button" />
                          </li>
                        </ul>
                      </div>
                      <div className="add-fund-button mt--20 pb--20">
                        <Link
                          className="btn btn-primary-alta w-100"
                          href="connect.html"
                        >
                          Add Your More Funds
                        </Link>
                      </div>

                      {isAuthenticated && (
                        <>

                          <li>
                            <Link to="author.html">My Profile</Link>
                          </li>
                          <li>
                            <Link to="edit-profile.html">Edit Profile</Link>
                          </li>
                          <li>
                            <Link to="connect.html">Manage funds</Link>
                          </li>
                          <li>
                            <Link to="/LogOut">Sign Out</Link>
                          </li>

                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="setting-option mobile-menu-bar d-block d-xl-none">
                <div className="hamberger">
                  <button className="hamberger-button">
                    <i className="feather-menu" />
                  </button>
                </div>
              </div>
              {/* Show if logged in */}
              {
                sessionStorage.getItem('isLoggedIn') === 'true' ? (
                  <>
                    <div className="userProfile setting-option">
                      <ul style={{ listStyle: 'none', padding: '0' }}>
                        <li className="with-megamenu">
                          <Link to="/UserProfile" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <User size={28} color="gray" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <span style={{ paddingLeft: '15px' }}>
                      <Link onClick={handleLogoutSession} to="/">Logout</Link>
                    </span>
                  </>
                ) : (
                  <span>
                    <Link to="/Login">Login</Link>
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </header>

      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo logo-custom-css">
              <Link className="logo-light" href="index.html">
                <img src="/assets/images/logo/logo-white.png" alt="nft-logo" />
              </Link>
              <Link className="logo-dark" href="index.html">
                <img src="/assets/images/logo/logo-dark.png" alt="nft-logo" />
              </Link>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="feather-x" />
              </button>
            </div>
          </div>
          <nav>
            {/* Start Mainmanu Nav */}
            <ul className="mainmenu">
              <li className="has-droupdown">
                <Link className="nav-link its_new" href="#">
                  Home
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="index.html">
                      Home page - 01 <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-two.html">
                      Home page - 02
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-three.html">
                      Home page - 03
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-four.html">
                      Home page - 04
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-five.html">
                      Home page - 05
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-six.html">
                      Home page - 06
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-seven.html">
                      Home page - 07
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-eight.html">
                      Home page - 08
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-nine.html">
                      Home page - 09
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-ten.html">
                      Home page - 10
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-eleven.html">
                      Home page - 11
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-twelve.html">
                      Home page - 12
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-thirteen.html">
                      Home page - 13
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-fourteen.html">
                      Home page - 14
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-fifteen.html">
                      Home page - 15
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-sixteen.html">
                      Home page - 16
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-seventeen.html">
                      Home page - 17
                      <i className="feather-home" />
                    </Link>
                  </li>
                  <li>
                    <Link to="index-eighteen.html">
                      Home page - 18
                      <i className="feather-home" />
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/About">About</Link>
              </li>
              <li className="has-droupdown">
                <Link className="nav-link its_new" href="#">
                  Explore
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="explore-one.html">
                      Explore Filter
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-two.html">
                      Explore Isotop
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-three.html">
                      Explore Carousel
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-four.html">
                      Explore Simple
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-five.html">
                      Explore Place Bid
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-six.html">
                      Place Bid With Filter
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-seven.html">
                      Place Bid With Isotop
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-eight.html">
                      Place Bid With Carousel
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-list-style.html">
                      Explore Style List
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-list-column-two.html">
                      Explore List Col-Two
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="explore-left-filter.html">
                      Explore Left Filter
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link className="live-expo" href="explore-live.html">
                      Live Explore
                    </Link>
                  </li>
                  <li>
                    <Link className="live-expo" href="explore-live-two.html">
                      Live Explore Carouselwith-meEx
                    </Link>
                  </li>
                  <li>
                    <Link className="live-expo" href="explore-live-three.html">
                      Live With Place Bid
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="with-megamenu">
                <Link className="nav-link its_new" href="#">
                  Pages
                </Link>
                <div className="rn-megamenu">
                  <div className="wrapper">
                    <div className="row row--0">
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          <li>
                            <Link to="create.html">
                              Create NFT
                              <i data-feather="file-plus" />
                            </Link>
                          </li>
                          <li>
                            <Link to="upload-variants.html">
                              Upload Type
                              <i data-feather="layers" />
                            </Link>
                          </li>
                          <li>
                            <Link to="activity.html">
                              Activity
                              <i data-feather="activity" />
                            </Link>
                          </li>
                          <li>
                            <Link to="creator.html">
                              Creators
                              <i data-feather="users" />
                            </Link>
                          </li>
                          <li>
                            <Link to="collection.html">
                              Our Collection
                              <i data-feather="package" />
                            </Link>
                          </li>
                          <li>
                            <Link to="upcoming_projects.html">
                              Upcoming Projects
                              <i data-feather="loader" />
                            </Link>
                          </li>
                          <li>
                            <Link to="create-collection.html">
                              Create Collection
                              <i data-feather="edit-3" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          {!isAuthenticated && (
                            <>
                              <li>
                                <Link to="/Login">
                                  Log In <i data-feather="log-in" />
                                </Link>
                              </li>
                              <li>
                                <Link to="/SignUp">
                                  Registration <i data-feather="user-plus" />
                                </Link>
                              </li>
                              <li>
                                <Link to="forget.html">
                                  Forget Password <i data-feather="key" />
                                </Link>
                              </li>
                            </>
                          )}

                          <li>
                            <Link to="connect.html">
                              Connect to Wallet <i data-feather="pocket" />
                            </Link>
                          </li>
                          <li>
                            <Link to="privacy-policy.html">
                              Privacy Policy <i data-feather="file-text" />
                            </Link>
                          </li>
                          <li>
                            <Link to="newsletter.html">
                              Newsletter
                              <i data-feather="book-open" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          <li>
                            <Link to="product.html">
                              Product
                              <i data-feather="folder" />
                            </Link>
                          </li>
                          <li>
                            <Link to="product-details.html">
                              Product Details <i data-feather="layout" />
                            </Link>
                          </li>
                          <li>
                            <Link to="ranking.html">
                              NFT Ranking
                              <i data-feather="trending-up" />
                            </Link>
                          </li>
                          <li>
                            <Link to="blog.html">
                              Our News <i data-feather="message-square" />
                            </Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">
                              Blog Details
                              <i data-feather="book-open" />
                            </Link>
                          </li>
                          <li>
                            <Link to="404.html">
                              404 <i data-feather="alert-triangle" />
                            </Link>
                          </li>
                          <li>
                            {/* <Link to ="/Activity_pages">
                        Forum &amp; Community
                        <i data-feather="message-circle" />
                      </Link> */}
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-3 single-mega-item">
                        <ul className="mega-menu-item">
                          <li>
                            <Link to="/About">
                              About Us
                              <i data-feather="award" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/Contact">
                              Contact <i data-feather="headphones" />
                            </Link>
                          </li>
                          <li>
                            <Link to="support.html">
                              Support/FAQ <i data-feather="help-circle" />
                            </Link>
                          </li>
                          <li>
                            <Link to="terms-condition.html">
                              Terms &amp; Condition <i data-feather="list" />
                            </Link>
                          </li>
                          <li>
                            <Link to="coming-soon.html">
                              Coming Soon <i data-feather="clock" />
                            </Link>
                          </li>
                          <li>
                            <Link to="maintenance.html">
                              Maintenance <i data-feather="cpu" />
                            </Link>
                          </li>
                          <li>
                            <Link to="Activity_pages">
                              Forum Details <i data-feather="message-circle" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="has-droupdown has-menu-child-item">
                <Link className="nav-link its_new" href="blog.html">
                  Blog
                </Link>
                <ul className="submenu">
                  <li>
                    <Link to="blog-single-col.html">
                      Blog Single Column
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="blog-col-two.html">
                      Blog Two Column
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="blog-col-three.html">
                      Blog Three Column
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="blog.html">
                      Blog Four Column
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                  <li>
                    <Link to="blog-details.html">
                      Blog Details
                      <i className="feather-fast-forward" />
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/About">Contact</Link>
              </li>
            </ul>
            {/* End Mainmanu Nav */}
          </nav>
        </div>
      </div>

      {/* Scroll to top */}
      <div class="mouse-cursor cursor-outer"></div>
      <div class="mouse-cursor cursor-inner"></div>
      <div class="rn-progress-parent">
        <svg
          class="rn-back-circle svg-inner"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      {/* End Header Area */}
    </div>
  );

};
export default Header;
