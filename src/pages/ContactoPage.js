import React, { useState } from "react";
import axios from "axios";

function ContactoPage() {
 
  const initialForm ={
    nombre:'',
    email:'',
    telefono:'',
    mensaje: ''
  }

  const [sending,setSending]=useState(false);
  const [msg,setMsg] = useState('');
  const [formData, setFormdata]= useState(initialForm);

  const handleChange=e=>{
    const {name, value} =e.target;
    setFormdata(oldData=>({
      ...oldData,
    [name]:value
    }));
  }

  const handleSubmit = async e =>{
    e.preventDefault();
    setMsg('');
    setSending(true)
    const response = await axios.post('http://localhost:3000/api/contacto', formData);
    setSending(false);
    setMsg(response.data.message);
    if (response.data.error ===false){
      setFormdata(initialForm)
    }
  }
  return (
    <div className="ContactoPage">
      <h1>CONTACTO</h1>
      <div className="columns">
      <div className="col-1">
<h2>CONTACTÁNOS</h2>
<div className="contactos">
    <div className="contacto">
<i class="bi bi-telephone"></i><span>+54 9 223 538-3667</span></div>
<div className="contacto">
<i class="bi bi-envelope"></i><span>teikirisi@gmail.com</span></div>
<div className="contacto">
<i class="bi bi-instagram"></i><span>@teikitisi___</span></div>
</div>
</div>

        <div className="col-2">
          <form action="/contacto" method="post" onSubmit={handleSubmit}>
            <div className="form form-1">
              <label for="nombre">
                Nombre:
              </label>
              <input
                type="text" name="nombre"
                value={formData.nombre} onChange={handleChange}
              />
            </div>
            <div className="form form-2">
              <label for="email">
                Email:
              </label>
              <input
                type="text" name="email"
                value={formData.email} onChange={handleChange}
              />
            </div>
            <div className="form form-3">
              <label for="telefono">
                Teléfono:
              </label>
              <input
                type="text" name="telefono"
                value={formData.telefono} onChange={handleChange}
              />
            </div>
            <div className="form form-4">
              <label for="mensaje">
                Mensaje:
              </label>
              <textarea name="mensaje"
                value={formData.mensaje} onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
            </div>
            
            {sending ? <p>Enviando...</p> : null}
            {msg ? <p>{msg}</p>:null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactoPage;
