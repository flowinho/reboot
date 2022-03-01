---
layout: post
title: "How-To: Code in Jekyll wiederverwenden"
author: Florian Schuttkowski
excerpt: "Programmcode wiederzuverwenden ist nahezu immer eine gute Sache. Die Akronyme DRY, Dont repeat yourself, und WET, Write everything twice, existieren nicht ohne Grund. Doch wie lässt sich Code innerhalb von Jekyll wiederverwenden? Die Lösung verbirgt sich in den Funktionalitäten von Liquid, dem technischen Unterbau von Jekyll."
categories: jekyll
imageURL: https://cloud.fschuttkowski.xyz/s/SXyzQ4nLWAnALwQ/download/sigmund-aI4RJ--Mw4I-unsplash.jpg
---

Programmcode wiederzuverwenden ist nahezu immer eine gute Sache. Die Akronyme DRY, _Dont repeat yourself_, und WET, _Write everything twice_, existieren nicht ohne Grund. Doch wie lässt sich Code innerhalb von Jekyll wiederverwenden? Die Lösung verbirgt sich in den Funktionalitäten von Liquid, dem technischen Unterbau von Jekyll.

Wer sich mit Jekyll beschäftigt, dem ist sehr sicher bereits dem Ordner `_includes` begegnet. Dieser beinhaltet HTML-Snippets, die von Jekyll für die Basis-Struktur der generierten Webseiten benutzt werden. Und eben diese Dateien lassen sich nahezu mühelos dazu verwenden bestimmte Funktionalitäten, die wiederholt zur Anwendung kommen sollen, auf eine wiederverwendbare Art und Weise abzulegen.

Am einfachsten lässt sich diese Funktionalität anhand der Praxisbeispiel *Einbettung von Bildern* und *Einbettung von GISTs* erläutern.

## Einbetten von Bildern in eine beliebige Jekyll-Seite oder einen beliebigen Blogpost

Das Einbetten von Bildern ist eine der gängisten Usecases in einer Website, unabhängig von ihren Inhalten. Die meisten Blogposts beinhalten Bilder. Selbst technische Artikel beinhalten Statistiken oder Screenshots. Es liegt also nahe diesen Anwendungsfall zuerst zu betrachten.

Eine der rudimentärsten Möglichkeiten, Bilder in Webseite einzubinden, ist das HTML-Tag `img`.

```html
<img src="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg">
```

Meistens jedoch reicht dieses Tag alleine einfach nicht aus. Bilder sollen einen eigenen Stil bekommen und am besten mit Untertiteln versehen werden können. Soll das Bild dann auch noch zentriert auf der Website anzeigt werden, und einen Hyperlink beinhalten, erhalten wir recht schnell mehrere HTML-Elemente.

<div align="center">
    <a href="https://audiodump.de">
        <img src="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg" class="fancy-schmancy">
    </a>
    <figcaption>Der beste Podcast von Welt1</figcaption>
</div>

Hier der Code des obigen Podcast-Covers.

```html
<div align="center">
    <a href="https://audiodump.de">
        <img src="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg" class="fancy-schmancy">
    </a>
    <figcaption>Der beste Podcast von Welt1</figcaption>
</div>
```
Eigentlich recht übersichtlich, aber eine Menge Tipp-Arbeit, insbesondere wenn ein Artikel mehrere Bilder beinhaltet. 

Spätestens wenn der:die Autor:in allerdings auf einem Mobilgerät oder einem Tablet arbeitet gilt es jeden unnötigen Text zu vermeiden. Und wenn ich ganz ehrlich bin, auch auf
einem Desktop-Rechner. Entwickler sind faul, und das ist ihre große Stärke. Dieselbe Einbettung eines Bildes auf der gesamten Website zu verwenden bringt auch den zusätzlichen Vorteil, dass die Webseite ihre Inhalte auf eine konsistente Art und Weise darstellt.

Das erklärte Ziel muss also sein, Bilder auf eine konsisene Art und Weise mit möglichst wenig Aufwand einbetten zu können. 

Los gehts.

Als erstes legen wir eine Datei `image.html` im Ordner `_includes` an. Dank Liquid können diese Dateien Parameter beinhalten.

{% raw %}
```liquid
<div align="center">
    <figure>
        // Soll das Bild zu einer Website verlinken?
        {% if include.link %}
            <a href="{{ include.link}}">
        {% endif%}
            // Einbinden des eigentlichen Bildes
            <img src="{{ include.source }}" />
        {% if include.link %}
            </a>
        {% endif%}
        // Anzeige des Bild-Untertitels, falls vorhanden
        {% if include.caption %}
        <figcaption>{{ include.caption }}</figcaption>
        {% endif %}
    </figure>
</div>
```
{% endraw %}

