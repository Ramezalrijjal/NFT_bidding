import React, {useState, useEffect} from 'react'
import useApiData from '../../hooks/fetchAPI'
import { data } from 'jquery';
import { Link, useParams  } from 'react-router-dom';
import CountdownTimer from '../../hooks/countDownTimer';
import axios from '../../components/axios';


export default function Products() {

  const { id } = useParams();

  const productsAPI = `/categories/${id}/products`;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to the products API
    axios.get(productsAPI)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products: ", error);
      });
  }, [productsAPI]);

  return (

    <div>
  {/* start page title area */}
  <div className="rn-breadcrumb-inner ptb--30">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-12">
          <h5 className="title text-center text-md-start">Our Product</h5>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <ul className="breadcrumb-list">
            <li className="item">
              <a href="index.html">Home</a>
            </li>
            <li className="separator">
              <i className="feather-chevron-right" />
            </li>
            <li className="item current">Our Product</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* end page title area */}
  {/* Start product area */}
  <div className="rn-product-area rn-section-gapTop">
    <div className="container">
      <div className="row mb--50 align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <h3
            className="title text-left mb--0"
            data-sal-delay={150}
            data-sal=""
            data-sal-duration={800}
            style={{textAlign: 'left'}}
          >
            Explore Product
          </h3>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
          <div
            className="view-more-btn text-start text-sm-end"
            data-sal-delay={150}
            data-sal=""
            data-sal-duration={800}
          >
          </div>
        </div>
      </div>
      {/* <div className="default-exp-wrapper default-exp-expand" style={{display: 'block'}}>
        <div className="inner">
          <div className="filter-select-option">
            <label className="filter-leble">LIKES</label>
            <select>
              <option data-display="Most liked">Most liked</option>
              <option value={1}>Least liked</option>
            </select>
          </div>
          <div className="filter-select-option">
            <label className="filter-leble">Category</label>
            <select>
              <option data-display="Category">Category</option>
              <option value={1}>Art</option>
              <option value={1}>Photograph</option>
              <option value={2}>Metaverses</option>
              <option value={4}>Potato</option>
              <option value={4}>Photos</option>
            </select>
          </div>
          <div className="filter-select-option">
            <label className="filter-leble">Collections</label>
            <select>
              <option data-display="Collections">Collections</option>
              <option value={1}>BoredApeYachtClub</option>
              <option value={2}>MutantApeYachtClub</option>
              <option value={4}>Art Blocks Factory</option>
            </select>
          </div>
          <div className="filter-select-option">
            <label className="filter-leble">Sale type</label>
            <select>
              <option data-display="Sale type">Sale type</option>
              <option value={1}>Fixed price</option>
              <option value={2}>Timed auction</option>
              <option value={4}>Not for sale</option>
              <option value={4}>Open for offers</option>
            </select>
          </div>
          <div className="filter-select-option">
            <label className="filter-leble">Price Range</label>
            <div className="price_filter s-filter clear">
              <form action="#" method="GET">
                <div id="slider-range" />
                <div className="slider__range--output">
                  <div className="price__output--wrap">
                    <div className="price--output">
                      <span>Price :</span>
                      <input type="text" id="amount" readOnly="" />
                    </div>
                    <div className="price--filter">
                      <a className="btn btn-primary btn-small" href="#">
                        Filter
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
      <div className="row g-5">
        {/* start single product */}
        {
        products.map((product) => {
          // Print all the products if their status are not false
          if(product.status) {
            let targetDate = product.timer;
            return (
              <div
                data-sal=""
                data-sal-delay={150}
                data-sal-duration={800}
                className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
              >
                <div className="product-style-one no-overlay">
                  <div className="card-thumbnail">
                    <Link to={`/ProductDetails/${product.id}`}>
                      <img
                        src={`http://127.0.0.1:8000/assets/images/${product.image}`}
                        alt="NFT_portfolio"
                      />
                    </Link>
                  </div>
                  <div className="product-share-wrapper">
                    {/* ... (your other code) */}
                  </div>
                  <a href="product-details.html">
                    <span className="product-name">{product.name}</span>
                  </a>
                  <span className="latest-bid">Highest bid: ${product.highest_bid}</span>
                  <div className="bid-react-area">
                  </div>
                  <CountdownTimer targetDate={targetDate} productName={product.id} />
                </div>
              </div>
            );
          }
        })
      }
        {/* end single product */}
      </div>
    </div>
  </div>
  {/* end product area */}
    </div>
  )
}
