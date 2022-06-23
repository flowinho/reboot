---
title: "Bilder in einem Markdown-basierten Blog clickbar machen, ohne spezielle Syntax"
layout: post
tags: javascript jekyll markdown 
---

Blogposts beziehungsweise Dokumente in Markdown schreiben zu können, ist eine feine Sache. Ich habe es unter anderem wegen Markdown in all den Jahren nie wirklich von Static Site Generators weggeschaft.

Allerdings bildet Markdown nicht jeden Usecase ab. Das muss es auch nicht. Es ist und bleibt eine Markup-Language, die dem einfachen Schreiben von Text gewidment ist. Und das ist auch gut so. Seit längerer Zeit bin ich auf der Suche bestimmte Anwendungsfälle für meinen Blog umzusetzen, um beispielsweise auf Bilder mit Untertiteln nicht verzichten zu müssen - da Markdown diese Funktionalität schlicht nicht vorsieht. Berechtigterweise.

Nun ist es aber so, dass der Anwendungsfall "Bilder sollten klickbar sein" wirklich von fundamentaler Bedeutung ist, da insbesondere Besucher der Website die diese mit einem Smartphone ansurfen, sich Screenshots oder Bilder gerne mal größer anschauen. Ich möchte die Besucher dazu „enablen“.

Markdown sieht für diesen Fall sogar eine Syntax vor!

```markdown
[![alt-text](/link/zum/bild)/link/zum/bild]
```

Mir gefällt die redundante Angabe des Links überhaupt nicht, ebenfalls habe ich aus Objective-C Zeiten die schlimme Erfahrung mitgenommen, wie leicht man eine Trailing-Bracket vergessen kann. Und das würde die gesamte Funktionalität brechen.

Außerdem bin ich, wie alle Entwickler, faul[^1]. Und Faulheit erzeugt bekanntlich Fortschritt. Ich möchte mich nicht von der herkömmlichen Markdown-Syntax für Bilder verabschieden. Daher habe ich ein klein wenig JavaScript eingeführt, welches Bilder automatisch in Links „wrapped“ um diese klickbar zu machen.
Da es sich um keine stark optische oder den Inhalt beeinflussende Maßnahme handelt, nehme ich JavaScript in Kauf, da Besucher mit deaktiviertem JavaScript die Seite nach wie vor betrachten können, sie können nur die Bilder nicht mehr klicken. Und ich gehe einfach davon aus, dass Menschen die JavaScript in ihrem Browser deaktiviert haben, wissen was sie tun, und wie sie ein Bild angezeigt bekommen 👨🏻‍💻.

```js
var i, images = document.getElementsByTagName("img");

for(i = 0; i < images.length; i++) {
    var parentElement = images[i].parentElement;
    var innerHTML = parentElement.innerHTML;
    var imageSource = images[i].src
    parentElement.innerHTML = '<a href="' + imageSource + '">' + innerHTML + '</a>';
}
```

Et voilà, Ziel erreicht.

[^1]: Natürlich außer wenn es um meine Arbeit geht. 😇