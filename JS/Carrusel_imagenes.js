  document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('.grid-imagenes img');
    
    const modalHTML = `
<div class="modal fade" id="imagenModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content bg-transparent border-0">
            <div class="modal-header border-0" style="position: absolute; right: 0; z-index: 1;">
                <button type="button" class="btn-close  " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
                <img id="modalImagen" src="" class="img-fluid" style="max-height: 80vh;">
                <div class="d-flex justify-content-between mt-3">
                    <button id="btnAnterior" class="btn btn-dark">
                        <i class="bi bi-chevron-left"></i> Anterior
                    </button>
                    <button id="btnSiguiente" class="btn btn-dark">
                        Siguiente <i class="bi bi-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = new bootstrap.Modal(document.getElementById('imagenModal'));
    const modalImagen = document.getElementById('modalImagen');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    
    let imagenesArray = [];
    let categoriaActual = null;
    let indiceActual = 0;
    
    imagenes.forEach((img, index) => {
        img.addEventListener('click', function() {
            const categoria = this.closest('.categoria');
            categoriaActual = categoria.id;
            imagenesArray = Array.from(categoria.querySelectorAll('.grid-imagenes img'));
            indiceActual = imagenesArray.indexOf(this);
            
            modalImagen.src = this.src;
            modal.show();
            actualizarBotones();
        });
    });
    
    btnAnterior.addEventListener('click', function() {
        if (indiceActual > 0) {
            indiceActual--;
            modalImagen.src = imagenesArray[indiceActual].src;
            actualizarBotones();
        }
    });
    
    btnSiguiente.addEventListener('click', function() {
        if (indiceActual < imagenesArray.length - 1) {
            indiceActual++;
            modalImagen.src = imagenesArray[indiceActual].src;
            actualizarBotones();
        }
    });
    
    function actualizarBotones() {
        btnAnterior.disabled = indiceActual === 0;
        btnSiguiente.disabled = indiceActual === imagenesArray.length - 1;
    }
});