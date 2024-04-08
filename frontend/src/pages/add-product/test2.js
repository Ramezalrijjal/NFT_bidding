import React, { useState, useEffect } from "react";
import axios from "../../components/axios";
import sal from "sal.js";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000/api/categories";
  const productApiUrl = "http://127.0.0.1:8000/api/products";
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [fileimage, setPhoto] = useState("");
  const csrfToken = window.csrfToken;

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    user_id: 1,
    image: "",
    description: "",
    min_target: "",
    timer: "",
    highest_bid: 0,
    status: 1,
    winning_user: null,
  });

  const [data, setData] = useState([]); // Initialize an empty array for data
  const [submissionStatus, setSubmissionStatus] = useState(""); // Track submission status

  useEffect(() => {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken; // Remove the curly braces and quotes

    sal();
  }, []);

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
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const uploadProduct = async () => {
    console.log(fileimage);
    const formData = new FormData();
    formData.append("name", product);
    formData.append("description", product);
    formData.append("category_id", product);
    formData.append("user_id", product);
    formData.append("timer", product);
    formData.append("highest_bid", product);
    formData.append("status", product);
    formData.append("winning_user", product);
    formData.append("image", fileimage);
    const responce = await axios.post(productApiUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (responce) {
      console.log(responce);
      setMessage(responce.message); //"message": "Product successfully created."
      setTimeout(() => {
        navigate("/AddProduct");
      }, 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const csrfToken = window.csrfToken;
  //     const csrfResponse = await axios.get("/get-csrf-token");
  //     console.log(product.name);
  //     console.log(product.category);
  //     console.log(product.description);
  //     console.log(product.min_target);
  //     console.log(product.timer);
  //     console.log(csrfToken);
  //     console.log(csrfResponse);

  //     axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  //     const response = await axios.post(productApiUrl, {
  //       _token: csrfToken, // Include the CSRF token here
  //       name: product.name,
  //       category_id: product.category,
  //       image: imageURL,
  //       description: product.description,
  //       min_target: product.min_target,
  //       timer: product.timer,
  //       user_id: 2, // Replace with the actual user_id
  //       highest_bid: 0,
  //       status: 1,
  //       winning_user: null,
  //     });

  //     console.log("Product data to be sent:", response);

  //     setProduct({
  //       name: "",
  //       category_id: "",
  //       user_id: "",
  //       image: "",
  //       description: "",
  //       min_target: "",
  //       timer: "",
  //       highest_bid: "",
  //       status: "",
  //       winning_user: "",
  //     });
  //     setSubmissionStatus("success");
  //     console.log(response.data);
  //   } catch (e) {
  //     setSubmissionStatus("failure");
  //     console.log(e);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="_token" value="{{ csrf_token() }}" />
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
                      value={product.name}
                      onChange={handleInputChange}
                      placeholder="e.g. 'Digital Awesome Game'"
                    />
                  </div>
                </div>
                <div className="col-lg-12"></div>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleInputChange}
                >
                  {data.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="collection-single-wized">
                  <label className="title">Category</label>
                </div>

                <div className="col-md-12">
                  <div className="input-box pb--20">
                    <label htmlFor="Discription" className="form-label">
                      Discription
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={product.description}
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
                      value={product.min_target}
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
                      value={product.timer}
                      onChange={handleInputChange}
                    />
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
    </form>
  );
}
