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
    let finalCategory = category.value;
    let finalSearch = '';
  
    imgArray = items;

    refresh();

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
          for(let i = 0; i < imgArray.length; i++) {
            show(imgArray[i]);
          }
        }
    }

    categoryGroup = [];
    finalGroup = [];
  
    searchBtn.onclick = selectC;
  
    function selectC(e) {

    e.preventDefault();
  
    finalGroup = [];
    categoryGroup = [];
  
      if(category.value === finalCategory && searchTerm.value.trim() === finalSearch) {
        return;
      } 
      else {
        finalSearch = searchTerm.value.trim();
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
      if(searchTerm.value.trim() === '') {
        finalGroup = categoryGroup;
        refresh();
      } else {
        let lowerSearchTerm = searchTerm.value.trim().toLowerCase();
        for(let i = 0; i < categoryGroup.length ; i++) {
          if(categoryGroup[i].name.indexOf(lowerSearchTerm) !== -1) {
            finalGroup.push(categoryGroup[i]);
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
        i.width = "200px";

        main.appendChild(s);
        s.appendChild(h);
        s.appendChild(p);
        s.appendChild(i);
        });
      }
}