import React, { useState, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import Header from "./Header";
import "./app.css";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(
      "https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyDrDj8Mi49mZx8wPYSI1P7hupeEGXFPfQ8"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <Header />
      <ProfilePage />
    </main>
  );
};

export default App;
