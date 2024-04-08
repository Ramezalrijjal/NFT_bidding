import React, { useEffect } from 'react';
import sal from 'sal.js';

function Banner() {
  useEffect(() => {
    sal();
  }, []); 

  return (
    <div>
      <div className="banner-area banner-16 pt--100 pb--120 pt_md--70 pt_sm--30 pb_md--90 pb_sm--50 bg-color--2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 order-lg-1 order-md-2 order-sm-2 order-2">
              <div className="left-banner-16-wrapepr mt_md--100 mt_sm--100">
                <h1 className="title">
                  Buy and sell digital art,
                  <br />
                  <span> NFT,s collection</span>
                </h1>
                <p className="disc" style={{ marginLeft: '15%' }}>
                  There is enough digital artworks available online to help you put
                  together a cryptocurrency website.
                </p>
                <div className="button-group d-flex flex-wrap">
                <a className="btn btn-large btn-primary mr--30" href="#" style={{ marginLeft: '25%' }}>

                    Buy Now
                  </a>
                  <a className="btn btn-large btn-primary-alta" href="#">
                    Sell Now
                  </a>
                </div>
                <div className="odometer-area-slide" style={{ marginLeft: '20%' }}>
                  <div
                    className="single-odometer"
                    data-sal-delay={400}
                    data-sal="slide-left"
                    data-sal-duration={800}
                  >
                    <h3 className="counter">
                      <span className="odometer" data-count={3091}>
                        40
                      </span>
                      <span className="counter-label">Collectibles</span>
                    </h3>
                  </div>
                  <div
                    className="single-odometer"
                    data-sal-delay={600}
                    data-sal="slide-left"
                    data-sal-duration={800}
                  >
                    <h3 className="counter">
                      <span className="odometer" data-count={1020}>
                        33
                      </span>
                      <span className="counter-label">Auctions</span>
                    </h3>
                  </div>
                  <div
                    className="single-odometer"
                    data-sal-delay={800}
                    data-sal="slide-left"
                    data-sal-duration={800}
                  >
                    <h3 className="counter">
                      <span className="odometer" data-count={5329}>
                        83
                      </span>
                      <span className="counter-label">NFT Artist</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-2 order-md-1 order-sm-1 order-1">
              <div className="tilt-image-banner-16">
                <img
                  className="tilt"
                  src="https://rainbowit.net/html/nuron/assets/images/banner/banner-06.png"
                  alt="Nft-profile"
                />
                <div className="joined-people-wrapper">
                  <div className="product-share-wrapper">
                    <div className="profile-share">
                      <a
                        href="author.html"
                        className="avatar"
                        data-tooltip="Mark Jordan"
                        tabIndex={0}
                      >
                        <img
                          className="large"
                          src="https://rainbowit.net/html/nuron/assets/images/client/client-2.png"
                          alt="Nft_Profile"
                        />
                      </a>
                      <a
                        href="author.html"
                        className="avatar"
                        data-tooltip="Mark"
                        tabIndex={0}
                      >
                        <img
                          className="large"
                          src="https://rainbowit.net/html/nuron/assets/images/client/client-3.png"
                          alt="Nft_Profile"
                        />
                      </a>
                      <a
                        href="author.html"
                        className="avatar"
                        data-tooltip="Jordan"
                        tabIndex={0}
                      >
                        <img
                          className="large"
                          src="https://rainbowit.net/html/nuron/assets/images/client/client-5.png"
                          alt="Nft_Profile"
                        />
                      </a>
                      
                      <a className="more-author-text" href="#" tabIndex={0}>
                        More Than 25K
                      </a>
                    </div>
                  </div>
                  <p className="disc">
                    Millions of people are selling their NFTs in Nuron marketplaces.
                    Create &amp; Sell Your NFTs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
