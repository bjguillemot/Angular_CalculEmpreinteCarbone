const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let db = new sqlite3.Database('./travels.db', (err) => {
    if (err) {
        // return console.error(err.message);
    }
    console.log('Connected to the SQlite database.'); 
});

// Création de la table si elle n'existe pas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            empreinteCarbone REAL DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error("Erreur lors de la création de la table 'users' :", err.message);
        } else {
            console.log("La table 'users' est prête (déjà existante ou créée).");

            // Insère 5 utilisateurs avec des empreintes carbone aléatoires, à mettre en commentaire une fois les users créés
            const insertUser = db.prepare("INSERT INTO users (empreinteCarbone) VALUES (?)");

            for (let i = 0; i < 5; i++) {
                const empreinteAleatoire = (Math.random() * 100).toFixed(2); // Génère un nombre aléatoire entre 0 et 100 avec 2 décimales
                insertUser.run(empreinteAleatoire, (err) => {
                    if (err) {
                        console.error("Erreur lors de l'insertion d'un utilisateur :", err.message);
                    }
                });
            }

            insertUser.finalize(() => {
                console.log("5 utilisateurs ont été ajoutés");
            });
        }
    });
	 // Table travel
    db.run(`
        CREATE TABLE IF NOT EXISTS travel (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            distance INTEGER NOT NULL,
            consommation INTEGER NOT NULL,
            co2 INTEGER NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			travelType VARCHAR NULL DEFAULT 'car',
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) {
            console.error("Erreur lors de la création de la table 'travel' :", err.message);
        } else {
            console.log("La table 'travel' est prête (déjà existante ou créée).");

            // Insère des exemples de trajets pour les utilisateurs
            const insertTravel = db.prepare(`
                INSERT INTO travel (distance, consommation, co2, userId) VALUES (?, ?, ?, ?)
            `);

            for (let i = 0; i < 5; i++) {
                const distance = Math.floor(Math.random() * 500) + 50; // Distance entre 50 et 550 km				
                const consommation = Math.floor(Math.random() * 10) + 5; // Consommation entre 5 et 15 L/100 km
                const co2 = Math.floor(distance * consommation * 2.6 / 100); // Calcul simplifié de CO2
                const userId = 1; // Associe à un utilisateur existant

                insertTravel.run(distance, consommation, co2, userId, (err) => {
                    if (err) {
                        console.error("Erreur lors de l'insertion d'un trajet :", err.message);
                    }
                });
            }

            insertTravel.finalize(() => {
                console.log("5 trajets aléatoires ont été ajoutés à l'utilisateur 1.");
            });
        }
    });
});



app.get('/calculerTrajetVoiture', (req, res) => {
    const consommation = Number(req.query.consommationPour100Km);   
    const distanceKm = Number(req.query.distanceKm);

    if (!consommation || !distanceKm) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = 2.7;
    const empreinteCarbone = (consommation / 100) * distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/calculerTrajetAvion', (req, res) => {
    const distanceKm = Number(req.query.distanceKm);

    if (!distanceKm) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = 115; // Par km parcouru
    const empreinteCarbone = distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/calculerTrajetTrain', (req, res) => {
    const distanceKm = Number(req.query.distanceKm);   

    if (!distanceKm) {
        return res.status(400).send("Erreur dans les arguments");
    }
    const emissionFactor = 0.045; //par km parcouru
    const empreinteCarbone = distanceKm * emissionFactor;

    res.send({ empreinteCarbone });
});

app.get('/monEmpreinteCarbone', (req, res) => {
    const idUtilisateur = Number(req.query.idUtilisateur);

    if (!idUtilisateur) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.get(`SELECT empreinteCarbone FROM users WHERE id = ?`, [idUtilisateur], (err, row) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de l'obtention de l'empreinte carbone");
          }
          return res.send(row);
       });
    });
});

app.put('/ajouterEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;
    const empreinteCarbone = req.body.empreinteCarbone;

    if (!idUtilisateur || !empreinteCarbone) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = empreinteCarbone + ? WHERE id = ?`, [empreinteCarbone, idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Error updating carbon footprint");
          }
          return res.send("Success");
       });
    });
});

app.put('/retirerEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;
    const empreinteCarbone = req.body.empreinteCarbone;

    if (!idUtilisateur || !empreinteCarbone) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = MAX(empreinteCarbone - ?, 0) WHERE id = ?`, [empreinteCarbone, idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de la mise à jour de l'empreinte carbone");
          }
          return res.send("Success");
       });
    });
});

app.post('/supprimerEmpreinteCarbone', (req, res) => {
    const idUtilisateur = req.body.idUtilisateur;

    if (!idUtilisateur) {
        return res.status(400).send("Erreur dans les arguments");
    }

    db.serialize(() => {
       db.run(`UPDATE users SET empreinteCarbone = 0 WHERE id = ?`, [idUtilisateur], (err) => {
          if (err) {
              console.error(err.message);
              return res.status(500).send("Erreur lors de la suppression de l'empreinte carbone");
          }
          return res.send("Success");
       });
    });
});

// Route pour récupérer tous les trajets d'un utilisateur
app.get('/tousMesVoyages/:userId', (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).send("Erreur : ID utilisateur requis");
    }

    db.all("SELECT * FROM travel WHERE userId = ?", [userId], (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des trajets :", err.message);
            return res.status(500).send("Erreur lors de la récupération des trajets");
        }
        res.json(rows); // Retourne les trajets sous forme de JSON
    });
});

// Route pour ajouter un nouveau trajet pour un utilisateur
app.post('/ajouterUnVoyage', (req, res) => {
    const { userId, distance, consommation, co2, travelType } = req.body;

    // Vérification des champs requis
    if (!userId || !distance || !co2 || !travelType) {
        return res.status(400).send("Erreur : Tous les champs (userId, distance, consommation, co2) sont requis");
    }

    const stmt = db.prepare("INSERT INTO travel (distance, consommation, co2, userId, travelType) VALUES (?, ?, ?, ?, ?)");
    stmt.run(distance, consommation, co2, userId, travelType, (err) => {
        if (err) {
            console.error("Erreur lors de l'ajout du trajet :", err.message);
            return res.status(500).send("Erreur lors de l'ajout du trajet");
        }
        res.send({success : true});
    });
    stmt.finalize();
});

const server = app.listen(8080, () => {
    console.log('Listening on port 8080...');
});