import React, { useState } from "react";
import CommentForm from "./CommentForm";
import UpQestion from "./UpQestion";
import AnswerForm from "./AnswerForm";
import { Link } from "react-router-dom";

// import { getUsers } from '../../redux/actions/userActions';
import { useSelector } from "react-redux";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
}) => {
  const userName = useSelector((state) => state.user.name);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const currentUserId = useSelector((state) => state.user.id);
  // const userName = "sara";
  // const currentUserId = 1;
  const [isUpdate, setisUpdate] = useState(true);

  // if (isAuthenticated) {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed =
    new Date() - new Date(comment.createdAt) > fiveMinutes;

  const canDelete =
    currentUserId === comment.userId &&
    replies.length === 0 &&
    !timePassed;
  const canReply = Boolean(currentUserId);

  const canEdit =
    currentUserId === comment.userId &&
    !timePassed; // Check if less than 5 minutes
  const replyId = parentId ? parentId : comment.id;

  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const number = 0;

  return (
    <div key={comment.id} className="comment-container">
      <div class="nu-community-area rn-section-gapTop">
        <div class="container">
          <div class="row g-5">
            <div>
              <div class="community-content-wrapper">
                <div className="single-community-box">
                  <div className="community-bx-header">
                    <div className="header-left">
                      <div className="thumbnail">
                        <img
                          src="assets/images/client/client-2.png"
                          alt="NFT-thumbnail"
                        />
                      </div>
                      <div className="name-date">
                        <Link to="#" className="name">
                          {comment.username}
                        </Link>
                        <span className="date">
                          {new Date(
                            parseFloat(createdAt) * 1000
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="header-right">
                      <div className="product-share-wrapper">
                        <div className="profile-share">
                          <div className="profile-share-images">
                            {replies
                              .filter((reply) => reply.parentId === comment.id)
                              .slice(0, 3) // Get the first 3 replies
                              .map((reply, index) => (
                                <Link
                                  to="author.html"
                                  className="avatar"
                                  data-tooltip={`Owner: ${reply.username}`}
                                  key={index}
                                >

                                  <img
                                    class="large"
                                    src="assets/images/client/client-11.png"
                                    // src={reply.profileImage}
                                    // alt="Nft_Profile"
                                    alt={` ${reply.name}`}
                                  />
                                </Link>
                              ))}
                          </div>

                          {replies.filter(
                            (reply) => reply.parentId === comment.id
                          ).length > 3 && (
                              <Link className="more-author-text" href="#">
                                +
                                {replies.filter(
                                  (reply) => reply.parentId === comment.id
                                ).length - 3}{" "}
                                People
                              </Link>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {isAuthenticated && ( */}
                  <div>
                    <div className="community-content">

                      {comment.userId === currentUserId && (
                        <div>
                          {!isEditing && (
                            <h3
                              className="title"
                              style={{ textAlign: "left", marginLeft: "50px" }}
                            >
                              {comment.body}
                            </h3>
                          )}

                          {isEditing && (
                            <UpQestion
                              submitLabel="Update"
                              hasCancelButton
                              initialText={comment.body}
                              handleSubmit={(text) => {
                                updateComment(text, comment.id);
                                setisUpdate(true); // Set isUpdate to true when submitting
                              }}
                              handleCancel={() => {
                                setActiveComment(null);
                                setisUpdate(true); // Set isUpdate to false when canceling editing
                              }}
                            />
                          )}

                          {!canEdit && isUpdate && (
                            <span
                              style={{ marginRight: "10px" }}
                              className="comment-action edit-action"
                              onClick={() => {
                                setActiveComment({
                                  id: comment.id,
                                  type: "editing",
                                });
                                setisUpdate(false); // Set isUpdate to false when "Edit" is clicked
                              }}
                            >
                              Edit
                            </span>
                          )}

                          {!canDelete && (
                            <span
                              className="comment-action delete-action"
                              onClick={() => deleteComment(comment.id)}
                            >
                              Delete
                            </span>
                          )}
                        </div>
                      )}


                      <div className="hr"></div>
                      <div class="rn-community-footer">
                        {!isReplying && (
                          <div class="answer">
                            <button
                              class="btn btn-primary-alta rounded"
                              onClick={() =>
                                setActiveComment({
                                  id: comment.id,
                                  type: "replying",
                                })
                              }
                            >
                              Answer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* )} */}
                </div>

                {/* {isAuthenticated && ( */}
                <div>
                  {isReplying && (
                    <>
                      <AnswerForm
                        submitLabel="Reply"
                        isReplying={isReplying} // Pass isReplying as a prop
                        setActiveComment={setActiveComment} // Pass isReplying as a prop
                        handleSubmit={(text) =>
                          addComment(text, replyId, currentUserId, userName)
                        }
                      />
                      {/* <button
                          class="btn btn-primary-alta rounded"
                          onClick={() => setActiveComment(null)}
                        >
                          Cancel
                        </button> */}
                    </>
                  )}
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nu-community-area">
        <div class="container">
          <div class="row">
            <div>
              <div class="community-content-wrapper">
                <div class="forum-ans-box">
                  {replies.length > 0 && (
                    <div>
                      {replies
                        .filter((reply) => reply.parentId === comment.id)
                        .slice()
                        .reverse().map((filteredReply) => (
                          <div class="forum-single-ans" key={filteredReply.id}>
                            <div class="ans-header">
                              <a href="author.html">
                                <img
                                  src="assets/images/client/client-3.png"
                                  alt="Nft-Profile"
                                />
                              </a>
                              <a href="author.html">
                                <p class="name">{filteredReply.username}</p>
                                <br></br>
                              </a>
                              <div className="date">
                                <i className="feather-watch"></i>
                                <span>
                                  {new Date(filteredReply.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="ans-content">
                              <p>{filteredReply.body}</p>
                              <hr class="form-ans-separator" />
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
