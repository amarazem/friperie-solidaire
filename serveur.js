const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');



const {Client} = require('pg');
const crypto = require('crypto');

const client = new Client({
    host: "localhost",
    user: "utilisateur",
    port: 5432,
    password: "0",
    database: "friperie_solidaire"
})
const gerant = new Client({
    host: "localhost",
    user: "utilisateur",
    port: 5432,
    password: "0",
    database: "friperie_solidaire"
})

gerant.connect();
client.connect();

gerantConnecte = false;
clientConnecte = false;
nomClient = "";
prenomClient = "";
emailClient = "";
adresseClient = "";
telephoneClient = "";
prix_panier_actuel = 0
nombre_articls_paniers = 0


client.query("delete from panier", (err, resu)=> {
    if(!err){
        
    }
    else{
        console.log(err.message);
    }
})

app.get('/inscription', (req , res) => {
    reponse = {messageErreur : ""};
    res.render('inscription.ejs', reponse)
})

app.post('/inscription', (req, res) => {
    genre = req.body.et_civil;
    if(genre == "M.") genre = "Homme";
    else genre == "Femme";
    nom = req.body.nom;
    prenom = req.body.prenom;
    date = req.body.date_naissance
    adresse = req.body.adresse
    telephone = req.body.telephone
    email = req.body.email
    mdp = req.body.mot_de_passe
    hashed_mdp = sha1Hash(mdp);

    client.query("select COUNT(*) from clients where email = '"+email+"'", (err, resu)=> {
        if(!err){
            nb = parseInt(resu.rows[0].count);
            if(nb != 0){
                reponse = {messageErreur : "l'adresse mail existe deja"};
                res.render('inscription.ejs', reponse);
            }else{
                client.query("select COUNT(*) from clients where telephone = '"+telephone+"'", (err, resu2)=> {
                    if(!err){
                        nb2 = parseInt(resu2.rows[0].count);
                        if(nb2 != 0){
                            reponse = {messageErreur : "le numero de telephone existe deja"};
                            res.render('inscription.ejs', reponse);
                        }else{
                            client.query("insert into clients (genre, nom, prenom, date_de_naissance, adresse, telephone, email, mot_de_passe) values ('"+genre+"', '"+nom+"', '"+prenom+"', '"+date+"', '"+adresse+"', '"+telephone+"', '"+email+"', '"+hashed_mdp+"')", (err, resu3)=> {
                                if(!err){
                                    reponse = {messageErreur : ""};
                                    res.render('connexion.ejs');
                                }
                                else{
                                    console.log(err.message);
                                    
                                }
                            });
                        }
                        
                    }
                    else{
                        console.log(err.message);
                    }
                })
            }
            
        }
        else{
            console.log(err.message);
        }
    })

})

app.get('/connexion', (req , res) => {
    reponse = {messageErreur : ""};
    res.render('connexion.ejs', reponse)
})

app.post('/connexion', (req , res) => {
    email = req.body.email;
    mdp = req.body.password;
    client.query("select COUNT(*) from clients where email = '"+email+"'", (err, resu) => {
        if(!err){
            nb = parseInt(resu.rows[0].count);
            if(nb == 0){
                reponse = {messageErreur : "Aucun compte n'a été trouvé"};
                res.render('connexion.ejs', reponse);
            }
            else{
                client.query("select * from clients where email = '"+email+"'", (err, resu2) => {
                    if(!err){
                        mot_de_passe_client = resu2.rows[0].mot_de_passe
                        if(sha1Hash(mdp) == mot_de_passe_client){
                            clientConnecte = true;
                            nomClient = resu2.rows[0].nom;
                            prenomClient = resu2.rows[0].prenom;
                            emailClient = resu2.rows[0].email;
                            adresseClient = resu2.rows[0].adresse;
                            telephoneClient = resu2.rows[0].telephone;
                            accueil_get_script(req, res)
                        }
                        else{
                            reponse = {messageErreur : "Mot de passe incorrect"};
                            res.render('connexion.ejs', reponse);
                        }
                        
                    }
                    else{
                        console.log(err.message);
                    }
                })
            }
        }
        else{
            console.log(err.message);
        }
    })
})

