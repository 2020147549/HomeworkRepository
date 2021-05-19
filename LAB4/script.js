fetch('product.json').then(function(response) {
    return response.json();
  }).then(function(json) {  
    items = json;
    visual(items);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });

function visual(items){

    const category = document.querySelector('#category');
    const Search = document.querySelector('#Search');
    const button = document.querySelector('button');
    const main = document.querySelector('main');
    
    let imgArray;
    let categoryGroup;
    let finalCategory = category.value;  
    let finalSearch = '';
  
    imgArray = items;

    refresh();
    
    categoryGroup = [];
    imgArray = [];

    function refresh() {

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    
        if(imgArray.length === 0) {
          const p = document.createElement('p');
          p.textContent = 'NONE';
          main.appendChild(p);
        }
        else{
          if(imgArray.length < 9){
          for(let i = 0; i < imgArray.length; i++) {
            show(imgArray[i]);
          }
        }
        else{
          let m;
          let count = main.children.length;
          for(let i = 0; i < 8; i ++){
            show(imgArray[i]);
          }
          for(let i = 8; i < imgArray.length; i ++){
            document.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
              show(imgArray[i])
            }
          })

          }

        }
      }
    }

  
    button.onclick = selectC;
  
    function selectC(e) {

    e.preventDefault();
  
    imgArray = [];
    categoryGroup = [];
  
      if(category.value === finalCategory && Search.value.trim() === finalSearch) {
        return;
      } 
      else {
        finalSearch = Search.value.trim();
        finalCategory = category.value;
        if(category.value === 'All') {
          categoryGroup = items;
          selectP();
        } 
        else {
          let lowerCaseType = category.value.toLowerCase();
          for(let i = 0; i < items.length ; i++) {
            if(items[i].type === lowerCaseType) {
              categoryGroup.push(items[i]);
            }
          }
          selectP();
        }
      }
    }


    function selectP() {
      if(Search.value.trim() === '') {
        imgArray = categoryGroup;
        refresh();
      } else {
        let lowerSearchTerm = Search.value.trim().toLowerCase();
        for(let i = 0; i < categoryGroup.length ; i++) {
          if(categoryGroup[i].name.indexOf(lowerSearchTerm) !== -1) {
            imgArray.push(categoryGroup[i]);
          }
        }
        refresh();
      }  
    }


    function show(product) {
        let url = product.image;
        fetch(url).then(function(response) {
            return response.blob();
        }).then(function(blob) {
        let imgURL = URL.createObjectURL(blob);

        const s = document.createElement('section');
        const h = document.createElement('h2');
        const i = document.createElement('img');
        const p = document.createElement('p');

        s.setAttribute('class', product.type);

        h.textContent = product.name;
        p.textContent = 'KRW' + product.price;
        i.src = imgURL;
        i.alt = product.name;
        i.setAttribute("width", "200px")

        main.appendChild(s);
        s.appendChild(h);
        s.appendChild(p);
        s.appendChild(i);
        });
      }
}
