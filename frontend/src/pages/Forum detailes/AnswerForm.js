import React, { useState } from "react";

export default function AnswerForm({
  handleSubmit,
  submitLabel,
  isReplying,
  setActiveComment,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) {
  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <>
      <div class="forum-input-ans-wrapper">
        <img src="assets/images/client/client-10.png" alt="Nft-Profile" />
        {/* <!-- user imag  sara--> */}

        <form
          onSubmit={onSubmit}
          style={{ height: "fit-content", width: "100%" }}
        >
          <div className="row">
            <div className="col-8">
              <input
                type="text"
                value={text}
                placeholder="Write Answer..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-primary rounded ml-0"
                disabled={isTextareaDisabled}
              >
                {submitLabel}
              </button>
            </div>

            <div className="col-2">
            {isReplying && (
              <button
                className="btn btn-primary rounded ml-0"
                onClick={() => setActiveComment(null)}
              >
                Cancel
              </button>)}

            
            </div>

          


            
          </div>
        </form>
      </div>
    </>
  );
}
