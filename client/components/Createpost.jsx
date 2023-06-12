import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./app.css";

const CreatePostPopup = ({ isOpen, onClose, onSubmit }) => {
  const [postContent, setPostContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBookImage, setSelectedBookImage] = useState("");

  useEffect(() => {
    const getSearchResults = () => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDrDj8Mi49mZx8wPYSI1P7hupeEGXFPfQ8`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.items || []);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    if (searchTerm && searchTerm.trim().length > 0) {
      getSearchResults();
      setShowSuggestions(true);
    } else {
      setSearchResults([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(postContent, selectedBookImage, selectedBookTitle);
    setPostContent("");
    setSelectedBookImage("");
    setSelectedBookTitle("");
    onClose();
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectSuggestion = (book) => {
    setSearchTerm(book.volumeInfo.title);
    setShowSuggestions(false);
    setSelectedBookTitle(book.volumeInfo.title);
    setSelectedBookImage(book.volumeInfo.imageLinks?.thumbnail || "");
    setSearchTerm("");
    console.log(book);
  };

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose}>
      <h2>Create a Post</h2>
      <div className="container">
        <div className="search-box">
          <form>
            <label>Select a Book: </label>
            <input type="text" value={searchTerm} onChange={handleChange} />

            {showSuggestions && (
              <ul className="suggestions">
                {searchResults.map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleSelectSuggestion(book)}
                  >
                    {book.volumeInfo.title}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="selected-book">
            {selectedBookImage && (
              <img
                src={selectedBookImage}
                alt="Selected Book"
                className="selected-book-image"
              />
            )}

            {selectedBookTitle && (
              <p className="selected-book-title">{selectedBookTitle}</p>
            )}
          </div>
          <textarea
            className="post-content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Enter your post content"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default CreatePostPopup;
