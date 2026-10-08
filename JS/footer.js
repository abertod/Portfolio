fetch("../footer.html")
    .then(r => r.text())
    .then(fecha => {
        document.getElementById("footer").innerHTML = fecha;
        document.getElementById("year").textContent = new Date().getFullYear();
    });