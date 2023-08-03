export const validate = (form) => {
  const errors = {};
  if (form.title.length < 5)
    errors.title = "Eltitulo debe tener mas de 5 caracteres";
  /* if (form.image.length === 0) errors.image = "Imagen vacia"; */
  if (form.summary.length < 5)
    errors.summary = "El resumen debe tener más de 5 caracteres";
  if (
    form.healthScore === undefined ||
    form.healthScore > 100 ||
    form.healthScore < 0
  )
    errors.healthScore =
      "La puntuación de comida saludable debe ser un numero entre 0 y 100";
  if (form.steps.length < 1)
    errors.steps = "Debe tener al menos un paso de preparacion";
};
