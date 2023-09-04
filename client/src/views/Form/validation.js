export const validate = (form) => {
  const errors = {};
  if (form.title.length < 5 || form.title.length > 100) {
    errors.title =
      "The title must have more than 5 characters and less than 100";
  } else {
    form.title.split(/[ ,]+/).forEach((element) => {
      if (element.length > 23)
        errors.title = "words cannot be longer than 23 characters";
    });
  }

  if (form.summary.length < 5 || form.summary.length > 1000)
    errors.summary =
      "The summary must have more than 5 characters and less than 1 thousand";
  else {
    let control = form.summary.split(/[ ,]+/);
    control.forEach((element) => {
      if (element.length > 23)
        errors.summary = "words cannot be longer than 23 characters";
    });
  }
  if (
    form.healthScore === undefined ||
    form.healthScore > 100 ||
    form.healthScore <= 0
  )
    errors.healthScore = "Health Score between 1 and 100";
  if (form.steps.length < 5 || form.steps.length > 500)
    errors.steps =
      "Must have at least one preparation step between 5 and 500 characters";
  else {
    let control = form.steps.split(/[ ,]+/);
    control.forEach((element) => {
      if (element.length > 23)
        errors.steps = "words cannot be longer than 23 characters";
    });
  }

  if (!/.(gif|jpeg|jpg|png)$/i.test(form.image))
    errors.image = "Check that the formats are .gif, .jpeg, .jpg y .png";

  return errors;
};
