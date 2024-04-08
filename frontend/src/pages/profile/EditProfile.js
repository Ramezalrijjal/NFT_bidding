import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    image: 'assets/images/profile/profile-01.jpg',
  });
  const [passwordData, setPasswordData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user_id = sessionStorage.getItem('userID');

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/users/${user_id}`)
      .then((response) => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      });
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          image: e.target.result,
        });

        const formData = new FormData();
        formData.append('image', file);

        axios
          .put(`http://127.0.0.1:8000/api/update-profile-image/${user_id}`, formData)
          .then((response) => {
            console.log('Image uploaded successfully:', response.data);
          })
          .catch((error) => {
            console.error('Error uploading image:', error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    // Send a request to update the user's profile information
    axios
      .put(`http://127.0.0.1:8000/api/update-profile/${user_id}`, profileData)
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSavePassword = () => {
    const passwordChangePayload = {
      email: passwordData.email,
      old_password: passwordData.oldPassword,
      new_password: passwordData.newPassword,
      confirm_password: passwordData.confirmPassword,
    };

    axios
      .post('http://your-backend-api-url/change-password', passwordChangePayload)
      .then((response) => {
        console.log('Password changed successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error changing password:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>

      <div className="edit-profile-area rn-section-gapTop">
        <div className="container">
          <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
            <div className="col-12 d-flex justify-content-between mb--30 align-items-center">
              <h4 className="title-left">Edit Your Profile</h4>
              <a href="UserProfile" className="btn btn-primary ml--10">
                <i className="feather-eye mr--5"></i> Preview
              </a>
            </div>
          </div>
          <div className="row plr--70 padding-control-edit-wrapper pl_md--0 pr_md--0 pl_sm--0 pr_sm--0">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <nav className="left-nav rbt-sticky-top-adjust-five">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                    <i className="feather-edit"></i>Edit Profile Image
                  </button>
                  <button className="nav-link" id="nav-home-tabs" data-bs-toggle="tab" data-bs-target="#nav-homes" type="button" role="tab" aria-controls="nav-homes" aria-selected="false">
                    <i className="feather-user"></i>Personal Information
                  </button>
                  <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                    <i className="feather-unlock"></i>Change Password
                  </button>

                </div>
              </nav>
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 mt_sm--30">
              <div className="tab-content tab-content-edit-wrapepr" id="nav-tabContent">

                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div className="nuron-information">
                    <div className="profile-change row g-5">
                      <div className="profile-left col-lg-4">
                        <div className="profile-image mb--30">
                          <h6 className="title">Change Your Profile Picture</h6>
                          <img id="rbtinput1" src={profileData.image} alt="Profile-NFT" />
                        </div>
                        <div className="button-area">
                          <div className="brows-file-wrapper">
                            <input
                              name="fatima"
                              id="fatima"
                              type="file"
                              onChange={handleImageChange}
                            />
                            <label for="fatima" title="No File Choosen">
                              <span className="text-center color-white">Upload Profile</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-pane fade" id="nav-homes" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div className="nuron-information">
                    <div className="profile-form-wrapper">
                      <div className="input-two-wrapper mb--15">
                        <div className="first-name col-12">
                          <label for="contact-name" className="form-label"> Name</label>
                          <input
                            type="text"
                            name="first_name"
                            value={profileData.name || ''}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            placeholder="example@gmail.com"

                          />

                        </div>

                      </div>
                      <div className="email-area">
                        <label for="Email" className="form-label">Edit Your Email</label>
                        <input
                          type="email"
                          id="Email"
                          name="email"
                          value={profileData.email || ''}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          placeholder="example@gmail.com"
                        />                      </div>
                    </div>

                  </div>
                </div>

                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div className="nuron-information">
                    <div className="condition">
                      <h5 className="title">Create Your Password</h5>
                      <p className="condition">
                        Passwords are a critical part of information and network security. Passwords
                        serve to protect user accounts but a poorly chosen password, if compromised,
                        could put the entire network at risk.
                      </p>
                      <hr />
                      <div className="email-area">
                        <label for="Email2" className="form-label">Enter Email</label>
                        <input
                          name="email"
                          id="Email2"
                          type="email"
                          value={profileData.email}
                          onChange={handlePasswordChange}
                        />                      </div>
                    </div>
                    <div className="input-two-wrapper mt--15">
                      <div className="old-password half-wid">
                        <label for="oldPass" className="form-label">Enter Old Password</label>
                        <input
                          name="oldPassword"
                          id="oldPass"
                          type="password"
                          value={passwordData.oldPassword}
                          onChange={handlePasswordChange}
                        />                      </div>
                      <div className="new-password half-wid">
                        <label for="NewPass" className="form-label">Create New Password</label>
                        <input
                          name="newPassword"
                          id="NewPass"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                        />                      </div>
                    </div>
                    <div className="email-area mt--15">
                      <label for="rePass" className="form-label">Confirm Password</label>
                      <input
                        name="confirmPassword"
                        id="rePass"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                      />                    </div>
                    <a onClick={handleProfileSave} className="btn btn-primary save-btn-edit">
                      Save
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  );
};

export default EditProfile;
