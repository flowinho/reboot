---
layout: images
title: Fotos
permalink: /fotos/
---

<div class="gallery-grid">

{% for image in site.data.images %}
    <figure class="gallery-frame">
    <a href="{{image.url}}" target="_blank">
        <img class="gallery-img" src="{{image.url}}">
    </a>
    <figcaption>{{ image.title }}</figcaption>
    </figure>
{% endfor %}

</div>