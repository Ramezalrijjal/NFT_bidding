import React, { useState, useEffect } from 'react';
import sal from 'sal.js';

export default function About() {
    useEffect(() => {
        sal();
    }, []);
    return(
        <>
  {/* About banner area */}
  <div className="rn-about-banner-area rn-section-gapTop">
    <div className="container mb--30">
      <div className="row">
        <div className="col-12">
          <h2
            className="title about-title-m"
            // data-sal="slide-up"
            data-sal-duration={800}
            data-sal-delay={150}
          >
            Direct Teams. <br />
            For Your Dadicated Dreams
          </h2>
        </div>
      </div>
    </div>
    <div className="container-fluid about-fluidimg ">
      <div className="row">
        <div className="img-wrapper">
          <div style={{backgroundImage: 'url("assets/images/contact/bg-image-22.jpg")'}} className="bg_image--22 bg_image"></div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          <div className="h--100">
            <div className="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
              <div className="inner">
                <h2
                  className="title"
                  data-sal="slide-up"
                  data-sal-duration={800}
                  data-sal-delay={150}
                >
                  Why We Do This
                </h2>
                <p
                  className="about-disc"
                  data-sal="slide-up"
                  data-sal-duration={800}
                  data-sal-delay={150}
                >
                  NFTs are virtual tokens that represent ownership of something
                  inherently distinct and scarce, whether it be a physical or
                  digital item, such as artwork, a soundtrack, a collectible, an
                  in-game item or real estate. Unlike regular cryptocurrencies
                  like bitcoin or fiat money like the U.S.
                </p>
                <a
                  href="blog.html"
                  className="btn btn-primary-alta btn-large sal-animate mt--20"
                  data-sal="slide-up"
                  data-sal-duration={800}
                  data-sal-delay={150}
                >
                  See Our Blog
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="rn-about-card transparent-bg">
            <div className="inner">
              <h3
                className="title"
                data-sal="slide-up"
                data-sal-duration={800}
                data-sal-delay={150}
              >
                Helping You <br />
                Grow In Every Stage.
              </h3>
              <p
                className="about-disc mb--0"
                data-sal="slide-up"
                data-sal-duration={800}
                data-sal-delay={150}
              >
                NFTs are virtual tokens that represent ownership of something
                inherently distinct and scarce, whether it be a physical or
                digital item, such as artwork, a soundtrack, a collectible, an
                in-game item or real estate. Unlike regular cryptocurrencies
                like bitcoin or fiat money like the U.S.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About banner area End */}
  <div className="rn-about-Quote-area rn-section-gapTop">
    <div className="container">
      <div className="row g-5 d-flex align-items-center">
        <div className="col-lg-6">
          <div className="rn-about-title-wrapper">
            <h3
              className="title"
              data-sal="slide-up"
              data-sal-duration={800}
              data-sal-delay={150}
            >
              Create, Sell well &amp; Collect your Wonderful NFTs at Nuron Very
              Fast
            </h3>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            className="rn-about-wrapper"
            data-sal="slide-up"
            data-sal-duration={800}
            data-sal-delay={150}
          >
            <p>
              The NFTs is a one-trick pony that climbed the ladders of success
              in recent years. The growth of NFTs is tremendous, and according
              to Pymnts.com, the total sales volume of NFTs has nearly crossed
              $2.5 billion in the last six months of . Surprisingly, the total
              sales volume of NFTs was $13.7 million in 2020. On comparing both
              the values,
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rn stastic area */}
  <div className="rn-statistick-area rn-section-gapTop">
    <div className="container">
      <div className="row mb--30">
        <div className="col-12 text-center">
          <h3>Nuron Statistics</h3>
        </div>
      </div>
      <div className="row g-5">
        <div className="offset-lg-2 col-lg-4 col-md-6">
          <div className="single-counter-up text-center">
            <h3 className="counter">
              <span className="odometer" data-count={309}>
                60
              </span>
            </h3>
            <div className="botton-title">Nuron All NFT's</div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-counter-up text-center">
            <h3 className="counter">
              <span className="odometer" data-count={508}>
                44
              </span>
            </h3>
            <div className="botton-title">All Creators</div>
          </div>
        </div>
        <div className="offset-lg-2 col-lg-4 col-md-6">
          <div className="single-counter-up text-center">
            <h3 className="counter">
              <span className="odometer" data-count={1032}>
                20
              </span>
            </h3>
            <div className="botton-title">Nuron Earning</div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="single-counter-up text-center">
            <h3 className="counter">
              <span className="odometer" data-count={650}>
                10
              </span>
            </h3>
            <div className="botton-title">Level One Seller</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* rn stastic area */}
  {/* call to action area */}
  <div className="rn-callto-action rn-section-gapTop">
    <div className="container-fluid about-fluidimg-cta">
    
      <div className="row">
        <div className="col-lg-12">
       
          <div
            className="bg_image--6 bg_image bg-image-border"
            style={{backgroundImage: 'url("assets/images/contact/bg-image-6.jpg")'}}
            data-black-overlay={7}
          >
             
            <div className="row">
            
              <div className="col-lg-12">
                <div className="call-to-action-wrapper">
                  <h3
                    data-sal="slide-up"
                    data-sal-duration={800}
                    data-sal-delay={150}
                  >
                    Discover rare digital art <br />
                    and collect NFTs
                  </h3>
                  <p
                    data-sal="slide-up"
                    data-sal-duration={800}
                    data-sal-delay={150}
                  >
                    The NFTs is a one-trick pony that climbed the recent years.
                    The growth of NFTs is tremendous, and according to
                    Pymnts.com, the total sales volume{" "}
                  </p>
                  <div
                    className="callto-action-btn-wrapper"
                    data-sal="slide-up"
                    data-sal-duration={800}
                    data-sal-delay={150}
                  >
                    <a href="create.html" className="btn btn-primary btn-large">
                      Create
                    </a>
                    <a
                      href="contact.html"
                      className="btn btn-primary-alta btn-large"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* call to action area End */}
  {/* Start BLog Area  */}
  <div className="rn-blog-area rn-section-gapTop">
    <div className="container">
      <div className="row mb--50 align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
          <h3
            className="title mb--0"
            data-sal-delay={150}
            data-sal="slide-up"
            data-sal-duration={800}
          >
            Our Recent Blog
          </h3>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
          <div
            className="view-more-btn text-start text-sm-end"
            data-sal-delay={150}
            data-sal="slide-up"
            data-sal-duration={800}
          >
            <a className="btn-transparent" href="#">
              VIEW ALL
              <i data-feather="arrow-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="row g-5">
        {/* start single blog */}
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-12"
          data-sal="slide-up"
          data-sal-duration={800}
          data-sal-delay={150}
        >
          <div
            className="rn-blog"
            data-toggle="modal"
            data-target="#exampleModalCenters"
          >
            <div className="inner">
              <div className="thumbnail">
                <a href="blog-details.html">
                  <img
                    src="assets/images/blog/blog-02.jpg"
                    alt="Personal Portfolio Images"
                  />
                </a>
              </div>
              <div className="content">
                <div className="category-info">
                  <div className="category-list">
                    <a href="blog-details.html">Development</a>
                  </div>
                  <div className="meta">
                    <span>
                      <i className="feather-clock" /> 2 hour read
                    </span>
                  </div>
                </div>
                <h4 className="title">
                  <a href="blog-details.html">
                    The services provide for design{" "}
                    <i className="feather-arrow-up-right" />
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* end single blog */}
        {/* start single blog */}
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-12"
          data-sal="slide-up"
          data-sal-duration={800}
          data-sal-delay={200}
        >
          <div
            className="rn-blog"
            data-toggle="modal"
            data-target="#exampleModalCenters"
          >
            <div className="inner">
              <div className="thumbnail">
                <a href="blog-details.html">
                  <img
                    src="assets/images/blog/blog-03.jpg"
                    alt="Personal Portfolio Images"
                  />
                </a>
              </div>
              <div className="content">
                <div className="category-info">
                  <div className="category-list">
                    <a href="blog-details.html">Design</a>
                  </div>
                  <div className="meta">
                    <span>
                      <i className="feather-clock" /> 5 min read
                    </span>
                  </div>
                </div>
                <h4 className="title">
                  <a href="blog-details.html">
                    More important feature for designer
                    <i className="feather-arrow-up-right" />
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* end single blog */}
        {/* start single blog */}
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-12"
          data-sal="slide-up"
          data-sal-duration={800}
          data-sal-delay={250}
        >
          <div
            className="rn-blog"
            data-toggle="modal"
            data-target="#exampleModalCenters"
          >
            <div className="inner">
              <div className="thumbnail">
                <a href="blog-details.html">
                  <img
                    src="assets/images/blog/blog-04.jpg"
                    alt="Personal Portfolio Images"
                  />
                </a>
              </div>
              <div className="content">
                <div className="category-info">
                  <div className="category-list">
                    <a href="blog-details.html">Marketing</a>
                  </div>
                  <div className="meta">
                    <span>
                      <i className="feather-clock" /> 10 min read
                    </span>
                  </div>
                </div>
                <h4 className="title">
                  <a href="blog-details.html">
                    Inavalide purpose classes &amp; motivation.
                    <i className="feather-arrow-up-right" />
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* end single blog */}
        {/* start single blog */}
        <div
          className="col-xl-3 col-lg-4 col-md-6 col-12"
          data-sal="slide-up"
          data-sal-duration={800}
          data-sal-delay={300}
        >
          <div
            className="rn-blog"
            data-toggle="modal"
            data-target="#exampleModalCenters"
          >
            <div className="inner">
              <div className="thumbnail">
                <a href="blog-details.html">
                  <img
                    src="assets/images/blog/blog-05.jpg"
                    alt="Personal Portfolio Images"
                  />
                </a>
              </div>
              <div className="content">
                <div className="category-info">
                  <div className="category-list">
                    <a href="blog-details.html">NFT's</a>
                  </div>
                  <div className="meta">
                    <span>
                      <i className="feather-clock" /> 1 min read
                    </span>
                  </div>
                </div>
                <h4 className="title">
                  <a href="blog-details.html">
                    Canada is a great fact for NFT's
                    <i className="feather-arrow-up-right" />
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* end single blog */}
      </div>
    </div>
  </div>
  {/* End BLog Area  */}
</>

    );
}