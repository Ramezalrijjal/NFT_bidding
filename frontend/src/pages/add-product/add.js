import React, { useState, useEffect } from "react";
import axios from "../../components/axios";
import sal from "sal.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const apiUrl = "http://127.0.0.1:8000/api/categories";
  const productApiUrl = "http://127.0.0.1:8000/api/products";
  const [loading, setLoading] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [fileImage, setFileImage] = useState(null); // Use setFileImage to store the image file
  const csrfToken = window.csrfToken;

  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    category_id: 1,
    image: "",
    description: "",
    min_target: "",
    timer: "",
    highest_bid: 0,
    status: 1,
    winning_user: null,
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const csrfResponse = await axios.get("/get-csrf-token");
  //       const csrfToken = csrfResponse.data.csrf_token;
  //       axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  //       const response = await axios.get("/products");
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);
  // console.log(typeof product.category_id);

  const [data, setData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    }
  };

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("min_target", product.min_target);
    formData.append("category_id", product.category_id);
    formData.append("user_id", userData.id);
    formData.append("timer", product.timer);
    formData.append("highest_bid", product.highest_bid);
    formData.append("status", product.status);
    formData.append("winning_user", product.winning_user);
    formData.append("image", product.image); // Use fileImage here

    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.csrf_token;
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

      const response = await axios.post("/products", formData);
      alert("Product added successfully!");
      navigate("/UserProfile"); // Replace "/profile" with the actual URL of your profile page

      // Reset your form or navigate to another page
    } catch (error) {
      console.error("API request error:", error);
      // Handle the error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };
  console.log("Image URL:", imageURL);

  const handleImage = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };
  const handleCategorySelect = (categoryId) => {
    // Update the selected category in your component's state
    setProduct({
      ...product,
      category_id: categoryId,
    });
  };

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
                <input type="file" name="image" onChange={handleImage} />
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

                <div className="col-lg-12">
                  <div className="collection-single-wized">
                    <label className="title">Category</label>
                    <div className="create-collection-input">
                      <div className="nice-select mb--30" tabIndex={0}>
                        <span className="current">
                          {product.category_id &&
                            data.find(
                              (category) => category.id === product.category_id
                            )?.name}
                        </span>

                        <ul className="list">
                          {data.map((category) => (
                            <li
                              key={category.id}
                              className="option"
                              onClick={() => handleCategorySelect(category.id)}
                            >
                              {category.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-12">
                  <label className="title">Category</label>
                  <select className="list" style ={{display :'block' }}
                    id="category_id"
                    name="category_id"
                    value={product.category_id}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        category_id: e.target.value,
                      })
                    }
                  >
                    {data.map((category) => (
                      <option key={category.id} value={category.id} className="option">
                        {category.name}
                      </option>
                    ))}
                  </select>
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
