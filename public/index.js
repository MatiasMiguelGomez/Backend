const socket = io();

const form = document.getElementById('form');
const container = document.getElementById('container');

form.addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title-input');
  const stock = document.getElementById('stock-input');
  const price = document.getElementById('price-input');
  const description = document.getElementById('description-input');
  const code = document.getElementById('code-input');
  const category = document.getElementById('category-input');
  const product = {
    title: title.value,
    stock: stock.value,
    price: price.value,
    description: description.value,
    code: code.value,
    category: category.value,
  };

  socket.emit('newProduct', product);
});

socket.on('productCreated', data => {
  console.log(`The product ${data.title} has been created successfully`);
});

socket.on('allProducts', data => {
  container.innerHTML = '';
  data.products.forEach(product => {
    const card = document.createElement('div');
    card.innerHTML = `
    <p>-------------------------------</p>
      <p>${product.title}</p>
      <p>${product.description}</p>
      <p>${product.price}</p>
      `;
    container.appendChild(card);
  });
});
