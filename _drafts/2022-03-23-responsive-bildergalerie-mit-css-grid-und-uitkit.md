---
layout: post
title: "How-To: Eine responsive Bildergalerie mit CSS-Grid und UIKit erstellen"
category: jekyll
author: Florian Schuttkowski
excerpt: "CSS-Grid erlaubt es uns ein rasterbasiertes Layout in Browsern abzubilden, dessen Spalten und Zeilen sich entlang Fenstergröße verschieben können. Eine funktionierendes Beispiel dafür ist meine Fotos-Seite auf diesem Blog. In diesem How-To möchte ich erläutern wie eben diese Fotos-Seite realisiert ist. Für die Umsetzung muss UIKit in die Webseite eingebunden werden."
imageURL: https://cloud.fschuttkowski.xyz/s/WwrPSiEbGz8xP6N/download/Screenshot%202022-03-23%20at%2008.27.01.png
---

CSS-Grid ist eine relative Neuerung in der Browser-Welt. Obwohl es bereits 2011 von Microsoft im Internet Explorer veröffentlicht wurde, dauerte es noch bis [2017](https://en.wikipedia.org/wiki/CSS_grid_layout#History) bis die meisten Browser es integriert hatten. Durch die Entwicklung und Einführung von Flex-Box würde CSS-Grid zusätzlich etwas in den Hintergrund gedrängt.

Allerdings erlaubt CSS-Grid uns ein rasterbasiertes Layout in Browsern abzubilden, dessen Spalten und Zeilen sich entlang Fenstergröße verschieben können. Eine funktionierendes Beispiel dafür ist meine [Fotos-Seite auf diesem Blog](/fotos/).
 
In diesem How-To möchte ich erläutern wie eben diese Fotos-Seite realisiert ist. Für die Umsetzung muss [UIKit](https://getuikit.com) in die Webseite eingebunden werden, damit das HTML-Element `uk-lightbox` zur Verfügung steht.

Starten wir mit der Seite `images.html`.

{% raw %}
```html
<div uk-lightbox>
    <div class="gallery-grid">
    {% for image in site.data.images %}
        <figure class="gallery-frame">
            <a href="{{image.url}}" target="_blank" data-caption="{{ image.title }}">
                <img class="gallery-img" src="{{image.url}}">
            </a>
        <figcaption>{{ image.title }}</figcaption>
        </figure>
    {% endfor %}
    </div>
</div>
```
{% endraw %}

Die für dieses How-To relevanten Elemente sind:
- `<div class="gallery-grid">`    
    Die Klasse die das Grid definiert.
- `<img class="gallery-img" src="">`   
    Die Klasse des Bildes an sich. Die Größenspezifikationen innerhalb dieser Klasse wirken sich auf das Verhalten des Grids aus.

## Die Gallery-Grid-Klasse

```css
.gallery-grid {
    grid-template-columns:  repeat(auto-fit, minmax(260px, 1fr));
    justify-items:          center;
    display:                grid;

    margin: 0;
    padding: 0;
}
```
