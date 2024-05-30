import express from 'express';
import routes from './routes/index.routes.js';
import { __dirname } from './path.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import ProductManager from './managers/products.manager.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api', routes);

const productManager = new ProductManager(`${__dirname}/db/products.json`);

const http = app.listen(PORT, () => {
  console.log(`The port ${PORT} is being listened to`);
});

const socketServer = new Server(http);

socketServer.on('connection', async socket => {
  try {
    socket.on('newProduct', async data => {
      try {
        const newProduct = await productManager.createProduct(data);
        const products = await productManager.getProducts();

        socket.emit('productCreated', newProduct);
        socketServer.emit('allProducts', { products });
      } catch {}
    });
  } catch {}
});
