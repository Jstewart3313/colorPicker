const express = require("express");
//pulling express from library
const app = express();
//calling express to create instance of app
const bodyParser = require("body-parser");
//pulling in bodyparser
const environment = process.env.NODE_ENV || "development";
//declaring the environment in which we are in
const configuration = require("./knexfile")[environment];
//pulling in knex && referencing environment variable
const database = require("knex")(configuration);
//declring databse pulling in knex && referencing configuration

app.use(bodyParser.json());
//calling app.use on bodyParser to allow flow of information within server and databasek
app.use(express.static("public"));
//allows to display static hmtml onto page from public file
app.set("port", process.env.PORT || 3000);
//setting port to whatever specified in the environment OR 3000

app.get("/api/v1/palettes", (request, repsonse) => {
  database("palettes")
    .select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
//this is how i recieve all palettes from the palettes DB. references the palettes DB with the select method. grabs the promise that is resolved with .then and returns a status 200 or the .catch with a 500 server error

app.post("/api/v1/palettes", (request, response) => {
  const palette = request.body;

  for (let requiredParameter of [
    "name",
    "hex1",
    "hex2",
    "hex3",
    "hex4",
    "hex5",
    "project_id"
  ]) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: "expected different params" });
    }
  }
  database("palettes")
    .insert(palette, "id")
    .then(palette => {
      response.status(201).json({ id: palette[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//This is how you post a palette to the DB. grabbing the request body and assigning that to palette. checking params in the for/let/of. if palette has anything other than requiredParams than 422 error. else reference the palette DB and insert the palette variable with an id. if all goes well. return the ID of the palette added. if not, give back a 500 server error.

app.get("/", (request, response) => {
  response.send("This is Painters Palette");
});

//simple end point to show that the server is running. 

app.get("/api/v1/projects", (request, response) => {
  database("projects")
    .select()
    .then(projects => {
      response.status(200).json(projects);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//this is how i receive back all projects. reference the projects DB. use the select method that returns a promise. resolve the promise with .then and return all projects. .catch 500 something went wrong within the server.

app.get("/api/v1/projects/:id", (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({
          error: `Could not find project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({error});
    })
})
//this is how you get a specific project out of the DB. Reference the DB. WHERE the id passed through the params is evaluated and equals the ID of a project in the DB. select that project and return it with a status 200. else catch the 500 server side error.

app.post("/api/v1/projects", (request, response) => {
  const project = request.body;
  for (let requiredParameter of ["title"]) {
    if (!project[requiredParameter]) {
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
//This is how you post a project to the DB. This assigns project to request.body. checks required params of title.if no title, give the 422 error, because not the right params. if there is a title insert project to the prject DB and return the ID assigned to that project upon insertion. else catch the 500 error.

app.get("/api/v1/project/:project_id/palettes/", (request, response) => {
  database("palettes")
    .where("project_id", request.params.project_id)
    .select()
    .then(palettes);
});

//this is how you ge the palettes for a specific project. reference the palettes DB where the project ID passed through the params matches the foreign ID of the palette. return all palettes associated with that foreign ID.

app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on ${app.get("port")}`);
});

//Listen to the port we set above, and console.log the message to let the developer knwo we are good to go!!
