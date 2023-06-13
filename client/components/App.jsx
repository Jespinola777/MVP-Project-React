import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import ProfilePage from "./ProfilePage";

const App = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <main>
      <Header onProfileClick={handleProfileClick} />
      {showProfile && <ProfilePage />}
    </main>
  );
};

export default App;
