import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { API } from '../../shared/services/api';
import "./NewGoods.scss"

const NewGoods = ({trucks, goodscompany}) => {

  console.log(trucks)
    const { register, handleSubmit } = useForm();
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [datesPush, setDatesPush] = useState([]);
    const [clickSearch, setClickSearch] = useState(false);
    let dates = []
    let resApiData

    const onSubmit = (formData) =>{

      let filterTypeTrucks = trucks.filter((truck) => truck.trailerload===formData.type)

      dates = Dates(formData.datestart,formData.datefinish)

      setDatesPush(dates)
      

      setFilteredTrucks(filterAvailableTrucks(filterTypeTrucks, dates))
      setClickSearch(true)

    }

    console.log(dates)

    const onFinalSubmit = (formData)=>{
      console.log("onFinalSubmit: ",formData)

      //! Preparamos la mercancía para colgarla a la API
      let {datestart,datefinish,...finalPush}=formData;
      
      finalPush={...finalPush,goodscompany:goodscompany._id, dates:datesPush}
      console.log("Final final:", finalPush)

      //! Preparamos el camión para actualizarlo
      
      let filterTruckId = trucks.filter((truck)=>truck._id===formData.truck)
     

      let goodsinformationNew={goodsinformation:filterTruckId[0].goodsinformation} //! Hem d'eliminar els que siguin null
      console.log(goodsinformationNew.goodsinformation)

      SendDataAPI(finalPush,resApiData,goodsinformationNew)

      window.location.reload(false);

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

    function filterAvailableTrucks(fTypeTrucks, datesElected){

      let filterAvailTrucks = [];

      for(let fTypeTruck of fTypeTrucks){                         //*Miramos información de cada camión
        let goodsinformations = fTypeTruck.goodsinformation
        let holidays = fTypeTruck.notavailable
        let banner = false;                                     //Bandera que se encarga de decirnos si hay alguna fecha que coincide

        for(let goodsinformation of goodsinformations){           //*Miramos información de cada viaje de mercancias que tiene
            let datesAvailable = goodsinformation.dates;
  
            if(datesAvailable!=null){
              for(let dateAvailable of datesAvailable){
                const dateAvailableSliced=dateAvailable.slice(0,10)

                for(let dateElected of datesElected){

                  if(dateAvailableSliced===dateElected){

                    banner=true;
                  }
                }
            }
         }
         
        }

        for(let holiday of holidays){                             //*Miramos información de cada dia festivo o otros que pueda tener
          let datesAvailable = holiday.dates;

          if(datesAvailable!=null){
            for(let dateAvailable of datesAvailable){
              const dateAvailableSliced=dateAvailable.slice(0,10)

              for(let dateElected of datesElected){
                if(dateAvailableSliced===dateElected){

                  banner=true;
                }
              }
            }
          }
        }
        if(banner===false){
          filterAvailTrucks=[...filterAvailTrucks,fTypeTruck]
        }
      }
      console.log('Camions finals:',filterAvailTrucks)
      return filterAvailTrucks
    }

    const SendDataAPI = async (finalPush, resApiData, goodsinformation) =>{
      await API.post("api/goods",finalPush).then((res)=>{
          resApiData=res.data
          console.log('RESAPIDATA',resApiData)
      })
      
      await goodsinformation.goodsinformation.push({goods:resApiData,from:finalPush.from, to:finalPush.to, dates:finalPush.dates})

      await API.patch(`api/truck/pull/${finalPush.truck}`,goodsinformation).then((res)=>{
        console.log(res)
      })
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

    {clickSearch===true && 
      <form className="new-goods--form" onSubmit={handleSubmit(onFinalSubmit)}>
        <label lassName="new-goods--form--label">Camiones disponibles</label>
        {filteredTrucks.length===0 ? 
          <p>Ninguno</p> 
          : 
          <>

          <select className="new-goods--form--input" id="truck" name="truck" {...register("truck")}>
            {filteredTrucks.map((filteredTruck)=>(
            <option key={filteredTruck._id} value={filteredTruck._id}>{filteredTruck.truckplate} - {filteredTruck.country}</option>
            ))}
          </select>

          <input className="new-goods--form--button button-component" type="submit" value="Crear nueva mercancia" />
          </>
        
        }
      </form>
    }
    
    </div>
  )
}

export default NewGoods