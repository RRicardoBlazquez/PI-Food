import style from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={style.container}>
      <img src={props.image} alt="not found" />
      <h2>{props.title} </h2>
      <h2>{props.diets} </h2>
    </div>
  );
}
