import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";


export const Navbar = () => {

	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("logged");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">

				<Link className="Brand navbar-brand ms-5" to="/">LOGO</Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
					aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarContent">

					<form className="d-flex mx-auto position-relative w-50" role="search">
						<label htmlFor="searchInput" className="visually-hidden">Buscar productos</label>
						<FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
						<input id="searchInput" className="form-control rounded-pill ps-5 border-dark" type="search" placeholder="Buscar productos" aria-label="Buscar" />
					</form>


					<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">

						<li className="nav-item dropdown me-2">
							<Link className="Favoritos" to="/" role="button"> <FaRegHeart />
							</Link>
						</li>

						<li className="nav-item dropdown me-2">
							<Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Mujer
							</Link>
							<ul className="dropdown-menu">
								<li><Link className="dropdown-item" to="/mujer/blusas">Blusas</Link></li>
								<li><Link className="dropdown-item" to="/mujer/faldas">Faldas</Link></li>
								<li><Link className="dropdown-item" to="/mujer/zapatos">Zapatos</Link></li>
							</ul>
						</li>


						<li className="nav-item dropdown me-3">
							<Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Hombre
							</Link>
							<ul className="dropdown-menu">
								<li><Link className="dropdown-item" to="/hombre/camisas">Camisas</Link></li>
								<li><Link className="dropdown-item" to="/hombre/pantalones">Pantalones</Link></li>
								<li><Link className="dropdown-item" to="/hombre/zapatos">Zapatos</Link></li>
							</ul>
						</li>

						<li className="nav-item">
							<Link className="nav-link" to="/carrito"><LuShoppingCart /></Link>
						</li>

						<li className="nav-item ms-auto">
							<Link className="nav-link" to="/login"> <FaUser /> <IoExitOutline className="" onClick={handleLogout} /></Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};





