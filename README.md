# PRODUCTS API

## Objetivo:

Definir una api para poder gestionar nuestro inventario de productos utilizando Express, Node.js y MongoDB

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
- Consultar un Producto: GET /products/product/:id
- Eliminar Producto: DELETE /products/product/:id
- Editar un Producto: PUT /products/product/:id
- Sistema de Credenciales

## Instalacion

Debes tener node.js previamente instalado, una vez clonada la api situarse en el directorio de esta misma e ingresar el siguente comando:

`npm install`

Luego poner en marcha utilizando

`node app.js`

## Funcionamiento 

Aqui un video de como utilizar la api
<iframe width="560" height="315" src="https://www.youtube.com/embed/Qw1jm6HYZwU?si=43kv5nr561TDgGFM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---