$(document).ready (function() {
    

    /*--- Mots de passes ---*/
    
    $("input[type=checkbox]").change(function() {

        option_check = $("input[type=checkbox]").prop("checked")

        if (option_check) {
            $("#mot_de_passe").attr("type","text")
            $("#mot_de_passe_confirmation").attr("type","text")
        }else{
            $("#mot_de_passe").attr("type","password")
            $("#mot_de_passe_confirmation").attr("type","password")
        }
    })

    /*--- Gestion des attribus vides ---*/

    nom = $("#nom").val()
    prenom = $("#prenom").val()
    date = $("input[type=date]").val()
    email = $("#email").val()
    telephone = $("#telephone").val()
    adresse = $("#adresse").val()
    mdp = $("#mot_de_passe").val()
    mdpc = $("#mot_de_passe_confirmation").val()

    if (nom == ""){
        $("label[for=nom]").css("color","red")
    }

    if (prenom == ""){
        $("label[for=prenom]").css("color","red")
    }

    if (date == ""){
        $("label[for=date_naissance").css("color","red")
    }

    if (email == ""){
        $("label[for=email").css("color","red")
    }

    if (telephone == ""){
        $("label[for=telephone").css("color","red")
    }

    if (adresse == ""){
        $("label[for=adresse").css("color","red")
    }

    if (mdp == ""){
        $("label[for=mot_de_passe]").css("color","red")
    }

    if (mdp.length < 8){
        $("label[for=mot_de_passe]").css("color","red")
    }

    if (mdpc == ""){
        $("label[for=mot_de_passe_confirmation]").css("color","red")
    }


    if (nom == "" || prenom == "" || date == "" || mdp == "" || mdpc == ""){
        $("button[type=submit]").prop("disabled",true)
    }

    $("input").keyup(function() {

        nom = $("#nom").val()
        prenom = $("#prenom").val()
        date = $("input[type=date]").val()
        email = $("#email").val()
        telephone = $("#telephone").val()
        adresse = $("#adresse").val()
        mdp = $("#mot_de_passe").val()
        mdpc = $("#mot_de_passe_confirmation").val()

        if (nom == ""){
            $("label[for=nom]").css("color","red")
        }else{
            $("label[for=nom]").css("color","black")
        }
    
        if (prenom == ""){
            $("label[for=prenom]").css("color","red")
        }else{
            $("label[for=prenom]").css("color","black")
        }
    
        if (date == ""){
            $("label[for=date_naissance").css("color","red")
        }else{
            $("label[for=date_naissance").css("color","black")
        }

        if (email == ""){
            $("label[for=email").css("color","red")
        }else{
            $("label[for=email]").css("color","black")
        }
    
        if (telephone == ""){
            $("label[for=telephone").css("color","red")
        }else{
            $("label[for=telephone]").css("color","black")
        }
    
        if (adresse == ""){
            $("label[for=adresse").css("color","red")
        }else{
            $("label[for=adresse]").css("color","black")
        }
    
        if (mdp == ""){
            $("label[for=mot_de_passe]").css("color","red")
        }else{
            $("label[for=mot_de_passe]").css("color","black")
        }

        if (mdp.length < 8){
            $("label[for=mot_de_passe]").css("color","red")
        }else{
            $("label[for=mot_de_passe]").css("color","black")
        }
    
    
        if (mdpc == ""){
            $("label[for=mot_de_passe_confirmation]").css("color","red")
        }else{
            $("label[for=mot_de_passe_confirmation]").css("color","black")
        }

    })

    /*--- Gestion des mots de passes ---*/
    
    mdp = $("#mot_de_passe").val()
    mdpc = $("#mot_de_passe_confirmation").val()

    if (mdp != mdpc){
        $("label[for=mot_de_passe_confirmation]").css("color","red")
        $("button[type=submit]").prop("disabled",true)
    }

    $("input").keyup(function() {

        mdp = $("#mot_de_passe").val()
        mdpc = $("#mot_de_passe_confirmation").val()
        if (mdp == "" || mdpc == "" || mdp != mdpc){
            $("label[for=mot_de_passe_confirmation]").css("color","red")
            $("button[type=submit]").prop("disabled",true)
        }else{
            $("label[for=mot_de_passe_confirmation]").css("color","black")
            $("button[type=submit]").prop("disabled",false)
        }

    })

    /*--- Date de naissance ---*/

    var currentDate = new Date();
    date_100_years_before = parseInt(currentDate.toISOString().substring(0,4)) - 100 
    $("input[type=date]").prop("max",currentDate.toISOString().substring(0,10))
    $("input[type=date]").prop("min",date_100_years_before + currentDate.toISOString().substring(4,10))

    /*--- Button connexion ---*/

    $("#connexion").click(function () {
        window.location.href = "/connexion";
    })
    

});
