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
    array.forEach(ar => {
        // console.log(ar);
        const anchorDiv = document.createElement('div');

        anchorDiv.innerHTML =
            `
            <a class="nav-link fs-5 mx-3" aria-current="page" href="#"  onclick="cardshow('${ar.category_id}' ,'${ar.category_name}')">${ar.category_name}</a>
            `;
        navBar.appendChild(anchorDiv);
    }
    )
}

const cardshow =(id ,name)=> {
    // console.log('id:',id,'name:',name);
    const catagoryName=document.getElementById('catagory-name');
    catagoryName.innerText=name;
    const url2 = `https://openapi.programming-hero.com/api/news/category/${id}`;
    
    fetch(url2)
        .then(res => res.json())
        .then(data => displayCard(data.data,data.data.length))
        .catch(error => console.log(error));

}

const displayCard=(info,count)=>{
    const totalCard=document.getElementById('total-card');
    totalCard.innerText=count;
    console.log(info);
    
}

loadNavbar();