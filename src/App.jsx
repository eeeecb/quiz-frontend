import React, { useState } from "react";
import Quiz from "./Quiz";
import Auth from "./Auth";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {user ? <Quiz user={user} /> : <Auth onLogin={handleLogin} />}
    </div>
  );
}

export default App;
