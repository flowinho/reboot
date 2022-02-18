---
layout: post
title: "GrapheneOS Update: System assistiert bei Problemen mit Sandboxed Google Play"
author:
- Florian Schuttkowski
excerpt: "Mit dem neuesten Update rüsten die Entwickler von GrapheneOS nun eine Funktion nach, die sich Potential issues nennt und in den Android Systemeinstellungen für Sandboxed Google Play zu finden ist. Das System assistiert dem Nutzer durch Aufzeigen von möglichen Problemen die auftreten können, falls Berechtigungen fehlen oder falsch konfiguriert sind."
imageURL: https://cloud.fschuttkowski.xyz/s/q83JeonpFbHw6Yt/download/Imagepipe_2.jpg
---

<div class="floating-image-left" align="center">
<figure>
    <img src="https://cloud.fschuttkowski.xyz/s/kJYoTQYGBHTbR4F/download/Imagepipe_1.jpg" >
    <figcaption>Das neue Update fügt den Bereich "Potential issues" hinzu.</figcaption>
</figure>
</div>

GrapheneOS ist eine CustomROM für Google Pixel Geräte. Für die allermeisten Nutzer sind CustomROMs nicht zu empfehlen, da ihre Nutzung meistens zusätzliche Kenntnisse über das System und / oder das Handy selbst erfordert.

Auch ich hatte schon das eine oder andere Probleme mit GrapheneOS, da mir schlicht die allgemeinen Kenntnisse über das Android-System fehlten. Als jemand der erst kürzlich von iOS zu GrapheneOS gewechselt ist, tat ich mir besonders schwer das Berechtigungssystem unter Android zu verstehen. Insbesondere in GrapheneOS ist dieses besonders wichtig, da aus sicherheitstechnischen Gründen diese Berechtigungen wesentlich tiefer greifen als auf herkömmlichen Android-Installationen üblich.

Die Entwickler von GrapheneOS stellen eine Variante der Google Services zur Verfügung die über sehr eingeschränkte Berechtigungen verfügt und die Google Services weitestgehend vom eigentlichen Betriebssystem isoliert.

Die Nutzung dieser Services gestaltete sich anfangs recht schwierig. Obgleich die Implementierung, insbesondere das Hinzufügen der [Google Location Services](https://derflo.io/blog/2022/update-graphene-os-sandboxed-googleplay-services/) sehr von der Community begrüßt wurde, war nicht jeder Nutzer in der Lage die implementieren Services optimal zu nutzen. 

Mit dem neuesten Update rüsten die Entwickler von GrapheneOS nun eine Funktion nach, die sich "Potential issues" nennt und in den Android Systemeinstellungen für Sandboxed Google Play zu finden ist. Das System assistiert dem Nutzer durch Aufzeigen von möglichen Problemen die auftreten können, falls Berechtigungen fehlen oder falsch konfiguriert sind.

Mögliche Fehlkonfigurationen beinhalten beispielsweise:

- Geolocation: Fehlende Berechtigung "Geräte in der Nähe" für Google Play Services.
- Push Notifications: Batterieoptimierung steht auf "Nicht optimiert".
- Play Store: Fehlende Berechtigungen "Medien und Dateien".

Weitere Fehlkonfigurationen gibt das System nun aus, um eine optimale Nutzung der Sandboxed Google Play Services zu ermöglichen.

Eine sehr willkommenes neues Feature, da es die Nutzbarkeit von GrapheneOS stark verbessert.

Ich freue mich auf kommende Updates, die unter anderem, wie sich aus dem Matrix-Channel herauslesen lässt, einige kleine optische Erneuerung der Benutzeroberfläche von GrapheneOS beinhalten werden.