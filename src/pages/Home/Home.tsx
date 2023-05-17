import type React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const isUserLoggedIn = true;

  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
      <Link to="/detail">Detail</Link>

      {isUserLoggedIn && (
        <div className="bottomMenu">
          <h3>Visible after login</h3>

          <Link to="/">Home</Link>
          <Link to="/settings">Settings</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
