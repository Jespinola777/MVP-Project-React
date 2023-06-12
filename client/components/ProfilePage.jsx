import React, { useState } from "react";
import CreatePostPopup from "./Createpost";

const ProfilePage = () => {
  const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleCreatePost = (
    postContent,
    selectedBookImage,
    selectedBookTitle
  ) => {
    const newPost = {
      selectedBookImage: selectedBookImage,
      selectedBookTitle: selectedBookTitle,
      postContent: postContent,
    };
    setPosts([newPost, ...posts]);
    setIsCreatePostPopupOpen(false);
    console.log(newPost);
  };

  return (
    <div>
      <h1>Profile page</h1>

      {/* Create Post button */}
      <button onClick={() => setIsCreatePostPopupOpen(true)}>
        Create Post
      </button>
      {/* Create Post popup */}
      <CreatePostPopup
        isOpen={isCreatePostPopupOpen}
        onClose={() => setIsCreatePostPopupOpen(false)}
        onSubmit={handleCreatePost}
      />
      {posts.map((eachPost, index) => (
        <div key={index}>
          {eachPost.selectedBookImage && (
            <img src={eachPost.selectedBookImage} alt="Selected Book" />
          )}
          <div>{eachPost.selectedBookTitle}</div>
          <div>{eachPost.postContent}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePage;
