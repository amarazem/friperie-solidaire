CREATE TABLE IF NOT EXISTS produit
(
    id_produit SERIAL PRIMARY KEY NOT NULL,
    nom_produit VARCHAR(50),
    prix_produit numeric(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    image_produit VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS stock (
  id_produit INTEGER PRIMARY KEY REFERENCES produit(id_produit),
  stock_xs INTEGER NOT NULL,
  stock_s INTEGER NOT NULL,
  stock_m INTEGER NOT NULL,
  stock_l INTEGER NOT NULL,
  stock_xl INTEGER NOT NULL,
  stock_xxl INTEGER NOT NULL,
  stock_xxxl INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS panier (
  id_produit INTEGER PRIMARY KEY REFERENCES produit(id_produit),
  accessoire VARCHAR(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS commandes (
  id_commande SERIAL PRIMARY KEY NOT NULL,
  prix INTEGER NOT NULL,  
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_livraison DATE NOT NULL,
  archive BOOLEAN
);

CREATE TABLE IF NOT EXISTS contenu_commande (
  id_commande INTEGER REFERENCES commandes(id_commande),
  id_produit INTEGER REFERENCES produit(id_produit),
  xs INTEGER NOT NULL,
  s INTEGER NOT NULL,
  m INTEGER NOT NULL,
  l INTEGER NOT NULL,
  xl INTEGER NOT NULL,
  xxl INTEGER NOT NULL,
  xxxl INTEGER NOT NULL,
  accessoire VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_commande, id_produit)
);

CREATE TABLE IF NOT EXISTS clients (
  id_client SERIAL PRIMARY KEY NOT NULL,
  genre VARCHAR(5) NOT NULL,
  nom VARCHAR(50) NOT NULL,
  prenom VARCHAR(50) NOT NULL,
  date_de_naissance DATE NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL
);

INSERT INTO produit (nom_produit, prix_produit, description, image_produit)
VALUES 
('Jogging',35.00,'Jogging pour femmes','../src/produits/01.png'),
('T-shirt',15.00,'T-shirt basique pour hommes','../src/produits/02.png'),
('Short',20.00,'Short de bain pour enfants','../src/produits/03.png'),
('Sweatshirt',30.00,'Sweatshirt à capuche pour femmes','../src/produits/04.png'),
('Jupe',25.00,'Jupe midi en jean pour femmes','../src/produits/05.png'),
('Chemise',45.00,'Chemise à carreaux pour hommes','../src/produits/06.png'),
('Robe',50.00,'Robe de soirée pour femmes','../src/produits/07.png'),
('Pull',40.00,'Pull en laine pour hommes','../src/produits/08.png'),
('Maillot de bain',30.00,'Maillot de bain une pièce pour femmes','../src/produits/09.png'),
('Sacoche',20.00,'Sacoche en cuir pour hommes','../src/produits/10.png'),
('Sandales',25.00,'Sandales à talons pour femmes','../src/produits/11.png'),
('Casquette',10.00,'Casquette de baseball pour hommes','../src/produits/12.png'),
('Chaussures de sport',40.00,'Chaussures de sport pour enfants','../src/produits/13.png'),
('Chemisier',30.00,'Chemisier en soie pour femmes','../src/produits/14.png'),
('Cravate',15.00,'Cravate en soie pour hommes','../src/produits/15.png'),
('Short',35.00,'Short pour femmes','../src/produits/16.png'),
('Veste en cuir',60.00,'Veste en cuir pour hommes','../src/produits/17.png'),
('Leggings',20.00,'Leggings de sport pour femmes','../src/produits/18.png'),
('Veste',25.00,'Veste classique pour hommes','../src/produits/19.png'),
('Bottes',50.00,'Bottes en cuir pour femmes','../src/produits/20.png'),
('Polo',25.00,'Polo pour hommes','../src/produits/21.png'),
('Robe',30.00,'Robe pour femmes','../src/produits/22.png'),
('Chemise',35.00,'Chemise en jean pour hommes','../src/produits/23.png'),
('Montre',40.00,'Montre pour femmes','../src/produits/24.png'),
('Sac à dos',30.00,'Sac à dos pour enfants','../src/produits/25.png'),
('Chaussures de ville',45.00,'Chaussures de ville pour hommes','../src/produits/26.png'),
('Baskets',30.00,'Baskets pour femmes','../src/produits/27.png'),
('Veste légère',25.00,'Veste légère pour hommes','../src/produits/28.png'),
('Sweat',20.00,'Sweat pour femmes','../src/produits/29.png'),
('Jean',40.00,'Jean pour hommes','../src/produits/30.png'),
('Pantalon',30.00,'Pantalon classique pour hommes','../src/produits/31.png'),
('Chaussettes',5.00,'Chaussettes pour hommes','../src/produits/32.png'),
('Chemise',15.00,'Chemise blanche classique pour hommes','../src/produits/33.png'),
('Sac de voyage',55.00,'Sac de voyage pour hommes','../src/produits/34.png'),
('Manteau',10.00,'Manteau pour hommes','../src/produits/35.png'),
('Doudoune',40.00,'Doudoune pour hommes','../src/produits/36.png'),
('Jupe',25.00,'Jupe pour femmes','../src/produits/37.png'),
('Bonnet',10.00,'Bonnet pour hommes','../src/produits/38.png'),
('Maillot de bain',30.00,'Maillot de bain pour femmes','../src/produits/39.png'),
('Veste',25.00,'Veste de sport pour hommes','../src/produits/40.png'),
('Salopette',30.00,'très belle salopette en jean','../src/produits/41.png'),
('Veste de costume',35.00,'Veste de costume pour homme','../src/produits/42.png'),
('Chemise',30.00,'Chemise noire hommes','../src/produits/43.png'),
('Pantalon',30.00,'Pantalon classique pour homme','../src/produits/44.png'),
('Jean',15.00,'Jean noir pour homme','../src/produits/45.png'),
('Veste',20.00,'Veste en jean pour hommes','../src/produits/46.png'),
('Cravate',10.00,'Cravate pour hommes','../src/produits/47.png'),
('Cravate',10.00,'Cravate pour hommes','../src/produits/48.png'),
('Cravate',10.00,'Cravate pour hommes','../src/produits/49.png'),
('Cravate',10.00,'Cravate pour hommes','../src/produits/50.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/51.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/52.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/53.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/54.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/55.png'),
('Noeud papillon',10.00,'Noeud papillon pour hommes','../src/produits/56.png'),
('Ceinture',10.00,'Ceinture pour hommes','../src/produits/57.png'),
('Ceinture',10.00,'Ceinture pour hommes','../src/produits/58.png'),
('Ceinture',10.00,'Ceinture pour hommes','../src/produits/59.png'),
('Ceinture',10.00,'Ceinture pour hommes','../src/produits/60.png'),
('Ceinture',10.00,'Ceinture pour hommes','../src/produits/61.png'),
('Bretelles',10.00,'Bretelles pour hommes','../src/produits/62.png'),
('Bretelles',10.00,'Bretelles pour hommes','../src/produits/63.png'),
('Bretelles',10.00,'Bretelles pour hommes','../src/produits/64.png'),
('Bretelles',10.00,'Bretelles pour hommes','../src/produits/65.png');

insert into stock (id_produit, stock_xs, stock_s, stock_m, stock_l, stock_xl, stock_xxl, stock_xxxl) values 
(1, 3, 1, 8, 4, 4, 1, 1),
(2, 0, 5, 6, 5, 1, 0, 5),
(3, 3, 2, 0, 0, 9, 5, 4),
(4, 6, 6, 5, 1, 8, 5, 6),
(5, 6, 5, 2, 6, 3, 3, 9),
(6, 1, 8, 9, 3, 1, 7, 4),
(7, 7, 5, 8, 5, 8, 5, 6),
(8, 2, 9, 1, 9, 8, 4, 3),
(9, 5, 9, 6, 4, 2, 6, 8),
(10, 0, 7, 1, 6, 1, 6, 1),
(11, 6, 9, 7, 8, 0, 4, 1),
(12, 7, 2, 2, 9, 9, 7, 2),
(13, 3, 2, 7, 2, 7, 2, 1),
(14, 9, 2, 7, 5, 2, 6, 7),
(15, 4, 2, 0, 2, 2, 8, 4),
(16, 9, 2, 0, 1, 2, 4, 8),
(17, 8, 9, 2, 1, 7, 0, 1),
(18, 6, 6, 3, 3, 1, 3, 1),
(19, 0, 6, 6, 1, 8, 3, 3),
(20, 6, 5, 6, 6, 2, 8, 7),
(21, 1, 9, 0, 1, 3, 2, 1),
(22, 1, 6, 7, 9, 7, 2, 0),
(23, 9, 4, 5, 5, 1, 6, 0),
(24, 1, 7, 5, 0, 0, 6, 0),
(25, 3, 0, 5, 4, 8, 6, 7),
(26, 0, 0, 7, 8, 2, 7, 9),
(27, 5, 6, 5, 4, 8, 3, 5),
(28, 2, 4, 0, 9, 2, 2, 1),
(29, 3, 9, 0, 2, 5, 2, 2),
(30, 7, 8, 3, 7, 2, 0, 5),
(31, 1, 9, 5, 5, 4, 4, 7),
(32, 0, 2, 5, 0, 4, 9, 2),
(33, 0, 6, 4, 0, 4, 1, 3),
(34, 8, 3, 7, 9, 8, 4, 2),
(35, 9, 3, 8, 5, 4, 6, 2),
(36, 3, 2, 4, 8, 7, 6, 9),
(37, 3, 7, 6, 0, 7, 8, 2),
(38, 8, 6, 8, 2, 8, 1, 0),
(39, 0, 0, 0, 1, 9, 1, 1),
(40, 0, 4, 7, 1, 6, 3, 1),
(41, 8, 6, 3, 4, 9, 6, 9),
(42, 8, 2, 0, 2, 2, 2, 2),
(43, 2, 3, 6, 4, 0, 0, 8),
(44, 2, 0, 5, 8, 7, 1, 6),
(45, 7, 9, 2, 0, 1, 0, 5),
(46, 3, 8, 0, 1, 4, 5, 1),
(47, 9, 4, 1, 0, 5, 6, 0),
(48, 9, 6, 9, 2, 8, 9, 5),
(49, 5, 9, 4, 2, 3, 2, 7),
(50, 8, 2, 0, 3, 7, 2, 5),
(51, 7, 6, 4, 8, 6, 3, 7),
(52, 8, 4, 3, 0, 6, 4, 2),
(53, 9, 4, 6, 0, 9, 6, 5),
(54, 0, 2, 7, 0, 0, 2, 0),
(55, 1, 0, 9, 0, 7, 4, 0),
(56, 8, 0, 4, 5, 8, 1, 1),
(57, 4, 9, 6, 8, 6, 5, 5),
(58, 8, 9, 4, 9, 8, 9, 9),
(59, 5, 2, 5, 3, 8, 1, 5),
(60, 7, 3, 0, 9, 4, 0, 5),
(61, 9, 3, 4, 8, 3, 9, 7),
(62, 2, 6, 0, 3, 8, 8, 9),
(63, 8, 3, 4, 2, 1, 3, 9),
(64, 0, 3, 7, 2, 0, 6, 7),
(65, 0, 1, 7, 2, 1, 0, 5);