let selectBtn = document.querySelector(".select-btn")
let option = document.querySelector(".options")
let searchInput = document.querySelector("#input")
let content = document.querySelector(".content")
let arrow = document.querySelector(".arrow")

let countries = []

function addCountry(selectedC) {
  fetch("countries.json")
    .then((country) => {
      return country.json()
    })
    .then((data) => {
      let countries = data.country
      // console.log(countries)
      option.innerHTML = ""
      data.country.forEach((e) => {
        let isSelected = e == selectedC ? "selected" : ""
        option.insertAdjacentHTML(
          "beforeend",
          `<li onclick = 'updateName(this)' class = '${isSelected}'>${e}</li>`
        )

        // filter
        searchInput.addEventListener("keyup", () => {
          let arr = []
          let searchedVal = searchInput.value.toLowerCase()

          arr = countries
            .filter((contry) => {
              return contry.toLowerCase().startsWith(searchedVal)
            })
            .map((data) => `<li onclick = 'updateName(this)'>${data}</li>`)
            .join("")
          option.innerHTML = arr ? arr : `<p>Oops! Country not found</p>`
        })
      })
    })
}

addCountry()

function updateName(selectedLi) {
  searchInput.value = ""
  addCountry(selectedLi.innerText)
  content.classList.remove("show-content")
  arrow.classList.remove("rotate")
  selectBtn.firstElementChild.innerText = selectedLi.innerText
}

selectBtn.addEventListener("click", () => {
  content.classList.toggle("show-content")
  arrow.classList.toggle("rotate")
})
