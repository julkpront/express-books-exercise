// Importamos express y los datos de los libros (el JSON se convierte solo en un array de objetos)
const express = require('express');
const books = require('./data/books.json');

// Creamos la aplicación y definimos el puerto
const app = express();
const port = 3000;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Ejercicio 1: todos los libros
app.get('/all', (req, res) => {
  res.status(200).json(books);
});

// Ejercicio 2: el primer libro
app.get('/first', (req, res) => {
  res.status(200).json(books[0]);
});

// Ejercicio 3: el último libro
app.get('/last', (req, res) => {
  res.status(200).json(books[books.length - 1]); // length - 1 = última posición
});

// Ejercicio 4: el libro de la mitad
app.get('/middle', (req, res) => {
  res.status(200).json(books[50]); // el test espera la posición 50 del array
});

// Ejercicio 5: SOLO el título del libro de Dante Alighieri
app.get('/author/dante-alighieri', (req, res) => {
  // find() devuelve el primer libro que cumpla la condición
  const book = books.find((b) => b.author === 'Dante Alighieri');
  res.status(200).json(book.title); // solo la propiedad title
});

// Ejercicio 6: SOLO el país del libro de Charles Dickens
app.get('/country/charles-dickens', (req, res) => {
  const book = books.find((b) => b.author === 'Charles Dickens');
  res.status(200).json(book.country);
});

// Ejercicio 7: páginas y año del libro de Cervantes
app.get('/year&pages/cervantes', (req, res) => {
  const book = books.find((b) => b.author === 'Miguel de Cervantes');
  // construimos un objeto nuevo con solo las dos propiedades pedidas
  res.status(200).json({ pages: book.pages, year: book.year });
});

// Ejercicio 8: número de libros de España
app.get('/country/count/spain', (req, res) => {
  // filter() devuelve un array con los libros de España; .length cuenta cuántos hay
  const total = books.filter((b) => b.country === 'Spain').length;
  res.status(200).json(total);
});

// Ejercicio 9: ¿hay al menos un libro de Alemania? (true/false)
app.get('/country/at-least/germany', (req, res) => {
  // some() devuelve true si AL MENOS UN elemento cumple la condición
  const exists = books.some((b) => b.country === 'Germany');
  res.status(200).json(exists);
});

// Ejercicio 10: ¿todos los libros tienen más de 200 páginas? (true/false)
app.get('/pages/all-greater/200', (req, res) => {
  // every() devuelve true solo si TODOS los elementos cumplen la condición
  const allGreater = books.every((b) => b.pages > 200);
  res.status(200).json(allGreater);
});

// Arrancamos el servidor (una sola vez, al final)
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});