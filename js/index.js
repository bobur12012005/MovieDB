import { movies } from "./db.js";

let modal = document.querySelector('#modal')
let close_modal = document.querySelector('.close_button')
let container = document.querySelector('.promo__interactive-list')
let iframe = document.querySelector('.promo__bg iframe')
let m_title = document.querySelector('.modal_title')
let m_genre = document.querySelector('.modal_genre')
let m_plot = document.querySelector('.modal_plot')
let m_imdb = document.querySelector('.imdb')
let m_knp = document.querySelector('.knp')
let m_img = document.querySelector('#modal img')
let m_delete = document.querySelector('#delete')
let menu_genres = document.querySelector('.promo__menu-list ul')
let search = document.querySelector('.header__search input')

let genres = ["All"]
movies.forEach(movie => {
    genres.push(movie.Genre)
})
let unique_genres = [...new Set(genres)]

unique_genres.forEach(genre => {
    let li_genre = document.createElement('li')
    li_genre.innerHTML = genre
    li_genre.classList.add('promo__menu-item')
    li_genre.onclick = () => {
        document.querySelectorAll('.promo__menu-item').forEach(item => {
            item.classList.remove('promo__menu-item_active')
        })
        li_genre.classList.add('promo__menu-item_active')

        let filteredMovies = movies.filter(movie => {
            return genre === "All" ? true : movie.Genre === genre
        })

        reload(filteredMovies, container)
    }
    menu_genres.append(li_genre)
    menu_genres.firstChild.classList.add('promo__menu-item_active')
})


function reload(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let idx = arr.indexOf(item)
        let li = document.createElement('li')

        li.classList.add('li_dec')
        li.style.cursor = 'pointer'
        li.innerHTML = `${idx + 1}. ${item.Title}`

        li.onmouseenter = () => {
            li.style.textDecoration = 'underline 2px #FFD500'
        }
        li.onmouseleave = () => {
            li.style.textDecoration = 'underline 2px #bcbcbc'
        }

        li.onclick = () => {
            iframe.src = item.Trailer + "?autoplay=1"
        }

        li.ondblclick = () => {
            modal.style.display = 'flex'
            m_img.src = item.Poster
            m_title.style.backgroundImage = `url(${item.Poster})`
            m_title.innerHTML = item.Title
            m_genre.innerHTML = item.Genre
            m_plot.innerHTML = item.Plot
            m_imdb.innerHTML = "IMDB: " + item.imdbRating
            m_knp.innerHTML = "Metascore: " + item.Metascore

            m_delete.onclick = () => {
                modal.style.display = 'none'
                li.remove()
            }

            close_modal.onclick = () => {
                modal.style.display = 'none'
            }
        }
        place.append(li)
    }
}

reload(movies, container)

search.oninput = () => {
    let searchValue = search.value.toLowerCase()

    let filteredMovies = movies.filter(movie => {
        return movie.Title.toLowerCase().includes(searchValue)
    })

    reload(filteredMovies, container)
}