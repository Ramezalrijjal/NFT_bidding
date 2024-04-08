import React, { useState } from "react";

export default function UpQestion({
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
    <>
      <div class="forum-input-ans-wrapper">
        <img src="assets/images/client/client-10.png" alt="Nft-Profile" />
        <form
          onSubmit={onSubmit}
          style={{ height: "fit-content", width: "100%" }}
        >
          <div className="row">
            <div className="col-8">
              
              <input
                type="text"
                value={text}
                placeholder="Write Reply..."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="col-2">
            
              <button
                className="btn btn-primary rounded ml-0"
                disabled={isTextareaDisabled}
                onClick={() => setIsActive("")}
              >
                Update
              </button>
            </div>
            {hasCancelButton && (
              <div className="col-2">
               
                <button className="btn btn-danger rounded" onClick={onCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
    
  );
}
