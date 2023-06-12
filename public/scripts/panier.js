$(document).ready (function() {

$( function() {
  $( ".spinner" ).spinner({
    step: 1,
  });
});

  
if(parseFloat($("#prix").text()) == 0){
  $(".valide").css("display","none");
}else{
  $(".valide").css("display","flex");
}

  var currentDate = new Date();
  minDate = parseInt(currentDate.toISOString().substring(8,10)) +7
  maxDate = parseInt(currentDate.toISOString().substring(5,7)) + 1
  $("input[type=date]").prop("max", currentDate.toISOString().substring(0,5) + maxDate.toString().padStart(2,"0") + currentDate.toISOString().substring(7,10))
  $("input[type=date]").prop("min", currentDate.toISOString().substring(0,8) + minDate.toString().padStart(2,"0"))
  // console.log(minDate + currentDate.toISOString().substring(4,10))

  $(".spinner").change(function () {
    const produit = $(this).parent().parent().parent().parent();
    const div_prix = produit.find('.product-price-value').text();
    prix_initial = parseFloat(div_prix);

    tailles = produit.find('.tailles');
    sous_divs_tailles = tailles.children();
    total_produit = 0;
    for (let i = 0; i < sous_divs_tailles.length; i++) {
      spinner = $(sous_divs_tailles[i]).find('.spinner');
      total_produit += parseFloat(spinner.val());
      
    }
    const div_prix_2 = produit.find('.product-price-value2').text(total_produit*prix_initial + "$");

    const principale = produit.parent();
    produits = principale.children();
    total_panier = 0;
    total_article_panier = 0;
    
    produit_non_prit = false;
    for (let i = 0; i < produits.length-1; i++) {
      prix_produit = parseFloat($(produits[i]).find('.product-price-value2').text());
      total_panier += prix_produit;

      total_article_produit = 0;
      inputs = $(produits[i]).find('.tailles').children();
      for (let j = 0; j < inputs.length; j++) {
        total_article_produit += parseInt($(inputs[j]).find('.spinner').val());
        
      }
      console.log(total_article_produit)
      if(total_article_produit == 0){
        produit_non_prit = true;
      } 
      else total_article_panier += total_article_produit
    }
    $("header .panier span").text(total_article_panier);
    $("header .panier h2").text(total_panier + "$");
    if(produit_non_prit){
      $(".valide").css("display","none");
    }else{
      $(".valide").css("display","flex");
    }
  });

  $(".validation").click(function () {
    infos_produit_paniers = [];
    const principale = $("body .principale-panier");
    produits = principale.children();
    for (let i = 0; i < produits.length; i++) {
      produit = $(produits[i]);
      infos = produit.find('.id_produit').text();
      infos += " ";

      inputs = produit.find('.tailles').children();
      for (let j = 0; j < inputs.length; j++) {
        infos += $(inputs[j]).find('.spinner').val();
        infos += " ";
        
      }

      accessoire = produit.find('.accessoire').text();
        if (accessoire.includes("Pas")) {
          accessoire = "Aucun";
        }
        else if (accessoire === "Noeud papillon") {
          accessoire = "Noeud_papillon"; 
        }

        infos += accessoire;
        console.log(infos)
      infos_produit_paniers.push(infos);
    }

    infos_produit_paniers.pop()
    $("body .formulaire .infos").attr("value", infos_produit_paniers);
    prix = parseFloat($("header .panier h2").text());
    $("body .formulaire .prix_commande").attr("value", prix);

    principale.hide();
    const form = $("body .formulaire");
    form.css("display", "block");
  });   




    
  
});