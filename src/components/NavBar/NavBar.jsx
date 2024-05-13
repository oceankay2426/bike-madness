import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <Link to="/orders/sell">Sell</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/buy">Buy</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/wish">WishList</Link>
      &nbsp; | &nbsp;
      <Link to="/orders">Cart</Link>
      &nbsp; | &nbsp;
      &nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}