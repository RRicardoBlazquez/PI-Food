import { useParams } from "react-router-dom";
import style from "./Detail.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
const URL_BASE = "http://localhost:3001/";

function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`${URL_BASE}recipes/${id}`).then(({ data }) => {
      if (data.title) setCharacter({ ...data });
    });
    return setCharacter({});
  }, [id]);

  function RecipeSummary({ summary }) {
    return <div dangerouslySetInnerHTML={{ __html: summary }} />;
  }
  function RecipeSteps({ steps }) {
    return (
      <div className={style.containerSteps}>
        {steps?.map((pasos, index) => {
          return (
            <div key={index} className={style.step}>
              <h3 className={style.title}>Step number:{pasos.number} </h3>
              <p>{pasos.step}</p>
              <div className={style.containerIngredientes}>
                <h4 className={style.title}>Ingredients: </h4>
                {pasos.ingredients?.map((i) => {
                  return (
                    <div className={style.ingrediente}>
                      <span>{i.name},</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={style.container}>
      {character ? (
        <div className={style.containerCards}>
          <div className={style.containerGeneral}>
            <picture className={style.containerImagen}>
              <img className={style.imagen} src={character.image} alt="" />
            </picture>
            <div className={style.detalle}>
              <h2 className={style.title}>{character.title}</h2>
              <h2 className={style.title}>
                HealthScore : {character.healthScore}
              </h2>
              <h2 className={style.title}>
                Diets:{" "}
                {character.created !== true
                  ? new Intl.ListFormat("en").format(character.diets)
                  : new Intl.ListFormat("en").format(
                      character.diets.map((d) => d.name)
                    )}
              </h2>
            </div>
          </div>
          <div className={style.containerText}>
            <h2 className={style.title}>Description</h2>

            {character?.created !== true ? (
              <RecipeSummary summary={character.summary} />
            ) : (
              <p>{character.summary} </p>
            )}

            <h2 className={style.title}>Steps</h2>
            {character?.created !== true ? (
              <RecipeSteps steps={character.steps} />
            ) : (
              <p>{character.steps}</p>
            )}
          </div>
        </div>
      ) : (
        <h1>cargando...</h1>
      )}
    </div>
  );
}

export default Detail;
