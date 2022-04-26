import React from 'react'
import { useForm } from 'react-hook-form';
import "./NewGoods.scss"

const NewGoods = ({trucks}) => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (formData) =>{
      console.log(trucks)
      console.log(formData)
      let filterTypeTrucks = trucks.filter((truck) => truck.trailerload===formData.type)

      let dates = Dates(formData.datestart,formData.datefinish)
      // let filterDatesTrucks = filterTypeTrucks.filter((truck)=>truck.)
      console.log(dates)

      console.log(filterTypeTrucks)
    }


    function Dates(ds,de){
      let dateStart = new Date(ds).getTime();
      let dateEnd = new Date(de).getTime();
      let startingDate= new Date(ds);

      let difference = ((dateEnd-dateStart)/(1000*60*60*24));

      let dates=[];
      if(difference===0){
        return [ds]
      }
      if(difference>0){
        dates=[ds]
        for(let i=0; i<difference; i++){
          let transformDate = startingDate;
          transformDate.setDate(transformDate.getDate()+1)
          dates=[...dates,transformDate.toISOString().slice(0, 10)]
        }
        return dates
      }
    }


  return (
    <div className="new-goods">
    <form className="new-goods--form" onSubmit={handleSubmit(onSubmit)}>
        <label className="new-goods--form--label">
            Nombre del producto/mercancía que se quiere transportar
        </label>
        <input
          className="new-goods--form--input"
          id="name"
          placeholder="Vegetales"
          {...register("name", { required: true })}
        />
        
        <label className="new-goods--form--label" htmlFor="type">Tipo de camión necesario para llevar la carga</label>
          <select className="new-goods--form--input" id="type" name="type" {...register("type")}>
            <option value="contenedor-cerrado">Camión con contenedor cerrado</option>
            <option value="plataforma-abierta">Camión con plataforma abierta</option>
            <option value="cisterna">Camión con cisterna</option>
            <option value="lona">Camión con lona</option>
            <option value="frigorifico">Camión frigorífico</option>
            <option value="portacoches">Camión portacoches</option>
            <option value="jaula">Camión jaula</option>
          </select>

          <label className="new-goods--form--label">Localización de salida</label>
          <input
          className="new-goods--form--input"
          id="from"
          placeholder="Barcelona"
          {...register("from", { required: true })}
          />
          <label className="new-goods--form--label">Localización de llegada</label>
          <input
          className="new-goods--form--input"
          id="to"
          placeholder="Madrid"
          {...register("to", { required: true })}
          />

          <label className="new-goods--form--label">Día de salida</label>
          <input
          className="new-goods--form--input"
          id="datestart"
          placeholder="YYYY--MM--DD"
          {...register("datestart", { required: true })}
          />
          <label className="new-goods--form--label">Día de llegada</label>
          <input
          className="new-goods--form--input"
          id="datefinish"
          placeholder="YYYY--MM--DD"
          {...register("datefinish", { required: true })}
          />

          <input className="new-goods--form--button button-component" type="submit" value="Buscar camiones disponibles" />
    </form>
    
    </div>
  )
}

export default NewGoods