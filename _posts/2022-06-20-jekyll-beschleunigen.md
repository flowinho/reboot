---
layout: post
title: "Ladezeiten des Jekyll-Standard-Themes verkürzen"
tags: jekyll css javascript fonts
---

Ich bin ein großer Fan von Jekyll. Es ist ein sehr leichtgewichtiges CMS, das auf Basis von Markdown-Files Blogposts und Seiten generieren kann. Durch die nicht benötigten Datenbanken kann ich auf einfachste Weise ein Backup einer Website machen beziehungsweise nicht nur den technischen Inhalt, sondern auch den Inhalt mit GIT-Versionieren.

Eine Jekyll-Seite kommt anfänglich mit recht viel Balast. Ich möchte in diesem Blogpost ein paar mögliche Schritt erläutern, die zur Beschleunigung von Seiten-Ladezeiten führen sollen.

Eine Tabelle mit den Endergebnissen findet sich weiter unten.

Als Benchmark soll mir [dieser Blogpost dienen](https://derflo.io/2022/meetings-swift-jekyll/). Er enthält sowohl Text, für den Custom-Fonts geladen, als auch Programmcode, für dessen Darstellung und Highlighting Javascript und eine weitere Schriftart benötigt werden. Die Ladezeit vor Optimierung der Website beträgt bei einer Dateigröße von `371ms`.

|Zustand|Dateigröße|Ladezeit DOM|Ladezeit insgesamt|
|:--|:-:|:-:|:-:|
|Ursprünglich|652.86 kB|962 ms|1.100 ms|

**Entfernen der Minima Social Icons**

Das aktuelle Standard-Theme „Minima“ kommt mit allerlei Icons für soziale Netzwerke daher. Diese befinden sich zwar im SVG-Format, allerdings nutze ich diese Icons nicht. Würde ich Social Media Icons brauchen, würde ich vermutlich die Implementierung eines [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts) bevorzugen.

Die Referenz auf die Social Media Icons muss zusätzlich zum Löschen der Datei `minimal-social-icons.svg` in folgenden Dateien entfernt werden:

- `footer.html`
- `social.html`

Nach Entfernung der enstprechenden Assets ergaben sich folgende Messwerte:

|Zustand|Dateigröße|Ladezeit DOM|Ladezeit insgesamt|
|:--|:-:|:-:|:-:|
|Ursprünglich|652.86 kB|962 ms|1.100 ms|
|Social Media Icons entfernt|637.23 kB|301 ms|770 ms|

Eine Reduktion der Ladezeit um ~42%.

**Entfernen von unnötigen Funktionalitäten**

Da Minima eine One-Size-Fits-All-Theme ist, beinhaltet sie viele Funktionalitäten, die ich nicht benötige. Ich entferne also:

- `_includes/disquis_comments.html`
- `_includes/google_analytics.html`

|Zustand|Dateigröße|Ladezeit DOM|Ladezeit insgesamt|
|:--|:-:|:-:|:-:|
|Ursprünglich|652.86 kB|962 ms|1.100 ms|
|Social Media Icons entfernt|637.23 kB|301 ms|770 ms|
|Löschen von Disqus und Google Analytics|635.67 kB|304 ms|768 ms|

Es gab also keine große Verbesserung. Dieses Ergebnis war zu erwarten, da die entsprechenden `_includes` ohnehin nicht verwendert wurden.

Leider lässt sich kaum mehr optimieren. Es gibt noch allgemeine Tipps, wie das komprimieren von Bildern in Base64-Strings, aber an der Minima-Theme selbst lässt sich kaum noch herumschrauben.
