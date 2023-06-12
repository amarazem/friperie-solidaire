$(document).ready (function() {

    type = "base";


    list_img_jean = [];
    images_pantalons = $(".images_pantalons").children();
    for (let i = 1; i < images_pantalons.length; i++) {
        path = $(images_pantalons[i]).attr("src");
        list_img_jean.push(path);
    }
    $("#selection_jean .selected_image").attr("src", list_img_jean[0])


    list_img_chemise = [];
    images_chemises = $(".images_chemises").children();
    for (let i = 1; i < images_chemises.length; i++) {
        path = $(images_chemises[i]).attr("src");
        list_img_chemise.push(path);
    }
    $("#selection_chemise .selected_image").attr("src", list_img_chemise[0])


    list_img_veste = [];
    images_vestes = $(".images_vestes").children();
    for (let i = 1; i < images_vestes.length; i++) {
        path = $(images_vestes[i]).attr("src");
        list_img_veste.push(path);
    }
    $("#selection_veste .selected_image").attr("src", list_img_veste[0])

    list_img_ceintures = [];
    images_ceintures = $(".images_ceintures").children();
    for (let i = 1; i < images_ceintures.length; i++) {
        path = $(images_ceintures[i]).attr("src");
        list_img_ceintures.push(path);
    }
    $("#selection_ceintures .selected_image").attr("src", list_img_ceintures[0])

    list_img_cravates = [];
    images_cravates = $(".images_cravates").children();
    for (let i = 1; i < images_cravates.length; i++) {
        path = $(images_cravates[i]).attr("src");
        list_img_cravates.push(path);
    }
    $("#selection_cravates .selected_image").attr("src", list_img_cravates[0])


    cpt_jean = 0;
    cpt_chemise = 0;
    cpt_veste = 0;
    cpt_ceintures = 0;
    cpt_cravates = 0;


    $("#selection_jean .next").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_jean++;
        if (cpt_jean > list_img_jean.length - 1) cpt_jean = 0;
        image.attr("src", list_img_jean[cpt_jean]);
    })

    $("#selection_chemise .next").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_chemise++;
        if (cpt_chemise > list_img_chemise.length - 1) cpt_chemise = 0;
        image.attr("src", list_img_chemise[cpt_chemise]);
    })

    $("#selection_veste .next").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_veste++;
        if (cpt_veste > list_img_veste.length - 1) cpt_veste = 0;
        image.attr("src", list_img_veste[cpt_veste]);
    })

    $("#selection_ceintures .next").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_ceintures++;
        if (cpt_ceintures > list_img_ceintures.length - 1) cpt_ceintures = 0;
        image.attr("src", list_img_ceintures[cpt_ceintures]);
    })

    $("#selection_cravates .next").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_cravates++;
        if (cpt_cravates > list_img_cravates.length - 1) cpt_cravates = 0;
        image.attr("src", list_img_cravates[cpt_cravates]);
    })

    $("#selection_jean .previous").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_jean--;
        if (cpt_jean == -1) cpt_jean = list_img_jean.length -1;
        image.attr("src", list_img_jean[cpt_jean]);
    })

    $("#selection_chemise .previous").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_chemise--;
        if (cpt_chemise == -1) cpt_chemise = list_img_chemise.length -1;
        image.attr("src", list_img_chemise[cpt_chemise]);
    })

    $("#selection_veste .previous").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_veste--;
        if (cpt_veste == -1) cpt_veste = list_img_veste.length -1;
        image.attr("src", list_img_veste[cpt_veste]);
    })

    $("#selection_ceintures .previous").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_ceintures--;
        if (cpt_ceintures == -1) cpt_ceintures = list_img_ceintures.length -1;
        image.attr("src", list_img_ceintures[list_img_ceintures]);
    })

    $("#selection_cravates .previous").click(function () {
        selection = $(this).parent();
        image = selection.find('.selected_image')
        cpt_cravates--;
        if (cpt_cravates == -1) cpt_cravates = list_img_cravates.length -1;
        image.attr("src", list_img_cravates[list_img_cravates]);
    })

    $("#base").click(function () {
        $("#business").removeClass("choisie")
        $("#luxe").removeClass("choisie")
        $(this).addClass("choisie")
        type = "base";
        $("#selection_ceintures").css("display", "none")
        $("#selection_cravates").css("display", "none")
        $('.selection_generale').css("display", "flex")
        $(".formulaire_combi").hide()
    })

    $("#business").click(function () {
        $("#base").removeClass("choisie")
        $("#luxe").removeClass("choisie")
        $(this).addClass("choisie")
        type = "business";
        $("#selection_ceintures").css("display", "flex")
        $("#selection_cravates").css("display", "none")
        $('.selection_generale').css("display", "flex")
        $(".formulaire_combi").hide()
    })

    $("#luxe").click(function () {
        $("#base").removeClass("choisie")
        $("#business").removeClass("choisie")
        $(this).addClass("choisie")
        type = "luxe";
        $("#selection_ceintures").css("display", "flex")
        $("#selection_cravates").css("display", "flex")
        $('.selection_generale').css("display", "flex")
        $(".formulaire_combi").hide()
    })


    $("#confirmer").click(function () {
        selection_generale = $(this).parent()
        selections = selection_generale.children()
        max = 0
        prix = 0
        if (type == "base") {
            max = 3
            prix = 30
        }else if(type == "business"){
            max = 4
            prix = 40
        }else if(type == "luxe"){
            max = 5
            prix = 50
        }

        ids = ""
        for (let i = 0; i < max; i++) {
            image = $(selections[i]).find('.selected_image')
            ids += image.attr("src").substring(16,18) + " 0 0 0 1 0 0 0 Aucun,"
        }
        ids = ids.substring(0, ids.length - 1)

        
        selection_generale.hide()
        $(".formulaire_combi").css("display", "flex")
        $(".gauche").css("display", "flex")
        $(".prix_commande").attr("value",prix)
        console.log(prix)
        $(".infos").attr("value",ids)

    })

    var currentDate = new Date();
    minDate = parseInt(currentDate.toISOString().substring(8,10)) +7
    maxDate = parseInt(currentDate.toISOString().substring(5,7)) + 1
    $("input[type=date]").prop("max", currentDate.toISOString().substring(0,5) + maxDate.toString().padStart(2,"0") + currentDate.toISOString().substring(7,10))
    $("input[type=date]").prop("min", currentDate.toISOString().substring(0,8) + minDate.toString().padStart(2,"0"))
});