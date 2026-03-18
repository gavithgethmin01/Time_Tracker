import { useState } from "react";
import "./index.css";
import StudyDashboard from "./components/Week2";
import Landing from "./components/Landing";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen">
      {isLoggedIn ? (
        <StudyDashboard 
          user={user} 
          onLogout={() => {
            setIsLoggedIn(false);
            setUser(null);
          }} 
        />
      ) : (
        <Landing onLoginSuccess={(userData) => {
          setUser(userData);
          setIsLoggedIn(true);
          window.scrollTo(0, 0);
        }} />
      )}
    </div>
  );
};

export default App;
