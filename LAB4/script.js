
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
  
    imgArray = items;

    refresh();

    function refresh() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    
        if(imgArray.length === 0) {
            document.createElement('p').textContent = 'NONE';
            main.appendChild(document.createElement('p'));
        } else {
          for(let i = 0; i < imgArray.length; i++) {
            show(imgArray[i]);
          }
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

        main.appendChild(s);
        s.appendChild(h);
        s.appendChild(p);
        s.appendChild(i);
        });
      }
}