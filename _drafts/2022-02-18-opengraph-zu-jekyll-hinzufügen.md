---
layout: post
title: "OpenGraph-Tags: Was ist das und wie füge ich es Jekyll hinzu?"
author:
- Florian Schuttkowski
excerpt: "Was Messenger und soziale Netzwerke als Linkvorschau sind die Inhalte der sogenannten OpenGraph-Meta-Tags. Das sind spezielle HTML-Elemente, die der Software mitteilen, was sie dem Endnutzer anzeigen soll. Bei diesem Inhalt muss es nicht zwingend um den tatsächlichen Inhalt der verlinkten Website handeln, sondern der Website-Betreiber bestimmt explizit, was dargestellt werden soll. Und in diesem Artikel möchte ich aufzeigen wie sie einer auf Jekyll basierenden Website, wie dieser hier, hinzugefügt werden können."
imageURL: https://cloud.fschuttkowski.xyz/s/2ZC4abFgzBaNCQP/download/Unbenannt.PNG
---

<div class="floating-image-left" align="center">
<figure>
    <img src="https://cloud.fschuttkowski.xyz/s/2ZC4abFgzBaNCQP/download/Unbenannt.PNG" >
    <figcaption>OpenGraph-Tags unterstützen Messenger und soziale Netzwerke dabei, eine Vorschau des verlinkten Inhaltes zu generieren.</figcaption>
</figure>
</div>

Nahezu alle Nutzer von Smartphones und sozialen Netzwerken kennen die sogenannte "Linkvorschau".

Was nicht so viele wissen: diese Vorschau wird nicht wirklich von der verwendeten Software, dem verwendeten Messenger oder dem gerade geöffnenten sozialen Netzwerk erzeugt.

Es existiert auch kein Äffchen in eurem Smartphone, dass Fotos von der gerade verlinkten Website macht und dieses Foto in Signal einsetzt.

Streng genommen handelt es sich nichtmal um eine echte "Vorschau", denn es wird weder die Website, noch das Website-Bild, noch der erste Teil des verlinkten Inhalts angezeigt.

Was Messenger und soziale Netzwerke stattdessen anzeigen sind die Inhalte der sogenannten "OpenGraph-Meta-Tags". Das sind spezielle HTML-Elemente, die der Software mitteilen, was sie dem Endnutzer anzeigen soll. Bei diesem Inhalt muss es nicht zwingend um den tatsächlichen Inhalt der verlinkten Website handeln, sondern der Website-Betreiber bestimmt explizit, was dargestellt werden soll. 

Und in diesem Artikel möchte ich aufzeigen wie diese OpenGraph-Tags einer auf Jekyll basierenden Website, wie dieser hier, hinzugefügt werden können.

## Wie füge ich OpenGraph meiner Jekyll Website hinzu?


{% raw %}
```html
<meta property="og:locale" content="de_DE" />
<meta property="og:type" content="article" />
<meta name="twitter:creator" content="@flowinho"/>
<link rel="publisher" href="https://derflo.io"/>
<meta name="twitter:site" content="@flowinho"/>
<meta name="twitter:domain" content="Flowinho"/>
<meta property="og:site_name" content="derflo.io" />
<meta property="article:publisher" content="https://derflo.io" />
<meta property="og:image" content="{{ page.imageURL }}"/>
<meta property="og:title" content="{{ page.title }}"/>
<meta property="og:url" content="{{ site.url }}{{ page.url }}"/>
<meta property="og:description" content="{{ page.excerpt }}"/>
<meta name="description" content="{{ page.excerpt }}">
```
{% endraw %}