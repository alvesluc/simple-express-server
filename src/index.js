const express = require("express");
const {
  readProductsFromDatabase,
  writeProductOnDatabase,
} = require("./utils/file-reader");

const app = express();
const port = 3001;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (_, response) => {
  return response.send("Hello world");
});

app.get("/categories", (_, response) => {
  return response.status(200).json(categories);
});

const categories = [
  "Todos",
  "Pop",
  "MPB",
  "Forró",
  "Samba",
  "Baião",
  "Rap",
  "Hip-Hop",
  "Rock",
  "Reggae",
  "Country",
  "Gospel",
];

app.get("/products", (_, response) => {
  const products = readProductsFromDatabase();

  return response.status(200).json(products);
});

app.get("/products/:id", (request, response) => {
  const id = request.params.id;
  const products = readProductsFromDatabase();

  const selectedProduct = products.find((e) => e.id == id);
  return response.status(200).json(selectedProduct);
});

function incrementId(products) {
  const lastProduct = products[products.length - 1];

  return lastProduct.id + 1;
}

app.post("/products", (request, response) => {
  const products = readProductsFromDatabase();

  const newProduct = {
    id: incrementId(products),
    title: request.body.title,
    category: request.body.category,
    price: request.body.price,
    img: request.body.img,
    band: request.body.band,
    year: request.body.year,
  };

  products.push(newProduct);
  writeProductOnDatabase(JSON.stringify(products));

  return response.status(201).send("");
});

// app.patch("/products/:id", (request, response) => {
app.put("/products/:id", (request, response) => {
  const products = readProductsFromDatabase();

  const productToUpdate = products.find((e) => e.id == request.params.id);

  if (productToUpdate === undefined) {
    return response
      .status(404)
      .json({ message: "Couldn't find the item requested" });
  }

  productToUpdate.title = request.body.title;
  productToUpdate.category = request.body.category;
  productToUpdate.price = request.body.price;
  productToUpdate.img = request.body.img;
  productToUpdate.band = request.body.band;
  productToUpdate.year = request.body.year;

  writeProductOnDatabase(JSON.stringify(products));

  return response.status(200).json(productToUpdate);
});

app.delete("/products/:id", (request, response) => {
  const products = readProductsFromDatabase();

  const updatedProducts = products.filter((e) => e.id != request.params.id);

  if (updatedProducts === undefined) {
    return response
      .status(404)
      .json({ message: "Couldn't find the item requested" });
  }

  writeProductOnDatabase(JSON.stringify(updatedProducts));

  return response.status(200).json({ message: "Item deleted successfully." });
});

app.put("/products/toggle-favorite/:id", (request, response) => {
  // TODO:
});

app.get("/enable-favorites", (_, response) => {
  return response.status(200).json(false);
});
