import React, { useState, useEffect } from "react"; //estado-eb
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom"; //navegación-eb
import { FaBox, FaLayerGroup, FaClipboardList, FaUsers } from "react-icons/fa";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa6";


export const Admin = () => {

  // estados formulario -eb

  const [productName, setProductName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productImageFile, setProductImageFile] = useState(null);  //guarda img
  const [productDescription, setProductDescription] = useState('');

  // estados interfaz y feedback-eb

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // productos cargados desde backend
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // url backend
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  // cargar productos desde backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error al cargar productos");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    fetchProducts();
  }, [API_URL, token]);

  // función doble, para subir y crear - producto

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Validaciones 
    if (!productImageFile || !productName || !basePrice || !categoryId) {
      setError("Debes llenar todos los campos y seleccionar una imagen.");
      setLoading(false);
      return;
    }

    try {

      //subir imagen a claudinary

      const formData = new FormData();
      formData.append('image', productImageFile);
      formData.append('description', productName);

      //const token = localStorage.getItem("token");

      const imageRes = await fetch(`${API_URL}/images/image/upload`, {
        method: 'POST',
        body: formData
      });
      
      const imageResult = await imageRes.json();

      if (!imageRes.ok) {
        throw new Error(imageResult.error || "Fallo al subir la imagen a Cloudinary.");
      }

      const imageUrl = imageResult.path_image; // URL de Cloudinary

      //  creación de producto cloudinary
      const productData = {
        name: productName,
        description: productDescription,
        base_price: parseFloat(basePrice),
        category_id: parseInt(categoryId),
        image_url: imageUrl,
      };

      const productRes = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });

      const productResult = await productRes.json();

      if (!productRes.ok) {
        throw new Error(productResult.msg || "Fallo al crear el producto.");
      }

      setSuccessMsg(`Producto '${productResult.product.name}' creado con éxito.`);

      // actualizar lista local
      setProducts((prev) => [productResult.product, ...prev]);

      setTimeout(() => {
        setIsCreating(false);
        setProductName('');
        setBasePrice('');
        setCategoryId('');
        setProductImageFile(null);
        setSuccessMsg(null);

      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `btn text-start d-flex align-items-center gap-2 ${isActive(path) ? "btn-light text-dark" : "btn-dark text-white border-0"
    }`;

  const isProductsPage = location.pathname === "/admin";

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* SIDEBAR */}
        <aside className="col-12 col-md-3 col-lg-2 bg-dark text-white p-4">
          <h4 className="mb-4">Admin Panel</h4>

          <div className="d-grid gap-3">
            <Link to="/admin" className={linkClass("/admin")}>
              <FaBox /> Productos
            </Link>

            <Link to="/admin/variants" className={linkClass("/admin/variants")}>
              <FaLayerGroup /> Variantes
            </Link>

            <Link to="/admin/orders" className={linkClass("/admin/orders")}>
              <FaClipboardList /> Órdenes
            </Link>

            <Link to="/admin/users" className={linkClass("/admin/users")}>
              <FaUsers /> Usuarios
            </Link>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="col-12 col-md-9 col-lg-10 bg-light p-4">

          {isProductsPage ? (

            <>  {/* agrego agrego condicional para crear nvo producto -eb */}

              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">{isCreating ? 'Crear nuevo producto' : 'Gestión de productos'} </h5>

                {/* crear nuevo producto -eb */}

                {!isCreating && (

                  <button className="btn btn-dark d-flex align-items-center gap-2" onClick={() => setIsCreating(true)}>
                    <FaPlus /> Crear Producto
                  </button>
                )}
              </div>
              {/* condicional para mostrar el form y form de creación de producto*/}
              {isCreating ? (

                <div className="card p-4">
                  <form onSubmit={handleCreateProduct}>
                    <div className="mb-3">
                      <label className="form-label">Nombre del Producto</label>
                      <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descripción del Producto</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio Base</label>
                      <input type="number" className="form-control" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} required />
                    </div>

                    {/* img */}

                    <div className="mb-3">
                      <label className="form-label">Imagen del Producto</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setProductImageFile(e.target.files[0])}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Categoría</label>
                      <input type="text" className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
                    </div>


                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMsg && <div className="alert alert-success">{successMsg}</div>}

                    <div className="d-flex gap-2 mt-4">
                      <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? 'Procesando...' : <><FaPlus /> Subir y Crear Producto</>}
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setIsCreating(false)} disabled={loading}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              ) : (

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th className="text-end">Opciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.price}</td>
                          <td>{p.category}</td>
                          <td className="text-end">
                            <button className="btn btn-link text-dark" title="Editar">
                              <FaPen />
                            </button>
                            <button className="btn btn-link text-danger" title="Eliminar">
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
