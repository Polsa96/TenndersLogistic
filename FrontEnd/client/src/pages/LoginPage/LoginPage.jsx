import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { JwtContext } from "../../shared/context/JwtContext";
import { API } from "../../shared/services/api";
import "./LoginPage.scss";

const LoginPage = () => {

  const { register, handleSubmit } = useForm();
  const { jwt, setJwt } = useContext(JwtContext);

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    API.post("api/user/login", formData).then((res) => {
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", JSON.stringify(res.data.id));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("email", JSON.stringify(res.data.email));
      localStorage.setItem("phone", JSON.stringify(res.data.phone));
      localStorage.setItem("goodscompany", JSON.stringify(res.data.goodscompany));
      localStorage.setItem("transportcompany", JSON.stringify(res.data.transportcompany));
     
      setJwt(res.data.token);
      setTimeout(()=>{
    
        navigate("/main")
        console.log('estoy dentro')
      },300)
    });
  };



  return (
    <>
      <Layout>
        <div className="login">
          {/* <LogOut/> */}
          <div className="login--container">

          <div className="login--container--wellcome">
            <h2>¡Bienvenido de nuevo!</h2>
            <p>Por favor, introduce tus datos para continuar.</p>
          </div>

          <form
            className="login--container--form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="login--container--form--title">Dirección de e-mail</p>
            <input
              className="login--container--form--input"
              id="email"
              placeholder="Dirección e-mail"
              defaultValue="ricardo@gmail.com"
              {...register("email", { required: true })}
            />

            <p className="login--container--form--title">Contraseña</p>
            <input
              className="login--container--form--input"
              id="password"
              type="password"
              placeholder="Password"
              defaultValue="Cortina123*"
              {...register("password", {
                required: true,
              })}
            />
            <p className="login--container--form--forgot">¿Olvidaste tu contraseña?</p>

            <input
              className="login--container--form--button button-component"
              type="submit"
              value="Entrar"
            />
          </form>

          <div className="login--container--redirect">
            <h4>¿nuevo en Tennders?</h4>
            <Link to="/register">Crea tu cuenta aquí</Link>
          </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LoginPage;
