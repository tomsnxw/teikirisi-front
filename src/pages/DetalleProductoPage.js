import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetalleProductoPage({ agregarAlCarrito }) {
  const [scrollAmount, setScrollAmount] = useState(250);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setScrollAmount(250);
      } else {
        setScrollAmount(100);
      }
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [imagenesActuales, setImagenesActuales] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/productos/${id}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data);
      });
  }, [id]);

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="DetalleProductoPage">
      <div className='producto'>
        <div className='imagenes-contenedor'>
  
          <div className='imagenes' ref={el => {
            if (el && imagenesActuales[producto.id] === undefined) {
              setImagenesActuales({...imagenesActuales, [producto.id]: el});
            }
          }}>
            <img src={`/productos/${producto.imagen_front}.jpg`} alt={producto.nombre}></img>
            {producto.imagen_back && (
              <img src={`/productos/${producto.imagen_back}.jpg`} alt={producto.nombre}></img>
            )}
          </div>
          
        </div>
        <div className='producto-info'>
          <div className='producto-text'>
            <h1>{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
          </div>
          <div className='imagenes-icon'>
            <img onClick={() => {
              if (imagenActual > 0) {
                imagenesActuales[producto.id].scrollLeft -= 250;
                setImagenActual(imagenActual - 1);
              }
            }} src={`/productos/${producto.imagen_front}.jpg`} alt={producto.nombre}></img>
            {producto.imagen_back && (
              <img onClick={() => {
                if (imagenActual < 1) {
                  imagenesActuales[producto.id].scrollLeft += 250;
                  setImagenActual(imagenActual + 1);
                }
              }} src={`/productos/${producto.imagen_back}.jpg`} alt={producto.nombre}></img>
            )}
          </div>
          <button onClick={() => agregarAlCarrito(producto)}>Comprar</button>
        </div>
      </div>
    </div>
  );
}

export default DetalleProductoPage;
