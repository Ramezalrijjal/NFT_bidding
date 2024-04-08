import React from "react";

function statics() {
  returen(
    <>
      {/* <!-- start page title area --> */}
      <div className="rn-breadcrumb-inner ptb--30">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <h5 className="title text-center text-md-start">Forum Details</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <ul className="breadcrumb-list">
                <li className="item">
                  <a href="index.html">Home</a>
                </li>
                <li className="separator">
                  <i className="feather-chevron-right"></i>
                </li>
                <li className="item current">Forum Details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end page title area --> */}

      <div className="forum-top rn-section-gap bg-color--1">
        <div className="container">
          <div className="row g-5 align-items-center d-flex">
            <div className="col-lg-6 offset-lg-3">
              <div className="forum-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Hear..."
                    aria-label="Recipient's username"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary-alta btn-outline-secondary"
                      type="button"
                    >
                      Search Hear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default statics;
