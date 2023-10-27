# PRODUCTS API

## Objetivo:

Definir una api para poder gestionar nuestro inventario de productos utilizando Express, Node.js y PostgreSQL

## Acciones

- Identificarnos (auth)
- Añadir productos al inventario (post)
- Eliminar productos del inventario (delete)
- Consultar todos los productos (get)
- Consultar por id (get)
- Editar el contenido de los productos (put)

## REST Design

- Añadir Producto: POST /products/product
- Consultar Todos los Productos: GET /products
- Consultar un Producto: GET /products/product/:name
- Eliminar Producto: DELETE /products/product/:name
- Editar un Producto: PUT /products/product/:name
- Sistema de Credenciales

## Instalacion

Debes tener node.js previamente instalado, una vez clonada la api situarse en el directorio de esta misma e ingresar el siguente comando:

`npm install`

Luego poner en marcha utilizando

`node app.js`

---

![Products Img](/miniatura.jpg)