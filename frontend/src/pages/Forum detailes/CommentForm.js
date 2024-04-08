import React, { useState } from "react";

export default function CommentForm({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);
  const [isActive, setIsActive] = useState(false);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const onCancel = () => {
    // Clear the text and invoke the cancel action
    setText("");
    if (handleCancel) {
      handleCancel();
    }
  };

  return (
    <div>
      <div class="forum-top rn-section-gap ">
        <div class="container">
        <div class="row g-5 align-items-center d-flex">
            <div class="col-lg-12 offset-lg-3">
              <div class="forum-search">
                <form onSubmit={onSubmit}  stule={{height:'fitContent'}}>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="your Qestion Hear..."
                      aria-label="Recipient's username"
                    />
                    <div class="input-group-append"></div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="btn btn-primary add-community"
                      disabled={isTextareaDisabled}
                      onClick={() => setIsActive("")}
                    >
                      {submitLabel}
                    </button>
                    {hasCancelButton && (
                      <button
                        type="button"
                        className="comment-form-button comment-form-cancel-button"
                        onClick={onCancel}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
