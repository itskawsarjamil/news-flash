const loadNavbar = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNavbar(data.data.news_category))
        .catch(error => console.log(error));
}
let arr = [];
const showNavbar = array => {
    const navBar = document.getElementById('navbar-nav');
    navBar.textContent = "";

    arr = array;
    let tempo = 0;
    array.forEach(ar => {
        // console.log(ar);
        const anchorDiv = document.createElement('div');

        anchorDiv.innerHTML =
            `
            <a class="nav-link fs-5 mx-3" aria-current="page" href="#"  onclick="cardshow('${ar.category_id}' ,'${ar.category_name}',${tempo})">${ar.category_name}</a>
            `;
        navBar.appendChild(anchorDiv);
        tempo++;
    }
    )
}

let before = -1;

const navselect = (temp) => {

    if (before != temp) {
        const btnselect = document.getElementsByClassName('nav-link')[temp];
        btnselect.classList.add('selected');

        if (before != -1) {
            const btnselect = document.getElementsByClassName('nav-link')[before];
            btnselect.classList.remove('selected');
        }
        before = temp;
    }

}

const cardshow = (id, name, tempo) => {
    navselect(tempo);

    const catagoryName = document.getElementById('catagory-name');
    catagoryName.innerText = `for ${name} catagory`;
    const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url2)
        .then(res => res.json())
        .then(data => displayCard(data.data, data.data.length))
        .catch(error => console.log(error));

}

const displayCard = (info, count) => {
    const totalCard = document.getElementById('total-card');
    totalCard.innerText = count;
    // console.log(info);
    const cardSection = document.getElementById('card-section');
    cardSection.textContent="";
    for (const data of info) {
        console.log((data));

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'm-4', 'p-4','mh-25');
        cardDiv.innerHTML =
            `
            <div class="row g-0">
            <div class="col-md-4">
                <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text overflowclass">${data.details}</p>

                </div>
                <div id="author" class="d-flex justify-content-between align-items-center ">
                    <div class="d-flex ">
                        <img src="${data.author.img?data.author.img:'not found'}" alt="" class="img-fluid rounded author-img">
                        <div class="d-flex flex-column justify-content-center text-center align-items-center ms-2">
                            <p class="m-0">${data.author.name?data.author.name:'not found'}</p>
                            <span>${data.author.published_date?data.author.published_date:'not found'}</span>
                        </div>
                    </div>
                    <div class="d-flex ">
                        <i class="fa-regular fa-eye pt-2"></i>
                        <p class="pt-1 ms-1">${data.total_view?data.total_view:'not shown'}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-star-sharp-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
        cardSection.appendChild(cardDiv);
    }
}

loadNavbar();