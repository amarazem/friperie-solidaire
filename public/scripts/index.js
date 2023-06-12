list_img = [
    "url('/src/Index-img/01.jpg')",
    "url('/src/Index-img/02.jpg')",
    "url('/src/Index-img/03.jpg')",
    "url('/src/Index-img/04.jpg')"
]

function affiche() {

    list_img.push(list_img[0])
    list_img.shift()

    $(document).ready (function() {
        $('.gauche').css('background-image',list_img[0])
    })
}

$("#connexion").click(function () {
    window.location.href = "/inscription";
})

$("#deconnexion").click(function () {
    window.location.href = "/inscription";
})

window.addEventListener("blur", function () {
    document.title = "Friperie Solidaire";
})

window.addEventListener("focus", function () {
    document.title = "Friperie Solidaire";
})

setInterval(affiche,5000)