app.post('/deconnexion', (req, res) => {
    clientConnecte = false;
    nomClient = "";
    prenomClient = "";
    emailClient = "";
    adresseClient = "";
    telephoneClient = "";
    accueil_get_script(req, res);
})



app.get('/', (req, res) => {
    
    accueil_get_script(req,res);

});

app.post('/', (req, res) => {
    
    actualisation_panier_script(req,res,'accueil.ejs');

});

app.get('/client', (req, res) => {

    accueil_get_script(req,res);

});

app.post('/client', (req, res) => {
    
    actualisation_panier_script(req,res,'accueil.ejs');

});

app.get('/accueil', (req, res) => {
   
    accueil_get_script(req,res);

});

app.post('/accueil', (req, res) => {
    
    actualisation_panier_script(req,res,'accueil.ejs');

});

app.get('/recherche', (req, res) => {
    client.query("select * from produit where nom_produit = ''", (err, resu)=> {
        if(!err){
            infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
            produits_recherche = {tab : resu.rows};
            infos_panier = [{nombre_article : nombre_articls_paniers,prix_panier : prix_panier_actuel}];
            data = {
                infos_client : infosClient,
                produits_recherche : produits_recherche,
                infos_panier : infos_panier
            }
            res.render('recherche.ejs' , data);
        }
        else{
            console.log(err.message);
        }
    })
});

app.post('/recherche', (req, res) => {
    if(req.body.id == undefined){
        const produit =  req.body.produit.toLowerCase();
        client.query("select * from produit p join stock s on p.id_produit = s.id_produit AND (s.stock_xs > 0 OR s.stock_s > 0 OR s.stock_m > 0 OR s.stock_l > 0 OR s.stock_xl > 0 OR s.stock_xxl > 0 OR s.stock_xxxl > 0) where LOWER(nom_produit) like '%"+produit+"%' AND p.id_produit NOT IN (select id_produit from panier) order by p.id_produit", (err, resu)=> {
            if(!err){
                infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
                produits_recherche = {tab : resu.rows};
                data = {
                    infos_client : infosClient,
                    produits_recherche : produits_recherche,
                }
                res.render('recherche.ejs' , data);
            }
            else{
                console.log(err.message);
            }
        })
    }else{
        actualisation_panier_script(req,res,'recherche.ejs')
    }
    
});

app.get('/combinaisons', (req, res) => {
    client.query("select * from produit where LOWER(nom_produit) like '%veste%'", (err, resu1)=> {
        if(!err){
            client.query("select * from produit where LOWER(nom_produit) like '%chemise%'", (err, resu2)=> {
                if(!err){
                    client.query("select * from produit where LOWER(nom_produit) like '%pantalon%' or LOWER(nom_produit) like '%jean%'", (err, resu3)=> {
                        if(!err){
                            client.query("select * from produit where LOWER(nom_produit) like '%ceinture%' or LOWER(nom_produit) like '%bretelles%'", (err, resu4)=> {
                                if(!err){
                                    client.query("select * from produit where LOWER(nom_produit) like '%cravate%' or LOWER(nom_produit) like '%papillon%'", (err, resu5)=> {
                                        if(!err){
                                            infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
                                            vestes = {tab : resu1.rows};
                                            chemises = {tab : resu2.rows};
                                            pantalons = {tab : resu3.rows};
                                            ceintures = {tab : resu4.rows};
                                            cravates = {tab : resu5.rows};
                                            infos_panier = [{nombre_article : nombre_articls_paniers,prix_panier : prix_panier_actuel}];
                                            data = {
                                                infos_client : infosClient,
                                                vestes : vestes,
                                                chemises : chemises,
                                                pantalons : pantalons,
                                                ceintures  : ceintures,
                                                cravates : cravates,
                                                infos_panier : infos_panier
                                            }
                                            res.render('combinaisons.ejs' , data);
                                        }
                                        else{
                                            console.log(err.message);
                                        }
                                    })
                                }
                                else{
                                    console.log(err.message);
                                }
                            })
                        }
                        else{
                            console.log(err.message);
                        }
                    })
                }
                else{
                    console.log(err.message);
                }
            })
        }
        else{
            console.log(err.message);
        }
    })
});

