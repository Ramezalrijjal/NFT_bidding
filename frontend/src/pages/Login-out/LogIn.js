import React, { useState } from "react";
import { Col, Input, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../components/axios";
import { connect } from 'react-redux';
import { loginSuccess } from '../../redux/actions/userActions';

//Import Image;
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const LogIn = ({isAuthenticated, user, loginSuccess}) => {
  
  document.title = "Log In";

  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [errors,seterrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    seterrors([])
    try {
    
    const csrfResponse = await axios.get('/get-csrf-token');
    const csrfToken = csrfResponse.data.csrf_token;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    // Now, make your login request
    const response = await axios.post("/login", { email, password });

    setemail('');
    setpassword('');
    
    const data = await axios.get('/user')
   
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('userID', data.data.user.id);
      
    loginSuccess(data.data.user)
    console.log('data',data.data.user);

    navigate('/');
    // console.log(response.data); // Log the user information
  } catch (e) {
   
    // if (e.response.status === 422){
    //   seterrors(e.response.data.errors)
      console.log(e);

    // }
  }
}

  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            {/* <!-- start page title area --> */}
            <div className="rn-breadcrumb-inner ptb--30">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-6 col-12">
                    <h5 className="title text-center text-md-start">
                      Nuron Login
                    </h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <ul className="breadcrumb-list">
                      <li className="item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="separator">
                        <i className="feather-chevron-right"></i>
                      </li>
                      <li className="item current">Nuron Login</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- end page title area --> */}

            {/* <!-- login form --> */}
            <div className="login-area rn-section-gapTop">
              <div className="container">
                <div className="row g-5">
                  <div className=" offset-2 col-lg-4 col-md-6 ml_md--0 ml_sm--0 col-sm-12">
                    <div className="form-wrapper-one">
                      <h4>Login</h4>
                      <Form onSubmit={handleLogin} className="auth-form">
                        <div className="mb-5">
                          <label htmlFor="usernameInput" className="form-label">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={email}
                            className="form-control"
                            id="usernameInput"
                            placeholder="Enter your username"
                            onChange={(e) => setemail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-5">
                          <label htmlFor="passwordInput" className="form-label">
                            Password
                          </label>
                          <Input
                            type="password"
                            className="form-control"
                            id="passInput"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="mb-5 rn-check-box">
                          <Input
                            type="checkbox"
                            className="rn-check-box-input"
                            id="exampleCheck1"
                          />
                          <label
                            className="rn-check-box-label"
                            htmlFor="exampleCheck1"
                          >
                            Remember me leter
                          </label>

                          <input
                            type="checkbox"
                            className="rn-check-box-input ml-5"
                            id="exampleCheck1"
                          />
                          <label
                            className="rn-check-box-label"
                            htmlFor="exampleCheck1"
                          >
                            <Link to="/resetpassword">Forgot Password?</Link>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mr--15"
                        >
                          Log In
                        </button>
                        <Link to ="/SignUp" className="btn btn-primary-alta">
                          Sign Up
                        </Link>
                      </Form>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="social-share-media form-wrapper-one">
                      <h6>Another way to log in</h6>
                      <p>
                        {" "}
                        Lorem ipsum dolor sit, amet sectetur adipisicing
                        elit.cumque.
                      </p>
                      <button className="another-login login-facebook">
                        {" "}
                        <img
                          className="small-image"
                          src="assets/images/icons/google.png"
                          alt=""
                        />{" "}
                        <span>Log in with Google</span>
                      </button>
                      <button className="another-login login-facebook">
                        {" "}
                        <img
                          className="small-image"
                          src="assets/images/icons/facebook.png"
                          alt=""
                        />{" "}
                        <span>Log in with Facebook</span>
                      </button>
                      <button className="another-login login-twitter">
                        {" "}
                        <img
                          className="small-image"
                          src="assets/images/icons/tweeter.png"
                          alt=""
                        />{" "}
                        <span>Log in with Twitter</span>
                      </button>
                      <button className="another-login login-linkedin">
                        {" "}
                        <img
                          className="small-image"
                          src="assets/images/icons/linkedin.png"
                          alt=""
                        />{" "}
                        <span>Log in with linkedin</span>
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

export default connect(mapStateToProps, { loginSuccess })(LogIn);