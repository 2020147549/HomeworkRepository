let index = 8;

var imgArray;
var categoryGroup;
var finalCategory  
var finalSearch = '';
const category = document.querySelector('#category');
const Search = document.querySelector('#Search');
const button = document.querySelector('button');
const main = document.querySelector('main');

var items;


fetch('product.json').then(function(response) {
    return response.json();
  }).then(function(json) {  
    items = json;
    visual(items);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });


window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        infinit();
    }
}

function infinit () {
  if(index >= imgArray.length){
    return;
  }
	for (let i = 4 * index - 4; i < 4 * index ; i++) {
		if (i >= imgArray.length) {
			break;
		}
		show(imgArray[i]);
	}
	
	if (4 * index - 4 >= imgArray.length) {
		index = imgArray.length;
	} else {
		index ++;
	}
}


function visual(items){
  
    imgArray = items;
    finalCategory = category.value;

    refresh();

    button.onclick = selectC;

}

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
    if(imgArray.length <= 8){
    for(let i = 0; i < imgArray.length; i++) {
      show(imgArray[i]);
    }
  }
    else{
      for(let i = 0; i < 8; i ++){
        show(imgArray[i]);
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

  s.setAttribute('id', product.name + " " + product.price);

  s.addEventListener('click', popup);

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
  



window.onscroll = () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if(imgArray.length <= 8){
      return;
    }
    for(let i = 8; i < imgArray.length; i ++){
      show(imgArray[i])
    };
  }
  }

function popup(e){

  let id = e.target.parentNode.id;
	let popuplist = id.split(' ');
		
		const section = document.createElement('section');
		let str = '<br>name: ' + popuplist[0] + ' ' + popuplist[1] + '<br>price: ' + popuplist[2] + 'KRW';
		section.innerHTML = str;
		document.getElementById(e.target.parentNode.id).appendChild(section);
	
}