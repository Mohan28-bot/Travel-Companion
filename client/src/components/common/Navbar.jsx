import travel_icon from '../../images/travel_logo.png'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/");
  }

  const { username } = useParams();
    return (
      <div className="navContainer">
        <div className="logo">
          <span>Travel World</span>
          <img src={travel_icon} alt="logo" />
        </div>
        <div className="profile">
          <button onClick={handleLogout}>Logout</button>
          <span>{username}</span>
          <img
            src="https://cdn-icons-png.flaticon.com/128/64/64572.png" alt='profile'
          />
        </div>
      </div>
    );
}
export default Navbar;