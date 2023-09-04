import { useEffect, useState } from "react";
import style from "./Form.module.css";
import { validate } from "./validation";
import axios from "axios";
import Diets from "../../components/Diets/Diets";
const URL_BASE = "http://localhost:3001/";

function Form() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: "",
    steps: "",
    diets: [],
  });

  useEffect(() => {
    setForm({
      title: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: "",
      diets: [],
    });
  }, []);

  const [errors, setErrors] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();
    setErrors(validate(form));
    if (Object.keys(validate(form)).length === 0)
      axios
        .post(`${URL_BASE}recipes`, { ...form })
        .then((response) => {
          alert("La receta fue creada exitosamente");
          setIsSubmitted(true);
          setForm({
            ...Form,
            title: "",
            image: "",
            summary: "",
            healthScore: "",
            steps: "",
            diets: [],
          });
          setErrors({});
        })
        .catch((error) => alert(error));
    else alert("Completar correctamente los campos del formulario");
  };
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
    if (Object.keys(errors).length === 0) setIsSubmitted(false);
  };
  const handlerSelect = (event) => {
    const { value } = event.target;
    form.diets.includes(value) !== true
      ? setForm({ ...form, diets: [...form.diets, value] })
      : setForm({
          ...form,
          diets: form.diets.filter((dieta) => dieta !== value),
        });
  };

  let listForm = Object.keys(form).map((prop, index) => {
    return (
      <div key={index} className={style.containerInputs}>
        <label className={style.text}>
          {prop.charAt(0).toUpperCase() + prop.slice(1)}
          <input
            className={style.input}
            type={prop === "healthScore" ? "number" : "text"}
            name={prop}
            value={form[prop]}
            placeholder={`${prop}...`}
            onChange={changeHandler}
          />
        </label>
        {errors[prop] && <p className={style.danger}>{errors[prop]}</p>}
      </div>
    );
  });

  return (
    <form className={style.container} onSubmit={submitHandler}>
      {listForm.slice(0, 5)}
      <div>
        <label className={style.text} name="diets">
          Diets{" :"}
        </label>
        <Diets handlerSelect={handlerSelect} dependence={form.diets} />
      </div>
      <button
        className={style.button}
        onClick={submitHandler}
        type="submit"
        disabled={isSubmitted}
      >
        Created
      </button>
    </form>
  );
}

export default Form;
