# Mission München — München mal anders

Quiz de révision A2+/B1 pour les élèves de Première : 40 tâches, quatre étapes autonomes de dix. Site statique sans compte, API, analytics, cookies ni dépendance externe au chargement.

## Essayer la démonstration

Décompresser l’archive, puis ouvrir **demo.html** dans un navigateur. Tout le code est intégré dans ce fichier : il fonctionne aussi hors ligne. Sur téléphone, la mise en ligne est le moyen le plus simple d’y accéder.

Pour travailler sur les fichiers séparés, ouvrir **index.html**, ou lancer un petit serveur depuis ce dossier :

```sh
python3 -m http.server 8080
```

Ouvrir ensuite `http://localhost:8080`. Aucun serveur applicatif n’est utilisé : ce serveur sert uniquement les fichiers statiques.

## Organisation

- `data.js` : les 40 tâches, les réponses attendues et les explications françaises.
- `engine.js` : mélange Fisher–Yates, évaluation exacte et calcul des scores.
- `map.js` : coordonnées SVG, rues, bâtiments, trajets et simulateur géométrique.
- `quiz.js` : associations, classement, ordre par boutons, menus, carte, navigation et résultats.
- `style.css` : présentation responsive et styles de focus.
- `index.html` : entrée du site avec fichiers séparés.
- `demo.html` : même quiz regroupé dans un fichier autonome.
- `tests/quiz.test.cjs` : tests automatisés exécutables sans installation de dépendances.
- `tools/build_demo.py` : régénération de la démonstration après une modification.

Les données pédagogiques proviennent du cahier des charges de l’enseignant. Les documents FKK et These Girls ne sont pas reproduits : ces étapes servent à réviser les supports étudiés en classe.

## Réponses, scores et progression

Une tâche vaut un point. Toutes les sous-réponses doivent être justes pour gagner ce point. La validation verrouille la réponse ; l’élève lit le feedback puis continue. Un nouvel essai remet le score de l’étape à zéro. Les quatre étapes restent toujours accessibles.

Les QCM et les propositions des menus sont mélangés. Les expressions de classement sont également mélangées. Les blocs se placent par clic, toucher ou activation clavier ; cliquer à nouveau sur un bloc placé le retire. Aucune manipulation par glisser-déposer n’est nécessaire.

La sauvegarde est désactivée par défaut. Si elle est activée, seuls les derniers scores des étapes et ce choix sont enregistrés dans `localStorage`. Les réponses ne sont pas conservées ni transmises. Le bouton d’effacement supprime les scores. Désactiver la sauvegarde supprime les valeurs persistantes ; les scores peuvent rester en mémoire jusqu’au rechargement.

## Plan et trois itinéraires

Le plan est **fictif**, inspiré du plan touristique fourni. Le réseau est défini par des coordonnées, des segments et des nœuds internes invisibles. Les rues sont obliques et leurs îlots de dimensions variées. Les destinations utilisent des illustrations SVG intégrées, sans image générée ni service externe.

- Tâche 8 : départ à la Bücherei, orienté vers le Café ; premier carrefour, gauche, deuxième carrefour, droite, premier carrefour. Destination : Museum. Aucun tracé ni nom de destination dans les consignes.
- Tâche 9 : départ au Hotel, orienté vers la Kirche ; premier carrefour, gauche, deuxième carrefour. Les deux nombres rendent les trois consignes distinctes.
- Tâche 10 : départ au Bahnhof, orienté vers le Museum ; deuxième carrefour, gauche et premier carrefour, droite et premier carrefour. La destination n’est pas donnée.

Le nombre de carrefours commence après le départ ou le virage. Un virage change l’orientation sans avancer. Le simulateur identifie les voisins par leur angle relatif : moins de 25° pour continuer, 35° à 135° pour un virage. Il refuse une instruction s’il existe zéro ou plusieurs voisins possibles. Les tests lisent aussi les consignes allemandes affichées pour simuler le parcours indépendamment des actions enregistrées.

