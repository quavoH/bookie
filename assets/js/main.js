// ======= API KEY ==========
const apiKey = "0866fdd1eed3936874aaafce167e3a78";
const container = document.querySelector(".container");

/*===== EXPANDER MENU  =====*/
const showMenu = (toggleId, navbarId) => {
  const toggle = document.getElementById(toggleId);
  const navbar = document.getElementById(navbarId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("expander");
    });
  }
};
showMenu("nav-toggle", "navbar");

/*===== LINK ACTIVE  =====*/
const linkColor = document.querySelectorAll(".nav__link");
function colorLink() {
  linkColor.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}
linkColor.forEach((l) => l.addEventListener("click", colorLink));

/*===== COLLAPSE MENU  =====*/
const linkCollapse = document.getElementsByClassName("collapse__link");
var i;

for (i = 0; i < linkCollapse.length; i++) {
  linkCollapse[i].addEventListener("click", function () {
    const collapseMenu = this.nextElementSibling;
    collapseMenu.classList.toggle("showCollapse");

    const rotate = collapseMenu.previousElementSibling;
    rotate.classList.toggle("rotate");
  });
}

// ====== GET LINK FROM API AND BUILD HTML STRUCTURE ======
async function getLink(link) {
  await fetch(`http://api.linkpreview.net/?key=${apiKey}&q=${link}`, {
    method: "GET",
    mode: "cors",
  }).then((res) => {
    if (res.status === 200) {
      res.json().then((response) => {
        if (response.image === '') {
          response.image = 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';
        }

        alert(' 👍 Link Found! Bookmark will be added shortly')

        let bookmark = document.createElement("div");
        bookmark.className = "bookmark";

        let imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        let img = document.createElement("img");
        img.id = "image";
        img.src = response.image;

        let titleContainer = document.createElement("div");
        titleContainer.className = "title-container";

        let titleContainerSpan = document.createElement("span");
        titleContainerSpan.textContent = "Title: ";

        let titleContainerP = document.createElement("p");
        titleContainerP.id = "title";
        titleContainerP.textContent = response.title;
        titleContainerP.style.fontWeight = "normal";

        let descContainer = document.createElement("div");
        descContainer.className = "desc-container";

        let descContainerSpan = document.createElement("span");
        descContainerSpan.textContent = "Desc: ";

        let descContainerP = document.createElement("p");
        descContainerP.id = "desc";
        descContainerP.textContent = response.description;
        descContainerP.style.fontWeight = "normal";

        let actionsContainer = document.createElement("div");
        actionsContainer.className = "actions-container";

        let actionsContainerSpan1 = document.createElement("span");
        let actionsContainerSpan1a = document.createElement("a");
        actionsContainerSpan1a.className = "open-link";
        actionsContainerSpan1a.id = "open-link";
        actionsContainerSpan1a.href = response.url;
        actionsContainerSpan1a.target = "_blank";
        actionsContainerSpan1a.textContent = "Open Link";

        let actionsContainerSpan2 = document.createElement("span");
        let actionsContainerSpan2button = document.createElement("button");
        actionsContainerSpan2button.className = "remove";

        let trashIcon = document.createElement("ion-icon");
        trashIcon.name = "trash-outline";

        // ======== APPENDING DOM ELEMENTS ==========
        bookmark.appendChild(imageContainer);
        imageContainer.appendChild(img);
        imageContainer.appendChild(titleContainer);
        imageContainer.appendChild(descContainer);
        imageContainer.appendChild(actionsContainer);

        titleContainer.appendChild(titleContainerSpan);
        titleContainer.appendChild(titleContainerP);

        descContainer.appendChild(descContainerSpan);
        descContainer.appendChild(descContainerP);

        actionsContainer.appendChild(actionsContainerSpan1);
        actionsContainerSpan1.appendChild(actionsContainerSpan1a);
        actionsContainer.appendChild(actionsContainerSpan2);
        actionsContainerSpan2.appendChild(actionsContainerSpan2button);
        actionsContainerSpan2button.appendChild(trashIcon);

        container.appendChild(bookmark);
      });
    } else {
      alert("Link can't be found");
    }
  });


}

// GET USER INPUT
const addButton = document.getElementById("add-btn");
const inputField = document.getElementById("input-field");

function addToBookmarks() {
  let fieldValue = inputField.value;
  getLink(fieldValue);
  inputField.value = "";
}

addButton.addEventListener("click", addToBookmarks);