Was genau passiert hier?

1. Im ersten Schritt prüfen wir, ob das einzubettende Bild zu einem Ziel, beispielsweise einer weiteren Website verweisen soll. Dies geschieht über die {%raw%}`{% if include.link %}`{%endraw%}. Falls ja, wird ein entsprechendes Hyperlink-Tag hinzugefügt, dass das Bild klickbar macht.
1. Anschließend wird das einzubettende Bild eingefügt, dessen Quelldatei über {%raw%}`{{ include.source }}`{%endraw%} ausgelesen wird.
1. Nicht immer soll ein Bildbeschreibung hinzugefügt werden. Wird ein entsprechender Text übergeben, soll dieser dargestellt werden. Also prüfen wir analog zum Hyperlink über {%raw%}`{% if include.caption %}`{%endraw%} ob die entsprechenden Daten vorhanden sind, oder nicht.

Diese Vorgehensweise hat den Vorteil dass der Hyperlink-Code sowie der für den Bilduntertitel notwendige Code gar nicht erst erzeugt werden, falls sie nicht genutzt werden. 

Ein Beispiel. 

{% raw %}
```liquid
{% include image.html source="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg" %}
```
{% endraw %}

Dieser Code erzeugt, basierend auf obigem Template, folgende Ausgabe:

```html
<div align="center">
    <figure>
            <img src="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg">     
    </figure>
</div>
```
Das Hyperlink-Element sowie der Bilduntertitel werden gar nicht erst erzeugt, was den Quellcode sauber hält und möglicherweise problematischen Formatierungen vorbeugt.

Übergeben wir die entsprechenden Paramter aber an das Template, wird auch der gewünschte Code erzeugt:

{%raw%}
```liquid
{% include image.html 
    source="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg"
    link="https://audiodump.de"
    caption="Der beste Podcast vong Welt1"
%}
```
{%endraw%}

Und hier das Ergebnis:

```html
<div align="center">
    <figure>
        <a href="https://audiodump.de">
            <img src="https://audiodump.de/wp-content/cache/podlove/e9/1f2ece2a3e5789c63b0bac31c21c13/audiodump_400x.jpg">
        </a>
    <figcaption>Der beste Podcast vong Welt1</figcaption>    
    </figure>
</div>
```

## Einbetten von GISTs in eine beliebige Jekyll-Seite oder einen beliebigen Blogpost

Viele Blogposts von Programmierer:innen nutzen die weit verbreiteten Github-GISTs, um Programmcode, der ohnehin schon auf GitHub liegt, in ihre Blogposts einzubinden. Ein Beispiel für einen meiner Gists:

<script src="https://gist.github.com/flowinho/bfb519f2d888c9289c2a4edc4554f72d.js"></script>

Verwendeter Code: 
```html
<script src="https://gist.github.com/flowinho/bfb519f2d888c9289c2a4edc4554f72d.js"></script>
```

Gists werden über Javascript eingebunden. Nun möchte ich nicht immer den gesamten Code in eine Markdown-File schreiben, sondern einen GIST über seine `ID` referenzieren, die sich folgendermaßen zusammensetzt: `<githubUsername/uniqueID`.

Dazu erstellen wir die Datei `gist.html`im Ordner `_includes` mit folgendem Inhalt:

{%raw%}
```liquid
<script src="https://gist.github.com/{{ include.githubUsername }}/{{ include.uniqueID }}.js"></script>
```
{% endraw%}

Analog zum oben beschriebenen Einbetten von Bilder lässt sich der vorhergehende Gist nun über folgende Syntax wiederverwendbar einbetten:

{%raw%}
```liquid
{% include gist.html
    githubUsername="flowinho"
    uniqueID="bfb519f2d888c9289c2a4edc4554f72d"
%}
````
{%endraw%}

Das obige Snippet erzeugt folgenden HTML-Code:

```html
<script src="https://gist.github.com/flowinho/bfb519f2d888c9289c2a4edc4554f72d.js"></script>
```



## Fazit

Die Verwendung von Liquid-Templates ist eine zugängliche Art und Weise um Quellcode nicht immer und immer wieder schreiben zu müssen. Es ist daher absolut zu empfehlen, diese Herangehensweise auf der eigenen, jekyll-basierten, Website einzubinden.