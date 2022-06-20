---
layout: post
title: "Allen Instanzen eines HTML-Elements eine CSS-Klasse hinzufügen "
tags: javascript web lazy
---

In manchen Fällen kann es *leider* notwendig werden, nachträglich im Browser des Users bestimmten Elementen CSS-Klassen hinzuzufügen. In meinem Fall wollte ich erreichen, dass sämtliche auf dieser Webseite angezeigten Bilder mittels Lazy-Loading gelassen werden.

Allerdings sollte dieses Vorgehen nicht standardmäßig angewandt werden, sondern nur im absoluten Ausnahmefall. Es ist zu berücksichtigen was passieren könnte, wenn der Nutzer Javascript deaktiviert hat.

Evaluierung: Was bedeutet es, alle Bilder einer Website mittels Lazy Loading zu laden?

|Vorteile|Nachteile|
|:--|:--|
|Die textuellen Inhalte der Website laden schneller.|Bei deaktiviertem Javascript kann keine LazyLoading stattfinden.|
||Der Bereich in dem Bilder erscheinen werden, wird angezeigt aber noch nicht ausgefüllt. Dies kann zu verwirrenden Layouts führen.|

Hier am Beispiel aller Bilder einer Website:

```js
var i, images = document.getElementsByTagName("img");

for(i = 0; i < images.length; i++) {
    images[i].className += " lazyload";
}
```

Um andere HTML-Elemente mit anderen CSS-Klassen zu verstehen, muss lediglich `getElementsByTagName` entsprechend angepasst werden.