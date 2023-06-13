import React, { useState, useEffect } from "react";
import CreatePostPopup from "./Createpost";

const ProfilePage = () => {
  const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/book/posts");
      if (response.ok) {
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } else {
        throw new Error(`Error fetching posts: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (
    postContent,
    selectedBookImage,
    selectedBookTitle
  ) => {
    const newPost = {
      selectedBookImage: selectedBookImage,
      selectedBookTitle: selectedBookTitle,
      postContent: postContent,
    };

    try {
      const response = await fetch("/api/book/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const createdPost = await response.json();
        console.log(createdPost);

        setPosts([createdPost, ...posts]);
        setIsCreatePostPopupOpen(false);
      } else {
        console.error("Error creating post:", response.status);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  console.log("posts:", posts);
  return (
    <div>
      <h1>Profile page</h1>
      <button onClick={() => setIsCreatePostPopupOpen(true)}>
        Create Post
      </button>
      <CreatePostPopup
        isOpen={isCreatePostPopupOpen}
        onClose={() => setIsCreatePostPopupOpen(false)}
        onSubmit={handleCreatePost}
      />
      {posts.length !== 0 &&
        posts.map((eachPost, index) => {
          console.log(eachPost);
          return (
            <div key={index}>
              {eachPost.book_picture && (
                <img src={eachPost.book_picture} alt="Selected Book" />
              )}
              <div>{eachPost.book_title}</div>
              <div>{eachPost.post}</div>
            </div>
          );
        })}
    </div>
  );
};

export default ProfilePage;