app.get('/panier', (req, res) => {
    client.query("select * from panier pa join produit pr on pa.id_produit = pr.id_produit join stock s on s.id_produit = pa.id_produit order by pa.id_produit ", (err, resu)=> {
        if(!err){
            produits = {tab : resu.rows};
            infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
            data = {
                infos_client : infosClient,
                produits : produits
            }
            res.render('panier.ejs' , data);
        }
        else{
            console.log(err.message);
        }
    })
});

app.post('/panier', (req, res) => {
    if(req.body.suppression == "true"){
        id = req.body.id;
        client.query("delete from panier where id_produit = "+id, (err, resu)=> {
            if(!err){
                client.query("select * from panier pa join produit pr on pa.id_produit = pr.id_produit join stock s on s.id_produit = pa.id_produit order by pa.id_produit ", (err, resu)=> {
                    if(!err){
                        prix_panier_actuel -= parseInt(req.body.prix);
                        nombre_articls_paniers --;
                        produits = {tab : resu.rows};
                        infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
                        data = {
                            infos_client : infosClient,
                            produits : produits
                        }
                        res.render('panier.ejs' , data);
                    }
                    else{
                        console.log(err.message);
                    }
                })
            }
            else{
                console.log(err.message);
            }    
        })
    }
    else{
        prix = req.body.prix_commande;
        nom = req.body.nom;
        prenom = req.body.prenom;
        adresse = req.body.adresse;
        telephone = req.body.telephone;
        email = req.body.email;
        date = req.body.date_livraison;
        infos = req.body.infos;
        tab_produits = infos.split(",");
        
        requete = "insert into commandes (prix, nom, prenom, adresse, telephone, email, date_livraison, archive) values ( " + prix + ", '" + nom + "', '" + prenom + "', '" + adresse + "', '" + telephone + "', '" + email + "', '" + date + "', false)";
        
        client.query(requete, (err, resu)=> {
            if(!err){
                
                client.query("delete from panier", (err, resu)=> {
                    if(!err){
                        for (let i = 0; i < tab_produits.length; i++) {
                            tab = tab_produits[i].split(" ");
                            update = "update stock set stock_xs = stock_xs -" + tab[1] + ", stock_s = stock_s-" + tab[2] + ", stock_m = stock_m-" + tab[3] + ", stock_l = stock_l-" + tab[4] + ", stock_xl = stock_xl-" + tab[5] + ", stock_xxl = stock_xxl-" + tab[6] + ", stock_xxxl = stock_xxxl-" + tab[7] + " where id_produit = " + tab[0]
                            //console.log(update)
                            client.query(update, (err, resu)=> {
                                if(!err){
                                    console.log("success update stock");
                                }
                                else{
                                    console.log("ici 1   "+err.message);
                                }
                            });
                            insert = "insert into contenu_commande (id_commande, id_produit, xs, s, m, l, xl, xxl, xxxl, accessoire) values ((select MAX(id_commande) from commandes)," + tab[0] + " ,"+tab[1]+", "+tab[2]+", "+tab[3]+", "+tab[4]+", "+tab[5]+", "+tab[6]+", "+tab[7]+", '"+tab[8]+"')";
                            //console.log(insert)
                            client.query(insert, (err, resu)=> {
                                if(!err){
                                    console.log("success insertion contenu")
                                }
                                else{
                                    console.log("ici 2   "+err.message);
                                }
                            })
                        }
                        prix_panier_actuel = 0
                        nombre_articls_paniers = 0
                        accueil_get_script(req, res)
                    }
                    else{
                        console.log("ici 3   "+err.message);
                    }
                })
            }
            else{
                console.log("ici 4   "+err.message);
            }
        })
    }
    
});


app.get('/gerant', (req, res) => {
    reponse = {messageErreur : ""};
    res.render('connexionGerant.ejs', reponse)
});

