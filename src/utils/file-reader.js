const fs = require("fs");

function readProductsFromDatabase() {
  try {
    const data = fs.readFileSync("src/database/products.txt", "utf8");
    if (data == []) return {};
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

function writeProductOnDatabase(json) {
  try {
    fs.writeFileSync("src/database/products.txt", json);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { readProductsFromDatabase, writeProductOnDatabase };
