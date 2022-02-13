const selectSet = document.getElementById("selectSet")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton")

const cardGrid = document.getElementsByClassName("cardGrid")[0]

function search() {
    var set = ""
    var input = ""

    if (selectSet.value != "selectSet") {
        set = `set.id:${selectSet.value}`
    }

    input = `name:${searchInput.value}*`

    fetch(`https://api.pokemontcg.io/v2/cards?q=${set} ${input}`).then(response => response.json().then(cards => {
        Array.from(cardGrid.children).forEach(card => {
            card.remove()
        })

        Array.from(cards.data).forEach(card => {
            const cardContainer = document.createElement("div")
            cardContainer.className = "cardContainer"; cardGrid.append(cardContainer)

            const cardImage = document.createElement("img")
            cardImage.className = "cardImage"; cardContainer.append(cardImage); cardImage.src = card.images.small

            const cardName = document.createElement("h1")
            cardName.className = "cardName"; cardContainer.append(cardName); cardName.textContent = card.name

            const cardSet = document.createElement("h1")
            cardSet.className = "cardSet"; cardContainer.append(cardSet); cardSet.textContent = `${card.set.series.toUpperCase()}: ${card.set.name}`

            const cardRarity = document.createElement("h1")
            cardRarity.className = "cardRarity"; cardContainer.append(cardRarity); cardRarity.textContent = `${card.rarity} - #${card.number.replace("/[^.\d]/g", "")}/${card.set.total}`

            const viewListings = document.createElement("button")
            viewListings.className = "viewListings"; cardContainer.append(viewListings); viewListings.textContent = "View Listings"
        });
    }))
}

fetch("https://api.pokemontcg.io/v2/sets").then(response => response.json().then(sets => {
    Array.from(sets.data).forEach(set => {
        const setOption = document.createElement("option")
        selectSet.append(setOption); setOption.value = set.id; setOption.textContent = set.name
    });
}))

searchButton.addEventListener("click", search)