La tâche 10 conserve les mots proposés `erste / zweite` ; la terminaison **n** est fixe dans la phrase après `zur` (forme correcte : `zur zweiten Kreuzung`). Les indices de genre sont invisibles avant leur activation ; chaque couleur est accompagnée d’un texte.

## Tests automatisés

Installer Node.js (aucune dépendance npm requise), puis :

```sh
npm test
```

Ou :

```sh
node --test tests/quiz.test.cjs
```

**16 tests réussis lors de la livraison.** Ils vérifient la banque de 40 tâches, les réponses et options, la validation complète des tâches composites, le calcul des scores, le mélange, les trois trajets, l’unicité des déplacements, la cohérence entre les consignes affichées et les déplacements, la présence des indices et des contrôles clavier dans le code, ainsi que l’absence de requêtes externes dans l’application.

Ces tests ne constituent pas un test visuel dans un navigateur et ne certifient pas WCAG 2.2 AA. Le navigateur de contrôle n’était pas disponible dans l’environnement de réalisation : l’affichage réel sur smartphone, les lecteurs d’écran et le parcours complet des interactions restent à vérifier avant la diffusion à la classe.

### Recette à effectuer dans un navigateur

1. Ouvrir à 360 px de largeur et sur un véritable smartphone : aucun défilement horizontal, boutons lisibles, menus accessibles. Les menus affichant de longues phrases doivent permettre de lire les options.
2. Parcourir au clavier : Tab, Maj+Tab, Entrée et Espace ; choisir un QCM avec les touches de direction ; utiliser les menus et placer/retirer les blocs.
3. Sur la carte 8, activer un bâtiment par Entrée ou Espace, puis choisir un autre bâtiment dans la liste alternative.
4. Vérifier que les expressions Wo/Wohin arrivent mélangées et sans couleurs. Afficher les deux indices.
5. Valider des réponses incomplètes : aucune tâche suivante, aucun point ajouté.
6. Terminer une étape entièrement juste : 10/10 ; entièrement fausse : 0/10. Vérifier les feedbacks et recommencer uniquement cette étape.
7. Activer la sauvegarde, recharger, vérifier les scores ; désactiver et recharger ; vérifier l’effacement.
8. Déconnecter le réseau après le chargement ou ouvrir demo.html hors ligne : toutes les interactions doivent fonctionner.

## Publication sur GitHub Pages

Dépôt cible : https://github.com/dabafapo-web/mission-muenchen

Adresse attendue (à vérifier après déploiement) : https://dabafapo-web.github.io/mission-muenchen/

Le workflow fourni publie le site après réussite des tests. Dans Settings → Pages, sélectionner **GitHub Actions** comme source. Une adresse attendue ne constitue pas une preuve de publication.

1. Utiliser le dépôt `dabafapo-web/mission-muenchen`.
2. Ajouter à sa racine `index.html`, `style.css`, `data.js`, `engine.js`, `map.js` et `quiz.js` (les autres fichiers peuvent aussi être ajoutés). **Ne pas téléverser uniquement l’archive ZIP.**
3. Dans les paramètres du dépôt, ouvrir la rubrique **Pages**, choisir **GitHub Actions** comme source. Le workflow `.github/workflows/pages.yml` exécute les tests puis publie les fichiers statiques. Il peut être relancé depuis l’onglet Actions avec **Run workflow**.
4. Attendre la fin du déploiement. Reprendre l’URL réellement indiquée par GitHub Pages ; ne pas construire ni supposer une URL.
5. Ouvrir cette URL depuis un téléphone, vérifier les quatre étapes et les trois tâches de carte, puis effectuer la recette ci-dessus.
6. Après publication et vérification de l’URL, générer le QR PNG et l’affiche A4 PDF intitulée **« München mal anders — Quiz de révision »**, avec la consigne : « Scanne le QR code, choisis une étape et révise à ton rythme. »

Le site n’utilise que des chemins relatifs : il peut fonctionner dans le sous-dossier d’un dépôt GitHub Pages. Le quiz n’envoie aucune réponse ; l’hébergeur peut conserver ses propres journaux techniques d’accès.

Référence de publication : [documentation officielle GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
