import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Job Search</h1>
      </Link>
      <div className="links">
        <Link to="/jobs/add-job">Add Job</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;