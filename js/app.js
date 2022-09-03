const loadNavbar = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNavbar(data.data.news_category))
        .catch(error => console.log(error));
}

const showNavbar = array => {
    const navBar = document.getElementById('navbar-nav');
    navBar.textContent = "";

    let tempo = 0;
    array.forEach(ar => {
        
        const anchorDiv = document.createElement('div');

        anchorDiv.innerHTML =
            `
            <a class="nav-link fs-5 mx-3" aria-current="page" href="#"  onclick="cardshow('${ar.category_id}' ,'${ar.category_name}',${tempo})">${ar.category_name}</a>
            `;
        navBar.appendChild(anchorDiv);
        tempo++;
    }
    )
    // cardshow('01', 'Breaking News', 0);
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
    tglSpinr(true);
    navselect(tempo);
    
    const catagoryName = document.getElementById('catagory-name');
    catagoryName.innerText = `for ${name} catagory`;
    const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`;

    fetch(url2)
        .then(res => res.json())
        .then(data => displayCard(data.data, data.data.length))
        .catch(error => console.log(error));

}

function objSort(objects) {
    var len1 = objects.length;
    var len2 = len1 - 1;
    for (var i = 0; i < len2; i++) {
        // var aview = objects[i].total_view;
        for (var j = i + 1; j < len1; j++) {
            // var bview = objects[j].total_view;
            if ((objects[i].total_view) < (objects[j].total_view)) {
                var temp = objects[i];
                objects[i] = objects[j];
                objects[j] = temp;
            }
        }
    }
    return objects;

}

const displayCard = (inf, count) => {
    const totalCard = document.getElementById('total-card');
    totalCard.innerText = count;
    
    const cardSection = document.getElementById('card-section');
    cardSection.textContent = "";
    let info = JSON.parse(JSON.stringify(inf));
    
    info = objSort(info);
    

    for (const data of info) {
        

        const cardDiv = document.createElement('div');
        // cardDiv.classList.add('card', 'm-4', 'p-4', 'mh-25');
        cardDiv.innerHTML =
            `
            <div class="card m-4 p-4 mh-25"  data-bs-toggle="modal" data-bs-target="#newsDetailModal" onclick="loadnewsDetails('${data._id}')">
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
                        <img src="${data.author.img ? data.author.img : 'not found'}" alt="" class="img-fluid rounded author-img">
                        <div class="d-flex flex-column justify-content-center text-center align-items-center ms-3">
                            <p class="m-0">${data.author.name ? data.author.name : 'not found'}</p>
                            <span>${data.author.published_date ? data.author.published_date : 'not found'}</span>
                        </div>
                    </div>
                    <div class="d-flex ">
                        <i class="fa-regular fa-eye pt-2"></i>
                        <p class="pt-1 ms-1 mb-0">${data.total_view ? data.total_view : 'not shown'}</p>
                    </div>
                    <div class="d-none d-sm-block">
                        <i class="fa-solid fa-star-sharp-half-stroke"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="d-none d-sm-block">
                        <i class="fa-solid fa-arrow-right text-violate"></i>
                    </div>
                </div>
            </div>
        </div>
            </div>
    `;
        cardSection.appendChild(cardDiv);
        tglSpinr(false);
    }
}
const tglSpinr = isWhat => {
    const loaderSection = document.getElementById('loader');
    if (isWhat) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadnewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displaynewsDetails(data.data[0]);
}


const displaynewsDetails = news => {
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = news.title;
    const newsDetails = document.getElementById('news-details');
    
    newsDetails.innerHTML = `
        <img src="${news.image_url}" class="img-fluid" alt="">
        <p>${news.details}</p>
        <p>Author: ${news.author.name?news.author.name:'not found'}</p>
        <p>Published: ${news.published_date?news.published_date:'not found'}</p>
        <p>rating: ${news.rating.number?news.rating.number:'not shown'}</p>
        <p>Total View: ${news.total_view?news.total_view:'not shown'}</p>
        `
}


loadNavbar();