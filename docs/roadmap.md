## MODELADOR
* [x] agregar contexto tab local o elemento local a las busquedas de elementos
* [x] agregar parametros coneccion ddbb en menu general
* [x] definir estructura json proyecto (vista)
* [ ] agregar opciones de cada elmento
* [ ] agregar guardar proyecto como json (vista)
  * [ ] leer setings de cada tab
  * [ ] leer elemntos de cada tab(recursivo)
  * [ ] exportar json a archivo descargable
* [ ] agregar cargar proyecto desde json
* [ ] enviar json(proyecto vistas) a servicio generador

### * [ ] HITO V 1.0

* [ ] definir estructura json proyecto (servicio)
* [ ] crear tab servicio
  * [ ] entrada
    * [ ] crear elementos entrada
  * [ ] salida
    * [ ] crear elemntos salida
* [ ] agregar guardar proyecto como json (servicio)
  * [ ] leer setings de cada tab
  * [ ] leer elemntos de cada tab(servicio recursivo)
  * [ ] exportar json a archivo descargable
* [ ] agregar cargar proyecto desde json
* [ ] enviar json(proyecto vistas) a servicio generador

### * [ ] HITO V 2.0

* [ ] eventos por plataforma
* [ ] preview elementos dinamica 
  * [ ] leer palntilla de bbdd
  * [ ] completar campos en platilla con valores del elemento
  * [ ] renderizar en pantalla con estilos del coder


## GENERADOR
* [x] exponer estructura de bbdd desde servicio
* [ ] interpretar json de entrada
* [ ] recibir json (proyecto vista) en servicio
* [ ] generar codigo base cada vista
    * [ ] .net
      * [ ] generar codigo para cada elemento (recusivo)
        * [ ] pagina web aspx
          * [ ] controles aspx
        * [ ] pagina web mvc 
          * [ ] vista
          * [ ] modelo
          * [ ] controlador
          * [ ] controles mvc
      * [ ] capa de servicio crud rest api
      * [ ] capa de negocio
      * [ ] capade datos ado.net
      * [ ] capa de datos entity framework
* [ ] guardar codigo generado (VISTAS)
* [ ] envia rgodigo com archivo zip al modelador (descarga web)  

### * [ ] HITO V 1.0

* [ ] recibir json (proyecto SERVICIOS) en servicio
* [ ] generar codigo base cada SERVICIO
  * [ ] .net
    * [ ] leer elementos de entreada
    * [ ] generar codigo para elemetos de salida
    * [ ] capa de servicio crud rest api
    * [ ] capa de negocio
    * [ ] capade datos ado.net
    * [ ] capa de datos entity framework
* [ ] guardar codigo generado (SERVICIOS)
* [ ] envia Codigo como archivo zip al modelador (descarga web)

### * [ ] HITO V 2.0

* [ ] fork de bootstrap con clases que ereden todas del espacio de nombres CODER ( o le que sea)
* [ ] pasear todas las clases css y dejarlas en un metodo api para lererlas desde el modelador

