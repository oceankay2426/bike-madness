import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/orders/new">Sell</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">Buy</Link>
      &nbsp;&nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp;&nbsp;
      <Link to="/orders">WishList</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">Cart</Link>
      &nbsp; | &nbsp;
      &nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}