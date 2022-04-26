import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { API } from '../../shared/services/api';

const ChooseCompany = ({propsPage,propsTypeCompany}) => {
  const [transportcompanies, setTransportcompanies]=useState({})
  const [goodscompanies, setGoodscompanies]=useState({})
  console.log(propsTypeCompany.typeCompany)

  const { register, handleSubmit } = useForm();

  useEffect(()=>{
    if(propsTypeCompany.typeCompany.company==="transportcompany"){
      console.log("estic dins")
      API.get("/api/transportcompany").then((res) => {
        setTransportcompanies(res.data);
        console.log(transportcompanies)
      });
    }
    if(propsTypeCompany.typeCompany.company==="goodscompany"){
      console.log("Hola,estic dins")
      API.get("/api/goodscompany").then((res) => {
        setGoodscompanies(res.data);
        console.log(res.data)
        console.log('Hello',goodscompanies)
      });
    }
    

  },[])

  const onSubmit = (formData) => {

    if(propsTypeCompany.typeCompany.company==="transportcompany"){
      API.patch("api/user/pull/"+JSON.parse(localStorage.getItem("id")), {transportcompany:formData.company}).then((res) => {
        
        localStorage.setItem("transportcompany", JSON.stringify(formData.company));
        window.location.reload(false);
        // console.log(res);
        // console.log("HE ENVIADO LA PETICIONNNNNNN")
      
      });
    }
    if(propsTypeCompany.typeCompany.company==="goodscompany"){
      console.log(formData.company)
      API.patch("api/user/pull/"+JSON.parse(localStorage.getItem("id")), {goodscompany:formData.company}).then((res) => {

        localStorage.setItem("goodscompany", JSON.stringify(formData.company));
        window.location.reload(false);
        // console.log(res);
        // console.log("HE ENVIADO LA PETICIONNNNNNN")
      
      });
    }
  }

  return (
    <>
    {(propsTypeCompany.typeCompany.company==="transportcompany" && transportcompanies.length>0) ?
    <div>
    <p>Has elegido una compañia de transporte</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="companies">Empresas:</label>
      <select id="companies" name="companies" {...register("company")}>
        {transportcompanies.map((transportcompany)=>(
        <option key={transportcompany._id} value={transportcompany._id}>NIF:{transportcompany.nif} Empresa:{transportcompany.legalentityname}</option>
        ))}
      </select>
      <input type="submit" value="Siguiente"/>
    </form>
    
    <p>Crear nueva empresa</p>
    </div>
    :((propsTypeCompany.typeCompany.company==="goodscompany" && goodscompanies.length>0) ?
    <div>
    <p>Has elegido una compañia de productos</p>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="companies">Empresas:</label>
      <select id="companies" name="companies" {...register("company")}>
        {goodscompanies.map((goodscompany)=>(
        <option key={goodscompany._id} value={goodscompany._id}>NIF:{goodscompany.nif} Empresa:{goodscompany.legalentityname}</option>
        ))}

      </select>
      <input type="submit" value="Siguiente"/>
    </form>
    </div>
    :<div></div>)}
    
    <button className="button-component" onClick={()=>propsPage.setPage(1)}>Volver</button>
    </>
  )
}

export default ChooseCompany