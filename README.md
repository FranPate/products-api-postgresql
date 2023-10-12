#Objetivo:
Definir una api para poder gestionar nuestro inventario de productos

#Acciones:
- Identificarnos (auth)
- Añadir productos al inventario (post)
- Eliminar productos del inventario (delete)
- Consultar todos los productos (get)
- Consultar por id (get)
- Editar el contenido de los productos (put)

#REST Design:
- Añadir Productos: POST /products
- Consultar Todos los Productos: GET /products
- Consultar un Producto: GET /products/:id
- Eliminar Producto: DELETE /products/:id
- Editar un Producto: PUT /products/:id
- Sistema de Credenciales

-Probar con postman


1- Definir las rutas a utilizar
2- Preparar los test para realizar las funciones y los endpoints
3- Hacer los logins y la autentifiacion para cada endpoint (controllers)
4- Reformatear el codigo
5- Crear los routes para limpiar codigo
6- Hacer el test para los productos (problema con el userId y jwt)
7- Terimar funcionalidad de peticiones GET
8- Nueva funcionalidad de editar todos los productos para modificar el orden (PUT)
9- Test agregando productos (POST) (No enviar {objetos})
10- Hacer funcionalidades por producto unico (GET), (PUT), (DELETE) y sus respectivos tests
11- Emprolijar el codigo crando handlers (Middlewares?)
12- Pasar todo a promesas y gestionar errores
13- Conectar a Mongo y hacer la base de datos
14- Tests satisfactorios
15- Crear un signup