import React, { useState } from "react";
import axios from "../../components/axios";
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { loginSuccess } from '../../redux/actions/userActions';


const SignUp = () => {
  document.title = "Sign Up";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();
  //back 

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    balance: 0,
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // window.location.href = '/Login'; 
   

    try {
      const csrfResponse = await axios.get("/get-csrf-token");
      const csrfToken = csrfResponse.data.csrf_token;
      console.log(user.name);
      console.log(user.email);
      console.log(user.password);
      console.log(csrfToken);
      console.log(csrfResponse);

      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
      const response = await axios.post("/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      });


      setEmail("");
      setPassword("");
      setName("");
      setPasswordConfirmation("");

      console.log(response.data);

      navigate("/login");

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <div className="rn-breadcrumb-inner ptb--30">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="title text-center text-md-start">Sign Up</h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <ul className="breadcrumb-list">
                      <li className="item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="separator">
                        <i className="feather-chevron-right"></i>
                      </li>
                      <li className="item current">Sign Up</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-area rn-section-gapTop">
              <div className="container">
                <div className="row g-5">
                  <div className="offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
                    <div className="form-wrapper-one registration-area">
                      <h4>Sign up</h4>
                      <Form method="POST" onSubmit={handleRegister} className="auth-form">
                        <div className="mb-5">
                          <label htmlFor="firstName" className="form-label">
                            Name
                          </label>
                          <Form.Control
                            type="text"
                            value={user.name} // Update to use user.name
                            id="firstName"
                            name="name" // Add name attribute for identification in handleChange
                            onChange={handleChange} // Add onChange event handler
                            required
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                          </label>
                          <Form.Control
                            type="email"
                            value={user.email} // Update to use user.email
                            id="usernameInput"
                            name="email" // Add name attribute for identification in handleChange
                            onChange={handleChange} // Add onChange event handler
                            required
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="passwordInput" className="form-label">
                            Password
                          </label>
                          <Form.Control
                            type="password"
                            id="passInput"
                            name="password" // Add name attribute for identification in handleChange
                            value={user.password} // Update to use user.password
                            onChange={handleChange} // Add onChange event handler
                            required
                          />
                        </div>

                        <div className="mb-5">
                          <label htmlFor="passwordInput" className="form-label">
                            Confirm Password
                          </label>
                          <Form.Control
                            type="password"
                            value={user.password_confirmation} // Update to use user.password_confirmation
                            id="passwordInput"
                            name="password_confirmation" // Add name attribute for identification in handleChange
                            onChange={handleChange} // Add onChange event handler
                          />
                        </div>

                        <div className="mb-5 rn-check-box">
                          <Form.Control
                            type="checkbox"
                            className="rn-check-box-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="rn-check-box-label"
                            htmlFor="exampleCheck1"
                          >
                            Allow all terms & conditions
                          </label>
                        </div>
                        <button type="submit" className="btn btn-primary mr--15">
                          Sign Up
                        </button>
                        <Link to="/Login" className="btn btn-primary-alta">
                          Log In
                        </Link>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="social-share-media form-wrapper-one">
                      <h6>Another way to sign up</h6>
                      <p>
                        Lorem ipsum dolor sit, amet sectetur adipisicing
                        elit.cumque.
                      </p>
                      <button className="another-login login-facebook">
                        <img
                          className="small-image"
                          src="assets/images/icons/google.png"
                          alt=""
                        />
                        <span>Log in with Google</span>
                      </button>
                      <button className="another-login login-facebook">
                        <img
                          className="small-image"
                          src="assets/images/icons/facebook.png"
                          alt=""
                        />
                        <span>Log in with Facebook</span>
                      </button>
                      <button className="another-login login-twitter">
                        <img
                          className="small-image"
                          src="assets/images/icons/tweeter.png"
                          alt=""
                        />
                        <span>Log in with Twitter</span>
                      </button>
                      <button className="another-login login-linkedin">
                        <img
                          className="small-image"
                          src="assets/images/icons/linkedin.png"
                          alt=""
                        />
                        <span>Log in with LinkedIn</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});
//for redux

export default connect(mapStateToProps, { loginSuccess })(SignUp);
