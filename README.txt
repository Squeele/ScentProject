Ajouter un élément:
Pour créer un nouvel élément, il suffit d'en rajouter un à la fin de la zone d'édition dans la liste d'éléments.
Un élément prend cette forme:


=== Element 1 ===
<center>
{{MapElement
| map = dubouchet
| subtype = cigarette
| type = chemical
| id = 1
| place = Tréfilerie, 42100 Saint-Etienne, France
| date = 2018-04-23
| hour = 11:00
| orientation = 45
| weight = 2
| links = 2
| custom = 3 6 9
}}

</center>

A partir de là, vous pouvez facilement modifier les attributs de l'élément: l'adresse, le poids, l'heure, le type... et le copier dans la zone d'édition.
Le type est un des mots suivants : "floral fruity vegetable earthy offensive fishy chemical medicinal cooking".
Le subtype est le sous-type et est totalement libre.
Les valeurs "customs" correspondent à la valence (dans ce cas 3), l'intensité (dans ce cas, 6) et la familiarité (ici 9).


/!\ Attention à l'attribut "links".
Si l'élément ne correspond pas à la fin d'un trajet, il faut faire gaffe de bien indiquer l'élément suivant: L'exemple représente l'élément 1, il n'est pas à la fin du chemin,
son "link" est donc l'élément 2. Si l'élément est à la fin d'un trajet, alors vous pouvez mettre "links = 0" ou "links =".

Le numéro de l'élément (son "id") est global et ne correspond pas à un seul chemin. Par exemple, dans les éléments que j'ai rentré, un premier chemin correspond aux éléments 1 à 23, un deuxième chemin les éléments 24 à 38, etc....