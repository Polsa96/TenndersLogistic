import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { API } from "../../shared/services/api";
import "./SignupPage.scss";

const SignupPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    API.post("api/user/register", formData).then((res) => {
      console.log("Register user", res);
    });
    navigate("/");
  };

  return (
    <>
      <Layout>
        <div className="user-register">
          <div className="user-register--container">

            <div className="user-register--container--wellcome">
              <h2>¡Crea una cuenta!</h2>
              <p>Nos encantaría que formaras parte de esta preciosa comunidad.</p>
            </div>

            <form
              className="user-register--container--form"
              onSubmit={handleSubmit(onSubmit)}
            >
            <p className="user-register--container--form--title">Nombre de usuario</p>
              <input
                className="user-register--container--form--input"
                id="name"
                defaultValue="Ricardo"
                placeholder="Nombre completo"
                type="name"
                {...register("name", { required: true })}
              />

              <p className="user-register--container--form--title">Dirección de e-mail</p>
              <input
                className="user-register--container--form--input"
                id="email"
                defaultValue="ricardo@gmail.com"
                placeholder="Dirección e-mail"
                type="email"
                {...register("email", {
                  required: true,
                })}
              />

              <p className="user-register--container--form--title">Teléfono móvil</p>
              <input
                className="user-register--container--form--input"
                id="phone"
                defaultValue="666666666"
                placeholder="Móvil"
                type="number"
                {...register("phone", {
                  required: true,
                })}
              />

              <p className="user-register--container--form--title">Contraseña</p>
              <input
                className="user-register--container--form--input"
                name="password"
                id="password"
                type="password"
                defaultValue="Cortina123*"
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
              />

              <input
                className="user-register--container--form--button button-component"
                type="submit"
                value="Guardar Perfil"
              />
            </form>
            <div className="user-register--container--redirect">
            <h4>¿ya tienes cuenta en Tennders?</h4>
            <Link to="/login">Inicia sesión aquí</Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SignupPage;
