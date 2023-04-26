import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CatalogoPage from './pages/catalogoPage';
import HomePage from './pages/HomePage';
import CarritoPage from './pages/CarritoPage';
import ContactoPage from './pages/ContactoPage';
import DetalleProductoPage from './pages/DetalleProductoPage';
import "bootstrap-icons/font/bootstrap-icons.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  
  const [productosOriginales, setProductosOriginales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [iconoBusqueda, setIconoBusqueda] = useState('search');
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const buscarProducto = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    const productosFiltrados = productosOriginales.filter(producto =>
      producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );
    setProductos(productosFiltrados);
    setIconoBusqueda('clear');
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
    setProductos(productosOriginales);
    setIconoBusqueda('search');
  };

  const renderCarritoOverlay = (props) => (
    <Popover id="popover-carrito" {...props}>
      <CarritoPage carrito={carrito} setCarrito={setCarrito} />
      <div className="popover-button">
      <Link hidden={carrito.length === 0} to="/Carrito">Ir a pagar</Link>
    </div>
    </Popover>
  );
  return (
    <div className="App">
      <header className="header">
        <img src='/banner.png' alt='banner'></img>
       
      </header>
      <BrowserRouter>
      <div className='Nav'>
        <div className='links'>
        <Link to="/"><p >Inicio</p></Link>
        <Link to="/Productos"><p >Productos</p></Link>
        <Link to="/Contacto"><p >Contacto</p></Link>
        </div>
        <div className='nav-icons'> <div className='buscar'>
        <input type='text' value={busqueda} onChange={buscarProducto} placeholder='Buscar un producto' />
        {iconoBusqueda === 'search' ? (
          <i className="bi bi-search"></i>
        ) : (
          <i className="bi bi-x" onClick={limpiarBusqueda}></i>
        )}
      </div><OverlayTrigger trigger="click" placement="bottom" overlay={renderCarritoOverlay}><div className='carrito-icon'><i class="bi bi-cart-fill"></i> <span>{carrito.length}</span></div></OverlayTrigger></div>
</div>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/Productos" element={<CatalogoPage limpiarBusqueda={limpiarBusqueda} buscarProducto={buscarProducto} busqueda={busqueda} setBusqueda={setBusqueda} iconoBusqueda={iconoBusqueda} setIconoBusqueda={setIconoBusqueda} productos={productos} setProductos={setProductos} productosOriginales={productosOriginales}  setProductosOriginales={setProductosOriginales}/>}/>
          <Route path="/Carrito" element={<CarritoPage carrito={carrito} setCarrito={setCarrito}/>}/>
          <Route path="/Contacto" element={<ContactoPage />}/>
          <Route path="/productos/:id" element={<DetalleProductoPage agregarAlCarrito={agregarAlCarrito} />} />
        </Routes></BrowserRouter>
        <footer><p>© Teikirisi 2023. Todos los derechos reservados.</p></footer>
    
    </div>
  );
}

export default App;
