import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CatalogoPage({setProductosOriginales, productos, setProductos}) {

  
  const [imagenActual, setImagenActual] = useState(0);
  const [imagenesActuales, setImagenesActuales] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:3000/api/productos')
      .then(response => response.json())
      .then(data => {
        setProductosOriginales(data);
        setProductos(data);
      });
  }, [setProductos, setProductosOriginales]);


  return (
    <div className='CatalogoPage'>
      <h1>NUESTRAS REMERAS</h1>
      
      <div className='productos'>
        {productos.map(producto => (
          <div className='producto' key={producto.id}>
            <div className='imagenes-contenedor'>
              <div className='imagenes-wrap'>
                <div className='imagenes' ref={el => {
                  if (el && imagenesActuales[producto.id] === undefined) {
                    setImagenesActuales({...imagenesActuales, [producto.id]: el});
                  }
                }}>
                  <img src={`/productos/${producto.imagen_front}.jpg`} alt={producto.nombre}></img>
                  {producto.imagen_back && <img src={`/productos/${producto.imagen_back}.jpg`} alt={producto.nombre}></img>}
                </div>
              </div>
              {producto.imagen_back && (
                <>
                  <i className="bi bi-caret-left-fill" onClick={() => {
                    if (imagenActual > 0) {
                      imagenesActuales[producto.id].scrollLeft -= 250;
                      setImagenActual(imagenActual - 1);
                    }
                  }}></i>
                  <i className="bi bi-caret-right-fill" onClick={() => {
                    if (imagenActual < 1) {
                      imagenesActuales[producto.id].scrollLeft += 250;
                      setImagenActual(imagenActual + 1);
                    }
                  }}></i>
                </>
              )}
            </div>
            <div className='producto-info'>
              <Link to={`/Productos/${producto.id}`}>
                <h2>{producto.nombre}</h2>
                <p>${producto.precio}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoPage;
