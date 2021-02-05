const form = document.querySelector("#search-form");
const mainContent = document.querySelector("main");
const resultTag = document.querySelector("h2");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mainContent.innerHTML = "";
    const term = form.elements.query.value;
    const result = await fetch(`http://api.tvmaze.com/search/shows?q=${term}`);
    const data = await result.json();
    for(let show of data) {
        const card = generateCard(show);
        mainContent.append(card);
    }
    resultTag.classList.remove("hide")
    form.elements.query.value = "";
    console.dir(data);
})

const generateCard = (data) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("container");
    const image = document.createElement("img");
    try {
        image.src = data.show.image.medium;
    } catch (error) {
        image.src = "images/not_available.png";
    }
    image.width = 210;
    image.height = 295;
    const title = document.createElement("a");
    title.innerHTML = data.show.name;
    title.href = "more-info.html";
    card.appendChild(image);
    card.appendChild(title);
    return card;

}