app.post('/gerant', (req, res) => {
    password = "6bc1d662661eb5063e6d1bcb9e75164e8204702b"; //Admin2023
    input = req.body.password;
    if(password === sha1Hash(input)){
        gerant.query("select * from produit order by id_produit", (err, resu)=> {
            if(!err){
                gerantConnecte = true;
                reponse = {messageErreur : ""};
                produits = {tab : resu.rows};
                data = {
                    reponse : reponse,
                    produits : produits
                }
                res.render('supprimerGerant.ejs' , data);
            }
            else{
                console.log(err.message);
            }
        })
    }
    else{
        reponse = {messageErreur : "mot de passe incorect"};
        res.render('connexionGerant.ejs', reponse);
    }
    
});

app.get('/supprimerGerant', (req, res) => {
    if (gerantConnecte == true) {
        gerant.query("select * from produit order by id_produit", (err, resu)=> {
            if(!err){
                reponse = {messageErreur : ""};
                produits = {tab : resu.rows};
                data = {
                    reponse : reponse,
                    produits : produits
                }
                res.render('supprimerGerant.ejs' , data);
            }
            else{
                console.log(err.message);
            }
        })
    }
    else{
        reponse = {messageErreur : ""};
        res.render('connexionGerant.ejs', reponse)
    }
});

app.post('/supprimerGerant', (req, res) => {
    produit =  parseInt(req.body.produit);
    if (Number.isInteger(produit)) {
        client.query("select * from produit where id_produit = "+produit + " order by id_produit", (err, resu)=> {
            if(!err){
                reponse = {messageErreur : ""};
                produits = {tab : resu.rows};
                data = {
                    reponse : reponse,
                    produits : produits
                }
                res.render('supprimerGerant.ejs' , data);
            }
            else{
                console.log(err.message);
            }
        })
    } else {
        produit = req.body.produit;
        client.query("select * from produit where LOWER(nom_produit) like '%"+produit.toLowerCase()+"%' order by id_produit", (err, resu)=> {
            if(!err){
                reponse = {messageErreur : ""};
                produits = {tab : resu.rows};
                data = {
                    reponse : reponse,
                    produits : produits
                }
                res.render('supprimerGerant.ejs' , data);
            }
            else{
                console.log(err.message);
            }
        })
    }
    
});

app.post('/supprimerGerant/confirmation', (req, res) => {
    produit = req.body.produit;
    message = ""
    client.query("select * from contenu_commande con join commandes com on con.id_commande = com.id_commande where archive = false and con.id_produit = " + produit, (err, resu) => {
        if (!err) {
            if (resu.rowCount == 0) {
                client.query("delete from stock where id_produit = "+produit, (err, resu)=> {
                    if(!err){
                       client.query("delete from produit where id_produit = "+produit, (err, resu)=> {
                            if(!err){
                                console.log("suppression réussie")
                            }
                            else{
                                console.log(err.message);
                            }
                        })
                    }
                    else{
                        console.log(err.message);
                    }
                })
            }
            else{
                message = "Ce produit existe dans une commande!!"
            }
            gerant.query("select * from produit order by id_produit", (err, resu)=> {
                if(!err){
                    reponse = {messageErreur : message};
                    produits = {tab : resu.rows};
                    data = {
                        reponse : reponse,
                        produits : produits
                    }
                    res.render('supprimerGerant.ejs' , data);
                }
                else{
                    console.log(err.message);
                }
            })
        }else {
            console.log(err.message);
        }
    })
    
    
});

app.get('/ajoutGerant', (req, res) => {
    if (gerantConnecte == true) {
        res.render('ajoutGerant.ejs');
    }
    
    else{
        reponse = {messageErreur : ""};
        res.render('connexionGerant.ejs', reponse)
    }
});

