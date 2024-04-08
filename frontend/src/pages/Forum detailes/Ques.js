import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // You can choose a different icon if needed
import CommentForm from "./CommentForm";
import Comment from "./answer";
import { useSelector } from "react-redux";

import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../components/api";

const Comments = ({ commentsUrl, currentUserId, userName }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [isform, setisform] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
        parseFloat(new Date(a.createdAt).getTime()) - parseFloat(new Date(b.createdAt).getTime())
      );
      // sara
  const addComment = (text, parentId, currentUserId, userName) => {
    createCommentApi(text, parentId, currentUserId, userName).then(
      (comment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      }
    );
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      {!isform && (
      <div class="forum-top rn-section-gap ">
        <div class="container">
          <div class="row g-5 align-items-center d-flex">
            <div class="col-lg-8 offset-lg-3">
              <div class="forum-search">
                <div class="input-group">
                  {/* <input type="text" class="form-control" placeholder="Search Hear..." aria-label="Recipient's username"/> */}
                  <div class="input-group-append">
                    
                    <button
                      className="btn btn-primary"
                      onClick={() => setisform(true)}
                    >
                      Start New Question <i className="feather-plus"></i>
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

 
      <div className="row">
        {isform && (
          <>
            <div className="col-8">
              <CommentForm
                submitLabel="Add"
                handleSubmit={(text) =>
                  addComment(text, null, currentUserId, userName)
                } //
                handleCancel={() => setisform(false)}
              />
            </div>
            <div className="col-4">
              <button
                className="btn btn-primary add-community"
                onClick={() => setisform(false)}
              >
                <FontAwesomeIcon icon={faTimes} />{" "}
              </button>
            </div>
          </>
        )}
      </div>

      {/* display all Question and answer fields */}
      <div className="comments-container">
        {rootComments  .slice()
           .reverse().map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
      {/* display all Question and answer fields */}
    </div>
  );
};

export default Comments;
