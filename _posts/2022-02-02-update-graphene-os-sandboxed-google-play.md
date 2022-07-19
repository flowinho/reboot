---
layout: post
title: "Weihnachten im Februar: GrapheneOS Sandboxed Google Services unterstützen Google Location Accuracy API"
tags: grapheneos smartphone android google sandbox
---

Nach meinem Wechsel von Apple iOS zu [GrapheneOS](https://grapheneos.org) blicke ich kaum mehr zu iOS zurück. Heute wurde nun endlich das letzte fehlende Teilstück hinzugefügt, dass es mir erlaubt auch den letzten Anwendungsfall vollständig auf GrapheneOS zu übertragen: die Sandboxed Google Play Services erhielten ein großes Update, dass die Google Location Accuracy API beinhaltet.

Um zu verstehen, warum dieses Update so ein großes Ding ist, braucht es etwas mehr Kontext.

|GrapheneOS|
|:-:|
|GrapheneOS, ehemals bekannt als Android Hardening Project, ist eine Abwandlung des Android Betriebssystems von Google. Es besteht im wesentlichen aus dem Quellcode des Android Open Source Project, aus dem Google auch sein Betriebssystem Android baut. Es zeichnet sich im wesentlichen durch eine massiv erhöhte Sicherheit des Endnutzergeräts aus. Zusätzlich haben die Entwickler alle Google Dienste bis hinunter auf die tiefste Ebene aus dem System entfernt.|

GrapheneOS kapselt alle Services des Betriebssystems in einen abgeschotteten Bereich, eine Sandbox. Dazu muss man wissen, dass die Google Services auf einem herkömmlichen Android-System sehr invasiv in das System verstrickt worden sind. Sie haben weitreichende Privilegien, die der Nutzer auch nicht entfernen kann. Die GrapheneOS-Entwickler sind Gegner solcher "elitären Services" und kapseln die Google Dienste daher rigoros vom System ab. Die Grundidee dahinter ist: auch die Google Services sind eine weitere App, die der Nutzer nutzen kann, oder eben auch nicht. Es darf kein Zwang bestehen, und erst recht keine Abhängigkeit.

Das bedeutet im Umkehrschluss aber ebenfalls, dass das GrapheneOS-Projekt eigene, gehärtete Implementierungen von bestimmten Diensten zur Verfügung stellen muss. Das schafft das Projekt mühelos. Gäbe es also nur das System und seinen Nutzer, wäre die Welt in Ordnung.

Nun gibt es aber auch noch Apps von Drittanbietern. Viele FOSS-Implementierungen wie das exzellente [OSMAnd](https://osmand.net) funktionieren ohne erzwungenen Zugriff auf die Google Dienste. Das liegt daran, dass die Entwickler versuchen ihre Funktionalitäten unabhängig der Verfügbarkeit von Google Diensten zu realisieren. Meistens stecken hinter solchen Bemühungen die Ansprüche einer system-unabhängigen Implementierung, um auch auf Android-Derivaten ohne Google Services (wie etwa bei neueren Huawei-Geräten) alle Funktionalitäten anbieten zu können.

Nicht alle Entwickler können sich diese zusätzlichen Entwicklungsaufwände leisten und / oder sind technisch in der Lage manche Funktionalitäten ohne einen Rückgriff auf Googles APIs zu realisieren. Dafür habe ich vollstes Verständnis.

Leider ist von diesem Umstand auch eines meiner liebsten Hobbies betroffen: das Geocaching. Die offizielle Geocaching-App nutzt Google Maps und die Google Location Accuracy API um sowohl Karten anzuzeigen als auch den Ort des Nutzers zu bestimmen. Der Versuch auf alternative Apps umzusteigen schlug leider fehl, da diese Apps entweder nicht alle von mir gewünschten Funktionalitäten boten, oder ebenfalls die Google APIs nutzten. Ich war also nicht in der Lage auf meinem GrapheneOS-Gerät meinem Hobby nachzugehen.

Bis heute.

Die GrapheneOS-Entwickler haben heute Version SQ1A.220105.002.2022013120 von GrapheneOS veröffentlicht, die neben einer neuen Möglichkeit die Privilegien der Google Services feingranuliert einzustellen nun eben auch endlich die Google Location Accuracy API beinhaltet. Diese lässt sich, wie zu erwarten war, sogar bequem per Schalter ein- und abschalten.

Damit wurde GrapheneOS einer der letzten fehlenden Bausteine hinzugefügt, die das Betriebssystem zu einer vollwertigen Alternative zu Google Android machen.

Großes Dankeschön an die Entwickler 🍻
