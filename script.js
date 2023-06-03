
let container = document.createElement('div');
container.setAttribute('class', 'content-fluid')
let h1 = document.createElement('h1')
h1.innerHTML = "POKEMONS";
container.append(h1);
document.body.appendChild(container);

let contain = document.createElement('div');
contain.setAttribute('class', 'container-sm-12');

let row = document.createElement('div')
row.setAttribute('class', 'row text-center')
row.setAttribute('class', "row row-cols-3 row-cols-md-6 g-6 sm-2 m-4")
container.append(row);

let containbody = document.createElement('div');
containbody.setAttribute('class', 'container containbody')
var image = document.createElement('img');
image.setAttribute('class', 'img-fluid w-50 image')
image.setAttribute('title', `click card to see details`);
image.setAttribute('src', `charlie-img.jpg`)
containbody.appendChild(image)

document.body.appendChild(containbody);
// containbody.style.display = "block";
async function getPokemonNames() {
    try {
        let res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        let data = await res.json();

        let pageContent = data.results;
        getPokemonData(pageContent, 1);
        //  To create page buttons
        function createButtons(name) {
            let ButtonName = name;
            ButtonName = document.createElement("button");
            ButtonName.setAttribute("id", `${name}`);
            ButtonName.setAttribute("name", "pageButtons");
            ButtonName.setAttribute("class", "btn rounded");
            ButtonName.innerText = `${name}`;
            return ButtonName;
        }

        let buttonBox = document.createElement("div");
        buttonBox.classList.add("buttons");
        buttonBox.setAttribute("id", "allButtons");
        const pages = ["First", "Previous"];
        for (let i = 1; i <= 10; i++) pages.push(i);
        pages.push("Next");
        pages.push("Last");
        for (let buttons of pages) {
            buttons = createButtons(buttons);
            buttonBox.append(buttons);
        }
        document.body.append(buttonBox);
        // adding page click functionality
        const btngroup = document.getElementsByName("pageButtons");
        let currentPage = 1;
        for (let buttons of btngroup) {
            buttons.addEventListener("click", () => {
                let temp = document.getElementById(currentPage.toString());
                let pageNumber;

                row.innerHTML = ``;
                switch (buttons.id) {
                    case "First":
                        pageNumber = 1;
                        currentPage = 1;
                        break;
                    case "Last":
                        pageNumber = 10;
                        currentPage = 10;
                        break;
                    case "Previous":
                        if (currentPage > 1) {
                            pageNumber = currentPage - 1;
                            currentPage = currentPage - 1;
                        } else {
                            pageNumber = currentPage;
                        }
                        break;
                    case "Next":
                        if (currentPage < 10) {
                            pageNumber = currentPage + 1;
                            currentPage = currentPage + 1;
                        } else {
                            pageNumber = currentPage;
                        }
                        break;
                    default:
                        currentPage = parseInt(buttons.id);
                        pageNumber = currentPage;
                }
                let finish = document.getElementById(pageNumber);
                temp.classList.remove("active");

                finish.classList.add("active")
                getPokemonData(pageContent, pageNumber);
            });
        }
    } catch (err) {
        console.error(err);
    }
}
getPokemonNames();
async function getPokemonData(arrayData, page) {
    try {
        let start = page * 5 - 5;
        let end = page * 5;
        arrayData = arrayData.slice(start, end);
        arrayData.forEach(async (element) => {
            let pokemonName = element.name;

            // contentDiv.innerHTML = ``;
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            let data = await res.json();
            let card = document.createElement('div')
            card.setAttribute('class', 'card');
            card.setAttribute('title', 'click here');
            let cardheader = document.createElement('div')
            data.forms.forEach(element => {

                cardheader.setAttribute('class', 'card-header text-center');
                cardheader.innerHTML = `${element.name}`
                card.appendChild(cardheader)
            })

            let cardbody = document.createElement('div');
            cardbody.setAttribute('class', 'card-body');
            var img = document.createElement('img');
            img.setAttribute('class', 'img-fluid img')
            img.setAttribute('title', `${data.name}`);
            img.setAttribute('src', `${data.sprites.other.dream_world.front_default}`)
            cardbody.appendChild(img)
            card.append(cardbody)

            card.addEventListener('click', function (event) {
                contain.innerHTML = '';
                containbody.style.display = "none";
                let row1 = document.createElement('div');
                row1.setAttribute('class', 'row row1 row-md-12 w-50 text-center')
                let col1 = document.createElement('div');
                col1.setAttribute('class', 'col-md-6');
                row1.innerHTML = '';
                let p1 = document.createElement('p');
                p1.innerHTML = `${data.name}`
                col1.appendChild(p1)
                var img1 = document.createElement('img');
                img1.setAttribute('class', 'img-fluid img1')
                img1.setAttribute('title', `${data.name}`);
                img1.setAttribute('src', `${data.sprites.other.dream_world.front_default}`)
                col1.appendChild(img1)

                let ul = document.createElement('ul')
                ul.innerHTML = "Abilities"
                ul.setAttribute('class', 'ul')

                data.abilities.forEach(element => {
                    let li = document.createElement('li');
                    li.setAttribute('class', 'text-right');
                    li.innerHTML = `${element.ability.name}`;
                    ul.appendChild(li)
                });
                col1.append(ul)

                let p = document.createElement('p');
                p.innerHTML = `weight:${data.weight}`
                col1.appendChild(p)
                row1.appendChild(col1)

                let col2 = document.createElement('div');
                col2.setAttribute('class', 'col-md-6 col2');

                let ul1 = document.createElement('ul')
                ul1.innerHTML = "moves"
                ul1.setAttribute('class', 'ul1')

                let table = document.createElement('table');
                data.moves.forEach(element => {
                    let li1 = document.createElement('li');
                    li1.setAttribute('class', 'text-center');
                    li1.innerHTML = `${element.move.name}`;
                    ul1.appendChild(li1);
                    // table.appendChild(ul1)
                    col2.appendChild(ul1)
                });
                row1.appendChild(col2)
                contain.appendChild(row1)

                container.appendChild(contain)

            })
            row.appendChild(card);

        });
    } catch (error) {
        console.error('error')
    }
}
