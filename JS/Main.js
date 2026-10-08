document.addEventListener("DOMContentLoaded", () => {
    // 1. Intersection Observer para las secciones del portafolio
    function setupSectionObserver() {
        const sections = document.querySelectorAll('.categoria');
        const navLinks = document.querySelectorAll('.seccion-menu-enlaces');

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });

                    const matchingLink = document.querySelector(`.seccion-menu-enlaces[href="#${id}"]`);
                    if (matchingLink) {
                        matchingLink.classList.add('active');
                    }
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // 2. Función para el separador visible
    function setupSeparador() {
        const seccion = document.querySelector(".viewer-Seccion");
        const separador = document.querySelector(".Separador");

        if (seccion && separador) {
            function handleScroll() {
                const rect = seccion.getBoundingClientRect();
                const triggerPoint = window.innerHeight * 0.75;

                if (rect.bottom <= triggerPoint) {
                    separador.classList.add("visible");
                } else {
                    separador.classList.remove("visible");
                }
            }

            window.addEventListener("scroll", handleScroll);
        }
    }

    // 3. Flecha arriba
    function setupFlechaArriba() {
        const flecha = document.getElementById('flecha');

        if (flecha) {
            flecha.addEventListener("mouseover", () => {
                flecha.classList.add("colorFlecha");
            });

            flecha.addEventListener("mouseout", () => {
                flecha.classList.remove("colorFlecha");
            });
        }
    }

    // 4. Transición color panel
    function setupColorPanels() {
        const panels = document.querySelectorAll('.panel');

        if (panels.length > 0) {
            const colorOrigen = {
                r: 60,
                g: 56,
                b: 71
            };
            const colorInicio = {
                r: 42,
                g: 42,
                b: 42
            };

            function rgbToCss({
                r,
                g,
                b
            }) {
                return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
            }

            function lerpColor(a, b, t) {
                return {
                    r: a.r + (b.r - a.r) * t,
                    g: a.g + (b.g - a.g) * t,
                    b: a.b + (b.b - a.b) * t,
                }
            }

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: buildThresholdList()
            };

            function buildThresholdList() {
                let thresholds = [];
                for (let i = 0; i <= 100; i++) {
                    thresholds.push(i / 100);
                }
                return thresholds;
            }

            const observer = new IntersectionObserver(handleIntersect, observerOptions);

            panels.forEach(panel => {
                observer.observe(panel);
            });

            function handleIntersect(entries) {
                entries.forEach(entry => {
                    const panel = entry.target;
                    const ratio = entry.intersectionRatio;

                    if (ratio === 0) {
                        panel.style.backgroundColor = rgbToCss(colorOrigen);
                        return;
                    }

                    const color = lerpColor(colorOrigen, colorInicio, ratio);
                    panel.style.backgroundColor = rgbToCss(color);
                });
            }
        }
    }

    // 5. Model Viewer - Rotación de objeto 3D
    function setupModelViewer() {
        const viewer = document.getElementById("viewer");

        if (viewer) {
            const maxScroll = 1800;

            window.addEventListener("scroll", () => {
                let scrollY = window.scrollY;
                let scroll = Math.min(Math.max(scrollY, 0), maxScroll);
                let ratio = scroll / maxScroll;
                let azimuth = 3 + ratio * 6.5;
                let polar = 90;
                let radius = 5;

                viewer.cameraOrbit = `${azimuth}rad ${polar}deg ${radius}m`;
            });
        }
    }

    // 6. Cerrar menú-barras si supera 992px
    function handleMenuOnResize() {
        const menu = document.getElementById('menu');
        const menuBarras = document.getElementById('menu-barras');
        const screenWidth = window.innerWidth;

        if (screenWidth >= 992) {
            menu.classList.remove('open');
            menuBarras.classList.remove('active');
        }
    }

    // 7. Mostrar submenu de Portafolio
    /*function setupSubmenu() {
        const submenuPadre = document.querySelector('.submenuPadre');
        const submenu = document.querySelector('.submenu');
        const screenWidth = window.innerWidth;

        if (submenuPadre && submenu) {
            if (screenWidth >= 992) {
                let closeTimer;

                submenuPadre.addEventListener('mouseenter', () => {
                    clearTimeout(closeTimer);
                    submenu.classList.add('active');
                });

                submenu.addEventListener('mouseenter', () => {
                    clearTimeout(closeTimer);
                });

                submenuPadre.addEventListener('mouseleave', () => {
                    closeTimer = setTimeout(() => {
                        submenu.classList.remove('active');
                    }, 100);
                });

                submenu.addEventListener('mouseleave', () => {
                    closeTimer = setTimeout(() => {
                        submenu.classList.remove('active');
                    }, 100);
                });
            } else {
                submenu.classList.remove('active');
            }
        }
    }*/
    
    function setupSubmenu() {
  const screenWidth = window.innerWidth;
  
  // Seleccionamos todos los padres de submenus
  const submenuPadres = document.querySelectorAll('.submenuPadre');

  submenuPadres.forEach(submenuPadre => {
    const submenu = submenuPadre.querySelector('.submenu');
    if (!submenu) return;

    if (screenWidth >= 992) {
      let closeTimer;

      submenuPadre.addEventListener('mouseenter', () => {
        clearTimeout(closeTimer);
        submenu.classList.add('active');
      });

      submenu.addEventListener('mouseenter', () => {
        clearTimeout(closeTimer);
      });

      submenuPadre.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => {
          submenu.classList.remove('active');
        }, 100);
      });

      submenu.addEventListener('mouseleave', () => {
        closeTimer = setTimeout(() => {
          submenu.classList.remove('active');
        }, 100);
      });
    } else {
      submenu.classList.remove('active');
    }
  });
}

// Reajustar submenus al redimensionar
window.addEventListener('resize', setupSubmenu);


    // Inicializar todas las funciones
    setupSectionObserver();
    setupSeparador();
    setupFlechaArriba();
    setupColorPanels();
    setupModelViewer();
    setupSubmenu();

    // Event listeners para resize
    window.addEventListener('resize', () => {
        handleMenuOnResize();
        setupSubmenu();
    });

    // Event listener para load
    window.addEventListener('load', () => {
        if (window.innerWidth < 992) {
            const menu = document.getElementById('menu');
            if (menu) menu.classList.remove('open');
        }
    });
});