app.post('/ajoutGerant', (req, res) => {
    requete_1 = "insert into produit ( nom_produit, prix_produit, description, image_produit) values ( '" + req.body.nom + "', " + req.body.prix + ", '" + req.body.description + "', '" + req.body.image + "' )";
    client.query(requete_1, (err, resu)=> {
        if(!err){
            client.query("SELECT id_produit FROM produit WHERE id_produit = (SELECT MAX(id_produit) FROM produit)", (err, resu)=> {
                if(!err){
                    id = resu.rows[0].id_produit;
                    requete_2 = "insert into stock (id_produit, stock_xs, stock_s, stock_m, stock_l, stock_xl, stock_xxl, stock_xxxl) values ( " + id + ", " + req.body.stock_xs + ", " + req.body.stock_s + ", " + req.body.stock_m + ", " + req.body.stock_l + ", " + req.body.stock_xl + ", " + req.body.stock_xxl + ", " + req.body.stock_xxxl + " )";
                    client.query(requete_2, (err, resu)=> {
                    if(!err){
                       console.log("success")
                       res.render('ajoutGerant')
                    }
                    else{
                        console.log("1 =>" + err.message);
                    }
                })
                }
                else{
                    console.log("2 =>" + err.message);
                }
            })
        }
        else{
            console.log("3 =>" + err.message);
        }
    })

});


app.get('/modificationGerant', (req, res) => {
    if (gerantConnecte == true) {
        client.query("select * from produit order by id_produit", (err, resu)=> {
            if(!err){
                produits = {tab : resu.rows};
                res.render('modificationGerant.ejs' , {produits});
            }
            else{
                console.log(err.message);
            }
        })
    }
    else{
        reponse = {messageErreur : ""};
        res.render('connexionGerant.ejs', reponse)
    }
});

app.post('/modificationGerant', (req, res) => {
    produit =  parseInt(req.body.produit);
    if (Number.isInteger(produit)) {
        client.query("select * from produit pr join stock s on pr.id_produit = s.id_produit where pr.id_produit = "+produit, (err, resu)=> {
            if(!err){
                produits = {tab : resu.rows};
                res.render('modificationGerant.ejs' , {produits});
            }
            else{
                console.log(err.message);
            }
        })
    } else {
        produit = req.body.produit;
        client.query("select * from produit pr join stock s on pr.id_produit = s.id_produit where LOWER(nom_produit) like '%"+produit.toLowerCase()+"%' order by pr.id_produit", (err, resu)=> {
            if(!err){
                produits = {tab : resu.rows};
                res.render('modificationGerant.ejs' , {produits});
            }
            else{
                console.log(err.message);
            }
        })
    }
    
});

app.post('/modificationGerant/confirmation', (req, res) => {
    id = req.body.id
    client.query("select * from stock where id_produit = " + id, (err, resu)=> {
        if(!err){
            xs = resu.rows[0].stock_xs + req.body.stock_xs;
            if (xs < 0) xs = 0;
            s = resu.rows[0].stock_s + req.body.stock_s;
            if (s < 0) s = 0;
            m = resu.rows[0].stock_m + req.body.stock_m;
            if (m < 0) m = 0;
            l = resu.rows[0].stock_l + req.body.stock_l;
            if (l < 0) l = 0;
            xl = resu.rows[0].stock_xl + req.body.stock_xl;
            if (xl < 0) xl = 0;
            xxl = resu.rows[0].stock_xxl + req.body.stock_xxl;
            if (xxl < 0) xxl = 0;
            xxxl = resu.rows[0].stock_xxxl + req.body.stock_xxxl;
            if (xxxl < 0) xxxl = 0;
            client.query("update stock set stock_xs = " + xs + ", stock_s = " + s + ", stock_m = " + m + ", stock_l = " + l + ", stock_xl = " + xl + ", stock_xxl = " + xxl + ", stock_xxxl = " + xxxl + " where id_produit = " + id, (err, resu)=> {
                if(!err){
                    console.log("success")
                    res.render('modificationGerant.ejs');
                }
                else{
                    console.log(err.message);
                }
            })
        }
        else{
            console.log(err.message);
        }
    })

   
    
});

app.get('/commandes', (req, res) => {
    if (gerantConnecte == true) {
        client.query("select * from commandes where archive = false", (err, resu) => {
            if(!err){
                commandes = {tab : resu.rows};
                res.render('commandes.ejs' , {commandes});
            }
        })
    }
    else{
        reponse = {messageErreur : ""};
        res.render('connexionGerant.ejs', reponse)
    }
});

