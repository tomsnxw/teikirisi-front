import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {

  return (
    <div className='HomePage'>
    {/* <img src='homepage.jpg' alt='homepage'></img> */}
   <div className='infos'>
    <div className='info'>
    <i class="bi bi-pencil-square"></i>
    <p>DISEÑOS PROPIOS</p>
    </div>
    <div className='info'>
    <i class="bi bi-truck"></i>
    <p>ENVÍOS EN BUENOS AIRES</p>
    </div>
    <div className='info'>
    <i class="bi bi-credit-card"></i>
    <p>TODO TIPO DE PAGOS</p>
    </div>
   </div>
   <Link to={'/Productos'}>
   <div className='home-images'>
    <img className='image-grid-col image-grid-row' alt='home-imag' src='/homepage.jpg'></img>
    <img src='/productos/remera1.jpg' alt='home-images1'></img>
    <img src='/productos/remera4.jpg' alt='home-images2'></img>
    <img src='/productos/remera5.jpg' alt='home-images3'></img>
    <img src='/productos/remera3.jpg' alt='home-images4'></img>
   </div></Link>
    </div>

  );
};

export default HomePage;
