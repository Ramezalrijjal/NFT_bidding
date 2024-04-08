import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddProduct() {
  const apiUrl = "http://127.0.0.1:8000/api/categories";
  const productApiUrl = "http://127.0.0.1:8000/api/products";

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    min_target: "",
    timer: "",
  });

  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [categories, setCategories] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [data, setData] = useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ]);

  // useEffect(() => {
  //   let token = document.head.querySelector('meta[name="csrf-token"]');
  //   if (token) {
  //     axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
  //   } else {
  //     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
  //   }
  // }, []);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(productApiUrl, data);
      console.log(response.data);
      setSubmissionStatus("success"); // Set success status
      // Optionally reset the form or perform any other actions after successful save
    } catch (error) {
      console.error("Error saving product:", error);
      setSubmissionStatus("failure"); // Set failure status
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    const productData = {
      name: formData.name,
      category_id: formData.category,
      user_id: 2, // Replace with the actual user_id
      image: imageURL,
      description: formData.description,
      min_target: formData.min_target,
      timer: formData.timer,
    };

    console.log("Product data to be sent:", productData);

    postData(productData); // Call the postData function to post data
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {/* create new product area */}
        <div className="create-area rn-section-gapTop">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-3 offset-1 ml_md--0 ml_sm--0">
                {/* file upload area */}
                <div className="brows-file-wrapper">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setImageURL(imageUrl);
                      }
                    }}
                  />

                  <img
                    src={imageURL}
                    alt="Uploaded Image"
                    data-black-overlay={6}
                  />
                </div>
                <div className="upload-area">
                  {/* <div className="upload-formate mb--30">
                  <h6 className="title">Upload file</h6>
                  <p className="formate">Drag or choose your file to upload</p>
                </div> */}
                </div>
                {/* end upoad file area */}
                {/* <div className="mt--100 mt_sm--30 mt_md--30 d-none d-lg-block">
            <h5> Note: </h5>
            <span>
              {" "}
              Service fee : <strong>2.5%</strong>{" "}
            </span>{" "}
            <br />
            <span>
              {" "}
              You will receive : <strong>25.00 ETH $50,000</strong>
            </span>
          </div> */}
              </div>
              <div className="col-lg-7">
                <div className="form-wrapper-one">
                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. 'Digital Awesome Game'"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="collection-single-wized">
                      <label className="title">Category</label>
                      <div className="create-collection-input">
                        <div className="nice-select mb--30" tabIndex={0}>
                          <span className="current">Collectibles</span>
                          <ul className="list">
                            <li
                              data-value="Art"
                              data-display="Art"
                              className="option focus"
                            >
                              Art
                            </li>
                            <li data-value={1} className="option selected">
                              Collectibles
                            </li>
                            <li data-value={2} className="option">
                              Music
                            </li>
                            <li data-value={4} className="option">
                              Sports
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                    <div className="collection-single-wized">
                      <label className="title">Category</label>
                      <div className="create-collection-input">
                        <div className="nice-select custom-dropdown">
                          <span className="current">
                            {formData.category
                              ? data.find(
                                  (category) =>
                                    category.id === formData.category
                                ).name
                              : "Select a category"}
                          </span>
                          <ul className="list">
                            {data.map((category) => (
                              <li
                                key={category.id}
                                onClick={() =>
                                  setFormData({
                                    ...formData,
                                    category: category.id,
                                  })
                                }
                                className="option"
                              >
                                {category.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="Discription" className="form-label">
                        Discription
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="e.g. 'After purchasing the product you can get...'"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-box pb--20">
                      <label htmlFor="dollerValue" className="form-label">
                        Minimum Target Price in $
                      </label>
                      <input
                        id="min_target"
                        name="min_target"
                        value={formData.min_target}
                        onChange={handleInputChange}
                        placeholder="e.g. '20$'"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-box pb--20">
                      <label htmlFor="Royality" className="form-label">
                        End date
                      </label>
                      <input
                        type="date"
                        id="timer"
                        name="timer"
                        value={formData.timer}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-xl-4">
                    <div className="input-box">
                      <button
                        type="button"
                        className="btn btn-primary-alta btn-large w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#uploadModal"
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
                    <div className="input-box">
                      <button
                        type="submit"
                        className="btn btn-primary btn-large w-100"
                      >
                        Submit Item
                      </button>
                    </div>
                  </div>
                  {submissionStatus === "success" && (
                    <div className="success-message">
                      Product was successfully created.
                    </div>
                  )}
                  {submissionStatus === "failure" && (
                    <div className="error-message">
                      Error creating the product. Please try again.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* create new product area */}
        {/* Modal */}
        {/* <div
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
        </div> */}
      </form>
    </>
  );
}
