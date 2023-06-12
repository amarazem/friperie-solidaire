$(document).ready (function() {

    

    $('.produit .bloc button').on('click', function() {
        var parent = $(this).closest('.produit');
        parent.find('.bloc').hide();
        parent.find('.infos').toggle();
        console.log("réussi")
    });

    $('.ajout_panier form button').on('click', function() {
        var parentElement = $(this).parent();
        var produitElement = parentElement.querySelector('.produit');
        produitElement.hide();
    });

});