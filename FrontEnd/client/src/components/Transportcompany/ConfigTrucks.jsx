import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form';
import "./ConfigTrucks.scss"

const ConfigTrucks = ({trucks,transportcompany}) => {

    console.log(transportcompany.legalentityname)

    const { register, handleSubmit } = useForm();
    const [bTruckPlate, setbTruckPlate] = useState(false);
    const [truckConfig, setTruckConfig] = useState({});

    const onSubmit =(formData) => {

        let filteredTruck = trucks.filter((truck)=>truck.truckplate===formData.truckplate)
        console.log("Aixo es",filteredTruck)
        setTruckConfig(filteredTruck[0])
        if(filteredTruck==""){
            setbTruckPlate(false)
        }
        if(filteredTruck.length===1){
            setbTruckPlate(true)
        }
    }

    const onFinalSubmit = (formData)=>{}

  return (
    <div className="config-trucks">
        <div className="config-trucks--container">
            <form className="config-trucks--container--form" onSubmit={handleSubmit(onSubmit)}>
                <label className="config-trucks--container--form--label">
                Escribe la matrícula del camión
                </label>
                <input
                className="config-trucks--container--form--input"
                id="truckplate"
                placeholder="1111NNN"
                {...register("truckplate", { required: true })}
                />

<input className="config-trucks--container--form--button button-component" type="submit" value="Mostrar información" />
            </form>
            {bTruckPlate===true &&

            <>
                <form  className="config-trucks--container--form" onSubmit={handleSubmit(onFinalSubmit)}>
                <label className="config-trucks--container--form--label">Matrícula</label>

                <input
                className="config-trucks--container--form--input"
                id="truckplate"
                placeholder="1111NNN"
                defaultValue={truckConfig.truckplate}
                {...register("truckplate", { required: true })}
                />

                <label className="config-trucks--container--form--label">País</label>
                <input
                className="config-trucks--container--form--input"
                id="country"
                placeholder="Spain"
                defaultValue={truckConfig.country}
                {...register("country", { required: true })}
                />

                <label className="config-trucks--container--form--label">Volumen (m3)</label>
                <input
                className="config-trucks--container--form--input"
                id="trailervolume"
                placeholder="40"
                defaultValue={truckConfig.trailervolume}
                {...register("trailervolume", { required: true })}
                />

                <label className="config-trucks--container--form--label">Peso (Toneladas)</label>
                <input
                className="config-trucks--container--form--input"
                id="trailerweight"
                placeholder="50"
                defaultValue={truckConfig.trailerweight}
                {...register("trailerweight", { required: true })}
                />

                <label className="new-goods--form--label" htmlFor="type">Tipo de camión necesario para llevar la carga</label>
                <select className="new-goods--form--input" id="type" name="type" {...register("type")}>
                    <option value="contenedor-cerrado" >Camión con contenedor cerrado</option>
                    <option value="plataforma-abierta" >Camión con plataforma abierta</option>
                    <option value="cisterna">Camión con cisterna</option>
                    <option value="lona">Camión con lona</option>
                    <option value="frigorifico">Camión frigorífico</option>
                    <option value="portacoches">Camión portacoches</option>
                    <option value="jaula">Camión jaula</option>
                </select>

                <label className="config-trucks--container--form--label">Días de vacaciones</label>
                <input
                className="config-trucks--container--form--input"
                id="trailerweight"
                placeholder="50"
                defaultValue={truckConfig.trailerweight}
                {...register("trailerweight", { required: true })}
                />

                <label className="config-trucks--container--form--label">Empresa de transporte</label>
                    <input
                    className="config-trucks--container--form--input"
                    id="transportcompany"
                    placeholder={transportcompany.legalentityname}
                    defaultValue={transportcompany.legalentityname}
                    readOnly="readonly"
                    {...register("transportcompany", { required: true })}
                    />


                </form>
            </>

            
            
            }
        </div>
    </div>
  )
}

export default ConfigTrucks