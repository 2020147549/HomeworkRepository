fetch('product.json').then(function(response) {
    return response.json();
  }).then(function(items) {  
    visual(items);
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
        while (document.querySelector('main').firstChild) {
            document.querySelector('main').removeChild(document.querySelector('main').firstChild);
        }
    
        if(imgArray.length === 0) {
            document.createElement('p').textContent = 'NONE';
            document.querySelector('main').appendChild(document.createElement('p'));
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

        document.createElement('section').setAttribute('class', product.type);

        document.createElement('h2').textContent = product.name;
        document.createElement('p').textContent = 'KRW' + product.price;
        document.createElement('img').src = imgURL;
        document.createElement('img').alt = product.name;

        document.querySelector('main').appendChild(document.createElement('section'));
        document.createElement('section').appendChild(document.createElement('h2'));
        document.createElement('section').appendChild(document.createElement('p'));
        document.createElement('section').appendChild(document.createElement('img'));
        });
      }
}