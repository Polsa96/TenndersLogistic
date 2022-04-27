import React, { useEffect, useState } from 'react'
import ChooseCompany from '../../components/Companies/ChooseCompany';
import TypeCompany from '../../components/Companies/TypeCompany';
import NewGoods from '../../components/Goodscompany/NewGoods';
import Schedule from '../../components/Goodscompany/Schedule';
import Layout from '../../components/Layout/Layout'
import Logout from '../../components/Logout/Logout';
import ConfigTrucks from '../../components/Transportcompany/ConfigTrucks';
import { API } from '../../shared/services/api';

const MainPage = () => {
    const [trucks, setTrucks] = useState([]);
    const [tcConfigTrucks, settcConfigTrucks] = useState({});
    const [gcNewGoods, setgcNewGoods] = useState({});
    // const [trucks, setTrucks] = useState([]);
    const goodscompany = JSON.parse(localStorage.getItem('goodscompany'));
    const transportcompany = JSON.parse(localStorage.getItem('transportcompany'));
    const user = JSON.parse(localStorage.getItem('user'));
    // const email = JSON.parse(localStorage.getItem('email'));
    // const phone = JSON.parse(localStorage.getItem('phone'));

    const[page,setPage]=useState(1)
    const[typeCompany,setTypeCompany]=useState({})
    const[options,setOptions]=useState(1)


    useEffect(() => {
      API.get("/api/truck").then((res) => {
        setTrucks(res.data)
      })
      if(goodscompany===null && transportcompany!==null){
        API.get(`/api/transportcompany/${transportcompany}`).then((res) => {
          console.log(res.data)
          settcConfigTrucks(res.data)
        })
      }
      if(goodscompany!==null && transportcompany===null){
        API.get(`/api/goodscompany/${goodscompany}`).then((res) => {
          console.log(res.data)
          setgcNewGoods(res.data)
        })
      }

    },[])
    
    




  return (
    <>
      <Layout>
        {(goodscompany==null && transportcompany==null) ? 
        <div>
        {page === 1 && <TypeCompany propsPage={{page,setPage}} propsTypeCompany={{typeCompany,setTypeCompany}}/>}
        {page === 2 && <ChooseCompany propsPage={{page,setPage}} propsTypeCompany={{typeCompany,setTypeCompany}}/>}
        <Logout></Logout>

        </div>
        :
        <>
        <h1>Bienvenido {user}</h1>
        <button onClick={()=>setOptions(1)}>Página Inicial</button>
        {goodscompany==null 
        ? 
        <>
        <button onClick={()=>setOptions(2)}>Configurar camiones</button>
        <button onClick={()=>setOptions(3)}>Mirar Horarios</button>
        {options === 2 && <ConfigTrucks trucks={trucks} transportcompany={tcConfigTrucks}/>}
        {options === 3 && <Schedule trucks={trucks} transportcompany={tcConfigTrucks}/>}
        </> 
        : 
        <>
        <button onClick={()=>setOptions(2)}>Añadir transporte de bienes</button>
        <button onClick={()=>setOptions(3)}>Mirar Horarios</button>
        {options === 2 && <NewGoods trucks={trucks} goodscompany={gcNewGoods}/>}
        {options === 3 && <Schedule trucks={trucks} transportcompany={tcConfigTrucks}/>}

        </>}
        </>
        }
        
      </Layout>
    </>
  )
}

export default MainPage