app.post('/commandes', (req, res) => {
    id_commande = req.body.id_commande;
    suppression = req.body.suppression;
    if(suppression == "false")
        client.query("select * from contenu_commande c join produit p on c.id_produit = p.id_produit where id_commande = "+id_commande, (err, resu) => {
            if(!err){
                produits = {tab : resu.rows};
                res.render('consultationCommande.ejs' , {produits});
            }
        })
    else{
        client.query("delete from contenu_commande where id_commande = "+id_commande, (err, resu) => {
            if(!err){
                client.query("update commandes set archive = true where id_commande = "+id_commande, (err, resu) => {
                    if(!err){
                        client.query("select * from commandes where archive = false", (err, resu) => {
                            if(!err){
                                commandes = {tab : resu.rows};
                                res.render('commandes.ejs' , {commandes});
                            }
                            else{
                                console.log(err.message)
                            }
                        })
        
                    }
                    else{
                        console.log(err.message)
                    }
                })
            }
        })

        
    }
});

function accueil_get_script(req,res){

    client.query("select * from produit p join stock s on p.id_produit = s.id_produit AND (s.stock_xs > 0 OR s.stock_s > 0 OR s.stock_m > 0 OR s.stock_l > 0 OR s.stock_xl > 0 OR s.stock_xxl > 0 OR s.stock_xxxl > 0) where p.id_produit NOT IN (select id_produit from panier) order by p.id_produit", (err, resu)=> {
        if(!err){
            infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
            produits = {tab : resu.rows};
            infos_panier = [{nombre_article : nombre_articls_paniers,prix_panier : prix_panier_actuel}];
            data = {
                infos_client : infosClient,
                produits_recherche : produits,
                infos_panier : infos_panier
            }
            res.render('accueil.ejs' , data);
        }
        else{
            console.log(err.message);
        }
    })
}

function actualisation_panier_script(req,res,fic_ejs) {

    const id =  req.body.id;

    const accessoire = req.body.choix_acc;

    client.query("insert into panier (id_produit, accessoire) values (" + id + ", '" + accessoire + "')", (err, resu)=> {
        if(!err){
            client.query("select * from produit p join stock s on p.id_produit = s.id_produit AND (s.stock_xs > 0 OR s.stock_s > 0 OR s.stock_m > 0 OR s.stock_l > 0 OR s.stock_xl > 0 OR s.stock_xxl > 0 OR s.stock_xxxl > 0) where p.id_produit NOT IN (select id_produit from panier) order by p.id_produit", (err2, resu2)=> {
                produits = {tab : resu2.rows};
                infos_panier =[{nombre_article : nombre_articls_paniers,prix_panier : prix_panier_actuel}];

                client.query("SELECT SUM(prix_produit) AS prix_total FROM panier JOIN produit ON panier.id_produit = produit.id_produit", (err3, resu3)=> {
                    infos_panier[0].prix_panier = resu3.rows[0].prix_total;
                    prix_panier_actuel = infos_panier[0].prix_panier;

                    client.query("SELECT COUNT(*) AS total_produits FROM panier", (err4, resu4)=> {
                        infos_panier[0].nombre_article = resu4.rows[0].total_produits
                        nombre_articls_paniers = infos_panier[0].nombre_article;

                        infosClient = [{connecte : clientConnecte, nom : nomClient, prenom : prenomClient, email : emailClient, adresse : adresseClient, telephone : telephoneClient}]
                        data = { 
                            infos_client : infosClient,
                            produits : produits,
                            infos_panier : infos_panier
                        };

                        res.render(fic_ejs , data);
                    });
                });
            });
        }
        else{
            console.log(err.message);
        }
    })
}

function sha1Hash(input) {
    const hash = crypto.createHash('sha1');
    hash.update(input);
    return hash.digest('hex');
}

// Démarrage du serveur
app.listen(8080, () => console.log('Serveur démarré sur le port 8080'));


