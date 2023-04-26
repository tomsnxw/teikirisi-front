import {useState,useEffect} from 'react';

function CarritoPage({ carrito, setCarrito }) {

  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    setTotal(total);
  }, [carrito]);

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };
  

  return (
    <div className="CarritoPage">
      <h1>Carrito de compras</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {carrito.map((producto, index) => (
            <li className='product' key={index}>
              <img  src={`/productos/${producto.imagen_front}.jpg`} alt={producto.nombre}></img>
              <p>{producto.nombre}</p>
              <p>${producto.precio}</p>
              <i class="bi bi-trash-fill" onClick={() => eliminarDelCarrito(index)}></i>
              <hr></hr></li>
          ))} <li className='strong'>
          <strong>Total a pagar: </strong> ${total}
        </li>
        </ul>
      )}
    </div>
  );
}

export default CarritoPage;
