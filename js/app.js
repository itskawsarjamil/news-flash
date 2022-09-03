const loadNavbar = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNavbar(data.data.news_category));
}
let arr = [];
const showNavbar = array => {
    const navBar = document.getElementById('navbar-nav');
    navBar.textContent="";
    navBar.innerHTML =
        `
        <a class="nav-link fs-5 mx-3" aria-current="page" href="#">Home</a>
        `;
    arr = array;
    // console.log(arr);
    array.forEach(ar => {
        console.log(ar);
        const anchorDiv=document.createElement('div');

            anchorDiv.innerHTML =
            `
            <a class="nav-link fs-5 mx-3" aria-current="page" href="#">${ar.category_name}</a>
            `;
            navBar.appendChild(anchorDiv);
    }
    )
}

loadNavbar();