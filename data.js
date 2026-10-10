(function(root){
const mc=(prompt,options,feedback)=>({type:'choice',prompt,options,answer:options[0],feedback});
const match=(prompt,pairs,feedback)=>({type:'match',prompt,pairs,answer:pairs.map(p=>p[1]),feedback});
const order=(prompt,blocks,prefix='',feedback='Le verbe conjugué se place à la fin de la subordonnée.')=>({type:'order',prompt,blocks,prefix,answer:blocks,feedback});
const fill=(prompt,parts,choices,answer,feedback)=>({type:'fill',prompt,parts,choices,answer,feedback});
const classify=(prompt,items,categories,answer,feedback,hints=[])=>({type:'classify',prompt,items,categories,answer,feedback,hints});
const wo='Wo? exprime une localisation. Wohin? exprime une destination. Avec une préposition mixte, on utilise ici le datif pour la localisation et l’accusatif pour la destination.';
const dass='Dass introduit ce qu’on pense ou affirme. Dans la subordonnée, le verbe conjugué se place à la fin.';
const weil='Weil introduit une cause. Dans la subordonnée, le verbe conjugué se place à la fin.';
const stages=[{title:'Orientierung in München',subtitle:'Trouver son chemin',icon:'↗',tasks:[
match('Ordne die Wörter zu!',[['geradeaus','tout droit'],['links','à gauche'],['rechts','à droite'],['die Kreuzung','le carrefour']],'Ces mots permettent de comprendre un itinéraire.'),
match('Verbinde die Satzteile!',[['Geh','geradeaus'],['Bieg','links ab'],['Nimm','die erste Straße rechts']],'À l’impératif : Geh geradeaus! Bieg links ab! Nimm die erste Straße rechts!'),
order('Bilde den Satz!',['geradeaus','gehen'],'Du musst','Après musst, l’infinitif gehen se place à la fin.'),
fill('Ergänze die Sätze!',['Geh bis {0} Park!','Geh bis {1} Kreuzung!'],['zum','zur'],['zum','zur'],'Zum = zu dem (der Park). Zur = zu der (die Kreuzung). Zu est suivi du datif.'),
classify('Wo oder wohin? Ordne zu!',['im Englischen Garten','auf dem Marienplatz','an der Eisbachwelle','im Deutschen Museum','in den Englischen Garten','auf den Marienplatz','an die Eisbachwelle','ins Deutsche Museum'],['Wo?','Wohin?'],['Wo?','Wo?','Wo?','Wo?','Wohin?','Wohin?','Wohin?','Wohin?'],wo,[{type:'genders'},{text:'Wo? + datif / Wohin? + accusatif (avec ces prépositions mixtes).'}]),
mc('Du bist schon im Englischen Garten. Wo bist du?',['Im Englischen Garten.','In den Englischen Garten.','Auf den Marienplatz.'],wo),
mc('Du bist noch nicht auf dem Marienplatz. Du möchtest dorthin gehen. Wohin gehst du?',['Auf den Marienplatz.','Auf dem Marienplatz.','Im Englischen Garten.'],wo),
{type:'map',map:8,prompt:'Du startest bei der Bücherei. Der Pfeil zeigt zum Café. Lies die Hinweise. Klicke auf das Gebäude am Ziel!',answer:'museum',feedback:'Tu passes le premier carrefour, tournes à gauche, avances jusqu’au deuxième carrefour puis tournes à droite. Au prochain carrefour, tu arrives au Museum.'},
{...order('Du startest beim Hotel, in Richtung Kirche. Ordne die drei Hinweise zum roten Weg!',['Geh bis zur ersten Kreuzung!','Bieg links ab!','Geh bis zur zweiten Kreuzung!'],'','D’abord le premier carrefour, puis à gauche, puis le deuxième carrefour.'),map:9},
{...fill('Du startest am Bahnhof, in Richtung Museum. Ergänze die Hinweise zum roten Weg!',['Geh {0} bis zur {1}n Kreuzung!','Bieg {2} ab und geh bis zur ersten Kreuzung!','Bieg {3} ab und geh bis zur ersten Kreuzung!'],['geradeaus','links','rechts','erste','zweite'],['geradeaus','zweite','links','rechts'],'Le trajet passe deux carrefours tout droit, tourne à gauche puis à droite. Les virages se lisent selon ton sens de déplacement.'),map:10}
]},
{title:'FKK im Englischen Garten',subtitle:'Comprendre et respecter',icon:'☀',tasks:[
mc('Was bedeutet FKK?',['Freikörperkultur','Freizeitkultur','Freikörperkunst'],'FKK est l’abréviation de Freikörperkultur.'),
match('Ordne die Wörter zu!',[['nackt','nu'],['die Toleranz','la tolérance'],['fotografieren','photographier'],['die jungen Leute','les jeunes']],'Ces mots sont utiles pour comprendre le document étudié en classe.'),
mc('Wo spielt der Text?',['Im Englischen Garten.','An der Eisbachwelle.','Auf dem Marienplatz.'],'Le texte étudié se déroule dans l’Englischer Garten.'),
mc('Was gefällt Diana an FKK?',['Die Toleranz.','Die Fotos der Touristen.','Die neugierigen Blicke.'],'Diana apprécie la tolérance.'),
{...mc('Was stört Diana?',['Wenn Leute Fotos machen oder sie anstarren.','Wenn Leute im Park spazieren gehen.','Wenn Leute im Park Sport machen.'],'Diana est gênée par les photos et les regards insistants.'),hints:[{text:'anstarren : fixer quelqu’un du regard, avec insistance.'}]},
match('Wer sagt was?',[['Diana','Sie mag FKK, aber neugierige Blicke und Fotos stören sie.'],['Christina und Sophia','Sie sprechen darüber, dass FKK bei jungen Leuten weniger verbreitet ist.']],'Diana parle de son expérience ; Christina et Sophia évoquent la jeune génération.'),
mc('Diana möchte nicht fotografiert werden.',['Richtig.','Falsch.'],'Diana ne souhaite pas être photographiée.'),
mc('Christina und Sophia sagen, dass alle jungen Leute FKK ablehnen.',['Falsch.','Richtig.'],'Elles n’affirment pas que tous les jeunes rejettent la FKK.'),
mc('Welche Aussage wird durch den Text gestützt?',['FKK ist bei jungen Leuten weniger verbreitet.','Junge Leute dürfen keine FKK machen.','FKK ist in München verboten.'],'Moins répandu ne veut pas dire interdit, ni rejeté par tout le monde.'),
mc('Welche Zusammenfassung passt am besten?',['Diana findet FKK gut, kritisiert aber neugierige Blicke und Fotos. Christina und Sophia sprechen über die jüngere Generation.','Diana findet FKK unangenehm. Christina und Sophia machen gern FKK.','Diana möchte mehr Fotos von FKK. Christina und Sophia sprechen über Touristen.'],'La bonne synthèse distingue les deux points de vue sans inventer d’informations.')
]},
{title:'Körperbild und These Girls',subtitle:'Un autre regard sur le corps',icon:'✧',tasks:[
mc('Wer hat „These Girls“ gegründet?',['Jana und Teresa.','Diana und Jana.','Christina und Sophia.'],'Jana Maresa Fischer et Teresa Mayer.'),
match('Ordne die Ausdrücke zu!',[['perfekt aussehen','avoir une apparence parfaite'],['sich vergleichen','se comparer'],['natürliche Körper','des corps naturels'],['selbst entscheiden','décider soi-même']],'Ces expressions permettent de parler de l’image corporelle.'),
mc('Was bedeutet „Jeder Körper ist anders“?',['Chaque corps est différent.','Chaque corps doit changer.','Chaque corps doit être parfait.'],'Jeder signifie « chaque » ; anders signifie « différent ».'),
mc('Jana findet, dass alle Frauen perfekt aussehen müssen.',['Falsch.','Richtig.'],'Jana remet en cause l’obligation d’avoir une apparence parfaite.'),
mc('Was ist Janas wichtigste Botschaft?',['Man muss nicht perfekt aussehen.','Man muss sich mit anderen vergleichen.','Man muss perfekte Fotos zeigen.'],'On n’est pas obligé d’avoir une apparence parfaite.'),
mc('Warum können perfekte Bilder auf Instagram problematisch sein?',['Man vergleicht sich vielleicht mit anderen.','Man kann keine Accounts wählen.','Man sieht keine Bilder von Menschen.'],'Les images parfaites peuvent encourager la comparaison.'),
{...mc('Was kann man auf Instagram selbst entscheiden?',['Welchen Accounts man folgt.','Was alle anderen posten.','Was alle anderen denken.'],'On peut choisir les comptes que l’on suit.'),hints:[{text:'einem Account folgen : suivre un compte ; welchen Accounts : à quels comptes.'}]},
mc('Lena fühlt sich schlecht, weil sie sich mit anderen auf Instagram vergleicht. Welcher Rat passt zu Janas Interview?',['Lena kann positive Accounts wählen.','Lena sollte sich noch mehr vergleichen.','Lena muss perfekt aussehen.'],'Choisir des comptes positifs est un conseil cohérent avec le message de Jana.'),
classify('Was denkt Jana? Ordne zu!',['Jeder Körper ist anders.','Man kann positive Accounts wählen.','Alle müssen perfekt aussehen.','Man muss sich mit anderen vergleichen.'],['Jana ist einverstanden','Jana ist nicht einverstanden'],['Jana ist einverstanden','Jana ist einverstanden','Jana ist nicht einverstanden','Jana ist nicht einverstanden'],'Jana valorise la diversité des corps et le choix de comptes positifs.'),
order('Bilde den Satz!',['man','den Körper anderer Menschen','respektiert'],'Beide finden es wichtig, dass','Diana et Jana abordent des sujets différents, mais accordent de l’importance au respect du corps d’autrui.')
]},
{title:'Sprachtraining',subtitle:'Construire des phrases',icon:'Aa',tasks:[
mc('Ich denke, ___ jeder Körper anders ist.',['dass','weil'],dass),
mc('Manche Jugendliche fühlen sich unwohl, ___ sie sich mit anderen vergleichen.',['weil','dass'],weil),
match('Ordne zu!',[['weil','donner une raison'],['dass','introduire ce qu’on pense ou affirme']],'Weil donne une cause ; dass introduit le contenu d’une pensée ou d’une affirmation.'),
order('Bilde den Satz!',['jeder Körper','anders','ist'],'Jana findet, dass',dass),
order('Bilde den Satz!',['sie','Toleranz','wichtig','findet'],'Diana mag FKK, weil',weil),
mc('Welcher Satz ist richtig?',['Ich denke, dass soziale Medien positiv sein können.','Ich denke, dass soziale Medien können positiv sein.'],'Après dass, le modal conjugué können est à la fin, après l’infinitif sein.'),
order('Drücke eine Möglichkeit aus: « On peut choisir des comptes positifs. »',['Man','kann','positive Accounts','wählen'],'','Kann exprime une possibilité. Le modal est en deuxième position, l’infinitif à la fin.'),
order('Gib einen Rat: « On devrait respecter les autres. »',['Man','sollte','andere Menschen','respektieren'],'','Sollte exprime un conseil. L’infinitif se place à la fin.'),
order('Forme den Satz um: Soziale Medien können positiv sein.',['soziale Medien','positiv','sein','können'],'Ich denke, dass','Après dass, können se place à la fin, après sein.'),
mc('Ergänze einen Rat: Ich denke, dass man andere Menschen respektieren ___.',['sollte','kann'],'Sollte exprime un conseil ; kann exprime une possibilité.')
]}];
if(typeof module!=='undefined')module.exports=stages;root.QuizData=stages;
})(typeof window!=='undefined'?window:globalThis);
