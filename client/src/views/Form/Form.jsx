import { useState } from "react";
import "./Form.module.css";
import { validate } from "./validation";
import axios from "axios";
const URL_BASE = "http://localhost:3001/";

function Form() {
  const [form, setForm] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: undefined,
    steps: [],
    diets: [],
  });

  const [errors, setErrors] = useState({
    title: "",
    image: "",
    summary: "",
    healthScore: undefined,
    steps: [],
    diets: [],
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setErrors(validate({ ...form, [property]: value }));
    setForm({ ...form, [property]: value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const newRecipe = axios.post(`${URL_BASE}/recipes`, form);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">title: </label>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Title..."
          onChange={changeHandler}
          
        />
        <p className="">{ errors.title }</p>
      </div>
      {/* <div>
        <label>image</label>
        <input
          type="text"
          value={form.image}
          onChange={changeHandler}
          name="image"
        />
      </div> */}
      <div>
        <label>summary: </label>
        <input
          type="text"
          value={form.summary}
          placeholder="summary"
          onChange={changeHandler}
          name="summary"
        />
      </div>
      <div>
        <label>esta es la Form page</label>
        <input
          type="text"
          value={form.healthScore}
          onChange={changeHandler}
          name="healthScore"
        />
      </div>
    </form>
  );
}

export default Form;
