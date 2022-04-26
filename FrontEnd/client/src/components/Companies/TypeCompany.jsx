import React from 'react'
import { useForm } from 'react-hook-form';

const TypeCompany = ({propsPage,propsTypeCompany}) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) => {
        propsTypeCompany.setTypeCompany(formData)

        setTimeout(()=>{
            propsPage.setPage(2)
          },300)
    }

  return (
    <div>
    <p>No estás asociado a ninguna empresa. Para continuar, elige una:</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <p>¿De que tipo de empresa se trata?</p>
        <label>
            <input type="radio" name="company" value="transportcompany" {...register("company")} defaultChecked />
            Empresa de Transporte
        </label>
        <br></br>
        <label>
            <input type="radio" name="company" value="goodscompany" {...register("company")}/>
            Empresa de Productos y Bienes
        </label>
        <br></br>
        <input type="submit" value="Siguiente"/>    
    </form>
    </div>
  )
}

export default TypeCompany