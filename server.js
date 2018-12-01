const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.locals.palettes = [];
app.locals.projects = [];

app.use(bodyParser.json());
app.use(express.static("public"));
app.locals.title = "Painters Palette";
app.set("port", process.env.PORT || 3000);

app.get("/api/v1/palettes", (request, repsonse) => {
  const palettes = app.locals.palettes;
  return response.status(200).json(palettes);
});

app.post("/api/v1/palettes", (request, response) => {
  const palette = request.body;

  for (let requiredParameter of [
    "name",
    "hex1",
    "hex2",
    "hex3",
    "hex4",
    "hex5"
  ]) {
    if (!palette[requiredparameter]) {
      return response.status(422).send({ error: "expected different params" });
    }
  }
  database("palettes")
    .insert(palette, "id")
    .then(palette => {
      response.status(201).json({ id: pallete[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/", (request, response) => {
  response.send("This is Painters Palette");
});

app.get("/api/v1/projects", (request, response) => {
  const projects = app.locals.projects;

  return response.status(200).json(projects);
});

app.get("/api/v1/project/:id", (request, response) => {
  const { id } = request.params;
  const project = app.locals.projects.find(project => project.id === id);
  if (project) {
    return response.status(200).json(project);
  } else {
    return response.sendStatus(404);
  }
});

app.post("/api/v1/projects", (request, response) => {
  const  project  = request.body;
  for (let requiredParameter of ["title"]) {
    if (!project[requiredparameter]) {
      return response
        .status(422)
        .send({ error: "There was no Project to add!" });
    }
  }

  database("projects")
    .insert(project, "id")
    .then(currentProj => {
      response.status(201).json({ id: currentProj[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/project/:project_id/palettes/", (request, response) => {
  database("palettes")
    .where("project_id", request.params.project_id)
    .select()
    .then(palettes);
});

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}`);
});
