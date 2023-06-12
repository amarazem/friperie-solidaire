$(document).ready (function() {
  
  $( function() {
    $( ".spinner" ).spinner({
      step: 1,
    });
  });


  $(".produit .bloc .prix button").click (function() {
    produit_actuel = $(this).parent().parent().parent();
    autres_produits = $(this).parent().parent().parent().parent().children();
    autres_produits.not(produit_actuel).hide();
    produit_actuel.hide();
    $(".modification").css("display", "flex");
    $(".gauche").css("display" , "flex");
    $(".gauche").css("justify-content", "center");
    $(".gauche").css("align-items", "center");
    parent = $(this).closest('.produit');
    input = parent.find('#id_produit');
    id_produit = input.val();
    $("#id").val(id_produit);
  });

});