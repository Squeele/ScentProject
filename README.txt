Ajouter un �l�ment:
Pour cr�er un nouvel �l�ment, il suffit d'en rajouter un � la fin de la zone d'�dition dans la liste d'�l�ments.
Un �l�ment prend cette forme:


=== Element 1 ===
<center>
{{MapElement
| map = dubouchet
| subtype = cigarette
| type = chemical
| id = 1
| place = Tr�filerie, 42100 Saint-Etienne, France
| date = 2018-04-23
| hour = 11:00
| orientation = 45
| weight = 2
| links = 2
| custom = 3 6 9
}}

</center>

A partir de l�, vous pouvez facilement modifier les attributs de l'�l�ment: l'adresse, le poids, l'heure, le type... et le copier dans la zone d'�dition.
Le type est un des mots suivants : "floral fruity vegetable earthy offensive fishy chemical medicinal cooking".
Le subtype est le sous-type et est totalement libre.
Les valeurs "customs" correspondent � la valence (dans ce cas 3), l'intensit� (dans ce cas, 6) et la familiarit� (ici 9).


/!\ Attention � l'attribut "links".
Si l'�l�ment ne correspond pas � la fin d'un trajet, il faut faire gaffe de bien indiquer l'�l�ment suivant: L'exemple repr�sente l'�l�ment 1, il n'est pas � la fin du chemin,
son "link" est donc l'�l�ment 2. Si l'�l�ment est � la fin d'un trajet, alors vous pouvez mettre "links = 0" ou "links =".

Le num�ro de l'�l�ment (son "id") est global et ne correspond pas � un seul chemin. Par exemple, dans les �l�ments que j'ai rentr�, un premier chemin correspond aux �l�ments 1 � 23, un deuxi�me chemin les �l�ments 24 � 38, etc....