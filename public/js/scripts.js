const generateRandomHex = () => {
  let possibleRandom = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];
  let hex = "#";
  for (var i = 0; i < 6; i++)
    hex += possibleRandom[Math.floor(Math.random() * 16)];
  return hex;
};

let visualHex1 = generateRandomHex();
let visualHex2 = generateRandomHex();
let visualHex3 = generateRandomHex();
let visualHex4 = generateRandomHex();
let visualHex5 = generateRandomHex();

$(".a").css("background-color", visualHex1);
$(".b").css("background-color", visualHex2);
$(".c").css("background-color", visualHex3);
$(".d").css("background-color", visualHex4);
$(".e").css("background-color", visualHex5);

$(".a").append(visualHex1);
$(".b").append(visualHex2);
$(".c").append(visualHex3);
$(".d").append(visualHex4);
$(".e").append(visualHex5);

const toggleLock = event => {
  let lockButton = $(event.target);
  let lockContainer = $(event.target.parentNode);

  lockButton.toggleClass("lock");
  lockContainer.toggleClass("disabled");
};

const generateColors = event => {
  event.preventDefault();

  for (var i = 1; i < 6; i++) {
    if (!$(`.${i}`).hasClass("disabled")) {
      $(`.${i}`).css("background-color", generateRandomHex());
    }
  }
};

const deleteProject = event => {
  event.preventDefault();
  let projectTarget = event.target.parentNode;
  if ($(projectTarget).hasClass("project-swatches")) {
    projectTarget.parentNode.removeChild(projectTarget);
  }
};

const savePalette = () => {
  event.preventDefault();
  let project_id = $("#project-select option:selected").attr("data-id");
  let name = $(".palette-name-input").val();
  let hex1 = $(".a").css("background-color");
  let hex2 = $(".b").css("background-color");
  let hex3 = $(".c").css("background-color");
  let hex4 = $(".d").css("background-color");
  let hex5 = $(".e").css("background-color");

  postPaletteToDB(project_id, name, hex1, hex2, hex3, hex4, hex5);

  let selectedProject = $("#project-select option:selected").attr("data-id");
  let savedProject = $(".list-name").attr("data-id");
  let paletteName = $(".palette-name-input").val();
  if (savedProject === selectedProject) {
    $(".list-name").append(`
    <div class='project-swatches'>
    <p class='swatch-name'>${paletteName}</p>
      <div 
        class='swatch1' 
        style="background-color:${$(".a").css("background-color")};">
      </div>
      <div 
        class='swatch2' 
        style="background-color:${$(".b").css("background-color")};">
      </div>
      <div 
        class='swatch3' 
        style="background-color:${$(".c").css("background-color")};">
      </div>
      <div 
        class='swatch4' 
        style="background-color:${$(".d").css("background-color")};">
      </div>
      <div 
        class='swatch5' 
        style="background-color:${$(".e").css("background-color")};">
      </div><button class='trash-btn'></button>
    </div>`);
  }
};

const postPaletteToDB = async (
  projectId,
  paletteName,
  hex1,
  hex2,
  hex3,
  hex4,
  hex5
) => {
  try {
    const response = fetch(`api/v1/palettes`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({
        name: paletteName,
        hex1,
        hex2,
        hex3,
        hex4,
        hex5,
        project_id: projectId
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    const data = response.json();
    console.log(data);
  } catch (e) {
    throw Error("another thing went wrong");
  }
};

$(".save-palette").click(() => {
  savePalette();
});

const ProjectFromDB = () => {};
const clearProjectInput = () => {
  $(".project-name-input").val("");
};

const saveProject = async id => {
  try {
    const response = await fetch(`/api/v1/projects/${id}`);
    var projectData = await response.json();
  } catch (e) {
    throw new Error("something else went wrong");
  }

  projectData = projectData.reduce((acc, project) => {
    acc = { ...project };

    return acc;
  }, {});

  let projectName = `<li class='list-name' data-id='${
    projectData.id
  }'><p class='project-name'> ${projectData.title} </p></li>`;
  $(".projects").append(projectName);

  const projectTitle = $(".project-name-input").val();
  $("#project-select").append(
    `<option value="${projectData.title}" data-id='${projectData.id}'>${
      projectData.title
    }</option>`
  );
};

const postProjectToDB = async projectName => {
  try {
    const response = await fetch("/api/v1/projects", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      body: JSON.stringify({ title: projectName }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    var data = await response.json();
  } catch (e) {
    throw new Error("something went wrong");
  }
  saveProject(data.id);
};

$(".project-create-button").click(() => {
  let name = $(".project-name-input").val();
  postProjectToDB(name);
  clearProjectInput();
});

$(".projects").click(() => {
  deleteProject(event);
});

$(".mix-button").click(() => {
  generateColors(event);
});

$(".unlock").click(() => {
  toggleLock(event);
});
