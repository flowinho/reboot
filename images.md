---
layout: images
title: Fotos
permalink: /fotos/
---

Alle Bildrechte vorbehalten. Die auf den Portraits dargestellten Personen haben ihre Einverständnis zur Veröffentlichung ihrer Fotos erteilt.

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