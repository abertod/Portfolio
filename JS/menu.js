const menuBarras = document.getElementById('menu-barras');
const menu = document.getElementById('menu');
const body = document.body;

menuBarras.addEventListener('click', () => {
  menuBarras.classList.toggle('active');
  menu.classList.toggle('open');
  
  // Añadimos o quitamos la clase 'menu-open' en el body para desactivar el scroll
  if (menu.classList.contains('open')) {
    body.classList.add('menu-open');
  } else {
    body.classList.remove('menu-open');
  }
});