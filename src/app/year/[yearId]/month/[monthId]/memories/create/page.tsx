import React from "react";
import ChatInput from "./_components/chat-input";

const CreateMemoryPage = () => {
  return (
    <div className="h-full w-full">
      <ChatInput placeholder={`Write something...`} />
    </div>
  );
};

export default CreateMemoryPage;
