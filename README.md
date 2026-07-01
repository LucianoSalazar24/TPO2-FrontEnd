# PokeParadise — Tienda Premium de Pokémon TCG

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-FFCB05?style=for-the-badge)

**Trabajo Práctico Integrador — Desarrollo Front End**

Tecnicatura Superior en Desarrollo de Software - IFTS 16

</div>

---

## 🌐 Demo

**Sitio web:**

> [(PokeParadise TCG)](https://poke-paradise-tcg.vercel.app/)

---

## Descripción del proyecto

**PokeParadise** es un sitio web de comercio electrónico estático y dinámico desarrollado como trabajo práctico para la materia de Desarrollo Front End.

El proyecto toma como referencia estructural el sitio [tiendadecafe.com.ar](https://tiendadecafe.com.ar/), replicando su arquitectura de layout, organización de secciones y experiencia de usuario, adaptando completamente el contenido y la identidad visual al universo del coleccionismo de cartas **Pokémon TCG (Trading Card Game)**.

El trabajo fue evolucionando en dos entregas:

- **TPO 1:** Sitio estático de múltiples páginas con HTML5, CSS3 y JavaScript básico.
- **TPO 2:** Incorporación de consumo de API REST pública (PokéAPI), carrito de compras funcional con persistencia en `localStorage` y nuevas funcionalidades dinámicas.

---

## Tabla de contenidos

1. [Estructura del proyecto](#estructura-del-proyecto)
2. [Páginas del sitio](#páginas-del-sitio)
3. [Identidad visual](#identidad-visual)
4. [Tecnologías utilizadas](#tecnologías-utilizadas)
5. [Funcionalidades implementadas](#funcionalidades-implementadas)
6. [Consumo de API REST](#consumo-de-api-rest)
7. [Responsividad](#responsividad)
8. [Requisitos técnicos cubiertos](#requisitos-técnicos-cubiertos)
9. [Instrucciones de uso](#instrucciones-de-uso)

---

## Estructura del proyecto

```
TPO1-FrontEnd/
│
├── index.html               # Página de inicio
├── tienda.html              # Nuestra Colección
├── tutoriales.html          # Tutoriales para coleccionistas
├── menu-tienda.html         # Catálogo de sets y categorías
├── trabaja-en-tdc.html      # Trabajá con nosotros
├── franquicias.html         # Franquicias
├── contacto.html            # Contacto
├── pokedex.html             # Pokédex Interactiva (TPO 2)
│
├── css/
│   └── styles.css           # Hoja de estilos principal
│
├── js/
│   ├── scripts.js           # Lógica general: menú, modal de producto, favoritos
│   ├── cart.js              # Módulo del carrito de compras (TPO 2)
│   └── pokedex.js           # Módulo de la Pokédex interactiva (TPO 2)
│
├── img/
│   ├── charizard-1era-edicion.png
│   ├── charizard-ex.png
│   ├── umbreon-vmax.png
│   ├── mew-ex.png
│   ├── pikachu-rare.png
│   ├── booster-box.png
│   ├── elite-trainer-box.jpg
│   ├── cartas-singles.jpg
│   ├── coleccion-especial.png
│   ├── scarlet-violet.jpg
│   ├── pokemon-151.jpg
│   ├── journey-together.png
│   ├── prismatic-evolutions.png
│   ├── pokemon-binder.png
│   └── ba-mapa.png
│
├── .gitignore
└── README.md
```

---

## Páginas del sitio

| Archivo | Sección | Descripción |
|---|---|---|
| `index.html` | Inicio | Hero con cartas apiladas, categorías destacadas, productos de la semana, banner promocional y newsletter |
| `tienda.html` | Nuestra Colección | Presentación de las cuatro líneas de producto con imágenes y descripción |
| `tutoriales.html` | Tutoriales | Cinco guías expandibles con pasos detallados para coleccionistas |
| `menu-tienda.html` | Catálogo | Grilla de sets con filtrado por categoría mediante tabs interactivos |
| `trabaja-en-tdc.html` | Trabajá con Nosotros | Puestos disponibles y formulario de postulación |
| `franquicias.html` | Franquicias | Información del programa de franquicias y formulario de contacto |
| `contacto.html` | Contacto | Datos de contacto, mapa de ubicación y formulario |
| `pokedex.html` | Pokédex Interactiva | Buscador en tiempo real, Pokémon aleatorio, favoritos y carrito integrado |

---

## Identidad visual

El diseño adopta una estética **premium y minimalista** orientada al coleccionismo de alto valor, alejándose de los colores clásicos de Pokémon (amarillo y rojo) para proponer una paleta sofisticada:

| Elemento | Color |
|---|---|
| Fondo principal | `#111827` |
| Fondo secundario | `#1F2937` |
| Fondo de cards | `#1a2437` |
| Dorado premium | `#D4AF37` |
| Texto principal | `#F9FAFB` |
| Texto secundario | `#9CA3AF` |

**Tipografía:**
- Títulos y encabezados: **Montserrat** (Google Fonts)
- Cuerpo de texto: **Poppins** (Google Fonts)

**Iconografía:** Font Awesome 6 (CDN)

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de todas las páginas |
| CSS3 | Estilos, animaciones, variables personalizadas y diseño responsivo |
| JavaScript ES6 | Lógica del carrito, Pokédex, filtros y modales |
| Fetch API | Consumo de PokéAPI en tiempo real |
| LocalStorage | Persistencia del carrito y favoritos entre sesiones |
| PokéAPI | API REST pública para datos de Pokémon |
| Font Awesome 6 | Iconografía del sitio |
| Google Fonts | Tipografías Poppins y Montserrat |

---

## Funcionalidades implementadas

### Navegación y estructura
- Header sticky con logo SVG, menú de navegación completo y acciones de usuario.
- Menú hamburguesa funcional para dispositivos móviles.
- Barra superior con información de envíos y redes sociales.
- Footer de cuatro columnas con logo, navegación, empresa y datos de contacto.

### Carrito de compras (`cart.js`)
- Panel desplegable accesible desde el ícono del header en todas las páginas.
- Badge con contador de ítems que se actualiza en tiempo real.
- Funcionalidades: agregar, incrementar cantidad, decrementar cantidad y eliminar productos.
- Botón para vaciar el carrito completo.
- Cálculo automático del total en pesos argentinos.
- **Persistencia mediante `localStorage`:** el contenido del carrito se conserva al recargar la página o navegar entre secciones.
- Animación de pulso en el ícono al agregar un producto.
- **Toast notification:** mensaje de confirmación ("✔ Producto agregado al carrito") visible durante 3 segundos tras cada adición.
- Compatible con productos estáticos del sitio y con los generados dinámicamente desde la Pokédex.

### Productos destacados (`index.html`)
- Cuatro tarjetas de producto con imágenes reales de cartas TCG.
- Modal de vista rápida con imagen ampliada, rareza, set y precio.
- Sistema de favoritos con persistencia en `localStorage`: el ícono de corazón se activa y mantiene su estado entre sesiones.
- Botón "Agregar" funcional integrado al carrito.

### Tutoriales (`tutoriales.html`)
- Cinco guías temáticas implementadas como acordeón nativo con el elemento HTML `<details>/<summary>`.
- Sin dependencia de JavaScript: el comportamiento de apertura y cierre es manejado por el navegador.
- Cada tutorial incluye cuatro pasos detallados y numerados con contenido informativo real.

### Catálogo (`menu-tienda.html`)
- Sistema de filtrado por categoría mediante tabs: Todos, Scarlet & Violet, Pokémon 151, Journey Together, Prismatic Evolutions, Singles, Accesorios.
- Script de filtrado liviano (menos de 15 líneas) que muestra u oculta tarjetas según el atributo `data-category`.
- Imágenes reales de cada set integradas con `object-fit: cover`.

### Franquicias y Contacto
- Mapa de Buenos Aires integrado como imagen en ambas páginas.
- Formularios con campos simétricos, validación nativa HTML5 y estilos consistentes con el sistema de diseño.

---

## Consumo de API REST

### API utilizada: PokéAPI

**Documentación oficial:** [https://pokeapi.co/](https://pokeapi.co/)

PokéAPI fue seleccionada por ser una API REST pública, gratuita, sin requerir registro ni API Key, con cobertura completa de datos oficiales de Pokémon.

**Endpoints utilizados:**

| Endpoint | Uso |
|---|---|
| `GET /api/v2/pokemon/{name\|id}` | Obtener datos de un Pokémon por nombre o ID |
| `GET /api/v2/pokemon?limit=1302` | Cargar lista completa de nombres para el autocompletado |

### Funcionalidades de la Pokédex (`pokedex.html`)

**Buscador con autocompletado inteligente**
Al escribir en el campo de búsqueda (a partir de 2 caracteres), el sistema descarga la lista completa de Pokémon y filtra en tiempo real con un debounce de 220 ms, mostrando hasta 6 sugerencias. El usuario puede seleccionar directamente desde el desplegable o buscar manualmente.

**Pokémon destacados**
Al cargar la página se presentan automáticamente seis Pokémon predefinidos (Pikachu, Charizard, Gengar, Umbreon, Mew, Lucario) obtenidos desde la API, organizados en una grilla responsiva.

**Pokémon aleatorio**
El botón "🎲 Descubrir Pokémon" genera un ID aleatorio entre 1 y 1010 y consulta la API, permitiendo descubrir Pokémon de forma dinámica.

**Modal de detalle**
Cada tarjeta cuenta con un botón "Ver detalles" que abre un modal con:
- Imagen oficial (artwork de alta resolución).
- Número de Pokédex, tipos traducidos al español.
- Altura y peso.
- Habilidades.
- Barras de estadísticas (HP, Ataque, Defensa, Velocidad, etc.) con porcentaje visual.

**Integración con el carrito**
Cada Pokémon puede agregarse al carrito mediante un producto ficticio generado automáticamente (figura coleccionable, peluche o carta promocional según el ID del Pokémon). El precio se calcula en función de la experiencia base del Pokémon.

**Sistema de favoritos**
Cada tarjeta y el modal incluyen un botón de corazón que guarda el Pokémon en `localStorage`. Los favoritos se muestran en una sección dedicada como chips con opción de quitar.

---

## Responsividad

El sitio implementa cuatro breakpoints de acuerdo a los requisitos del trabajo práctico:

```css
/* Tablet horizontal */
@media (max-width: 1080px) { }

/* Tablet vertical */
@media (max-width: 768px) { }

/* Móvil 1 */
@media (max-width: 480px) { }

/* Móvil 2 */
@media (max-width: 375px) { }
```

Todos los componentes del sitio —incluyendo los nuevos incorporados en el TPO 2— se adaptan correctamente a los cuatro tamaños de pantalla utilizando `flex`, `flex-wrap` y unidades relativas.

---

## Requisitos técnicos cubiertos

### TPO 1
- [x] Clonado estructural de 7 páginas basado en tiendadecafe.com.ar.
- [x] Uso de unidades relativas (`%`, `vw`, `vh`) y `flex` en contenedores.
- [x] Manejo correcto de elementos en bloque e inline.
- [x] Box model aplicado con márgenes, padding y bordes.
- [x] Centrado con `text-align`, `margin: 0 auto` y `flex`.
- [x] Fuentes propias cargadas desde Google Fonts (`font-family`, `font-size` con unidades relativas en mobile).
- [x] Iconografía con Font Awesome.
- [x] Pseudoclases de enlace: `a:link`, `a:visited`, `a:hover`, `a:active`.
- [x] Combinadores CSS: descendiente (`div p`) y directo (`div > p`).
- [x] 4 breakpoints responsivos implementados.
- [x] Variables CSS personalizadas (`--gold`, `--bg`, `--card-bg`, `--border`, etc.).
- [x] Animaciones y transiciones en hover sobre cards, imágenes y botones.

### TPO 2
- [x] Consumo de API REST pública mediante `fetch()`.
- [x] Uso de `async/await` y manejo de errores.
- [x] Manipulación dinámica del DOM.
- [x] `localStorage` para persistencia de carrito y favoritos.
- [x] Diseño responsivo para todas las secciones nuevas.
- [x] Animaciones en carga de resultados y apertura de modales.
- [x] Autocompletado con debounce.
- [x] Módulos JavaScript organizados por responsabilidad (`cart.js`, `pokedex.js`, `scripts.js`).

---

## Instrucciones de uso

El proyecto no requiere instalación de dependencias ni servidor especial. Para ejecutarlo localmente:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/LucianoSalazar24/TPO1-FrontEnd.git
   ```

2. Abrir el archivo `index.html` en cualquier navegador moderno, o utilizar la extensión **Live Server** de Visual Studio Code para desarrollo.

3. La Pokédex requiere conexión a internet para consultar la PokéAPI en tiempo real.

---

*Proyecto desarrollado para la materia Desarrollo Front End — 2026.*