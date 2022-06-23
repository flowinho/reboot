---
layout: page
title: "Jekyll Posts richtig untereinander verlinken"
tags: jekyll markdown url link hyperref
---

Manchmal ist es für den Leser hilfreich weiterführende Texte in Form von Blogposts zu veröffentlichen, die ich bereits früher einmal veröffentlicht habe, wie beispielsweise {% post_url 2022-06-20-jekyll-beschleunigen %}.

Da es mir sehr viel Spaß macht an diesem Jekyll Blog herumzubasteln, ist es gut möglich dass ich das Format der Permalinks nochmal anpassen werden. Aber was passiert mit bereits verlinkten Posts? Nutze ich die absolute URL in Form von beispielsweise `https://derflo.io/2022/jekyll-images-klickbar-machen/` ist das eher kontraproduktiv, denn sobald sich das Permalink-Schema in Jekylls `_config.yml` ändert, zerbrechen diese Links.

Jekyll hilft gütigerweise weiter, und stellt die Property `post_url` zur Verfügung.

```liquid
{% raw %}
{% post_url 2022-06-22-git-push-haengt-endlich-geloest %}
{% endraw %}
```

Mit ihr lassen sich Posts unabhängig des Permalink-Schemas verlinken, da Jekyll die verlinkten Elemente automatisch anpasst.
