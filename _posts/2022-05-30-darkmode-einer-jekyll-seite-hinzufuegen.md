---
title: "Für Nachteulen: Darkmode einer Jekyll-Website hinzufügen"
layout: post
author: Florian Schuttkowski
excerpt: "Darkmode für eine Website? Klar, mit einer Drittanbieter-Bibliothek. Eins-Zwei-Darkmode! Aber: Ich wollte mich nicht mit der faulen Methode zufriedengeben. Ja, es gibt Javascript-Implementierungen, die durch das Hinzufügen von einigen wenigen Zeilen innerhalb der Website eine automatisierte Darkmode-Implementierung hinzufügen. Allerdings bringt dies einige Nachteile."
categories: jekyll
imageURL: https://github.com/flowinho/reboot/blob/main/assets/images/darkmode-sample.png?raw=true
---

Darkmode für eine Website? Klar, mit einer Drittanbieter-Bibliothek. Eins-Zwei-Darkmode!

Aber: Ich wollte mich nicht mit der faulen Methode zufriedengeben. Ja, es gibt Javascript-Implementierungen, die durch das Hinzufügen von einigen wenigen Zeilen innerhalb der Website eine automatisierte Darkmode-Implementierung hinzufügen. Allerdings bringt dies mehrere Nachteile:

- Die Abhängigkeit von einer Drittanbieter-Implementierung.
- Die Javascript-Bibliotheken werden oft von Servern Dritter (CDN) geladen. Es besteht kein Grund, eine Abhängigkeit an Server Dritter einzubauen, wenn der Aufwand für eine eigene Implementierung gering ist. Zusätzlich zur verlängerter Ladezeit der eigenen Website wird die IP-Adresse der Besucher an dieses CDN weitergegeben, was ebenfalls unnötig ist.
- Bugs in der Drittanbieter-Implementierung lassen sich schwerer beheben, da der Code unbekannt ist.
- Es gibt keine Möglichkeit zu lernen, wie ein Darkmode einer Website hinzugefügt wird.

Folglich habe ich mich für eine manuelle Implementierung entschieden, die ich hier für mich selbst und die Nachwelt dokumentieren möchte.

|![](/assets/images/darkmode-sample.png)|
|:-:|
|Ein Blogpost dieser Website, jeweils in Darkmode und Lightmode. _Screenshot_|

Um einen Darkmode implementieren zu können, muss man vorab verstehen, wie Browser diese Funktionalität überhaupt umsetzen. In modernen Browsern gibt es die Eigenschaft `prefers-color-scheme`. Diese Eigenschaft kann wahlweise über JavaScript oder CSS abgerufen werden und spiegelt die Präferenzen bezüglich Light- und Darkmode der Webseite-BesucherInnen wider. Meistens sind diese Präferenzen abhängig von der Einstellung des Betriebssystems, etwa wenn auf einem iPhone der Darkmode aktiviert ist. Um einen Darkmode zu ermöglichen, ist diese Eigenschaft also ein zentraler Ansatzpunkt.

Stellt sich noch die Frage, ob JavaScript zum Einsatz kommen **muss**, denn eigentlich sollten Webseiten so wenig Javascript wie nur möglich beinhalten. Tendenziell wäre es möglich, einen Darkmode rein über CSS zu implementieren. Allerdings entsteht dadurch ein Problem: Verwenden BesucherInnen ihr Smartphone im Darkmode, möchten aber den Inhalt des Posts im Lightmode lesen, ist dies nun nicht mehr möglich. 

Ich halte nichts davon, NutzerInnen zu bevormunden. Daher halte ich folgendes Vorgehen für sinnvoll:

|![](/assets/images/darkmode-flowchart.jpeg)|
|:-:|
|Schematischer Applauf, _draw.io_|


Die Zustände, die umzusetzen sind, wäre also: 

1. Beim Öffnen der Seite erkennen, welche Farbeinstellungen der Nutzer bevorzugt.
2. Wird ein bevorzugter Darkmode erkannt, soll diese Darstellungsoption aktiviert werden.
3. Ist es nicht möglich, die Präferenzen auszulesen, wird kein Darkmode aktiviert.
4. BesucherInnen sollen die Möglichkeit erhalten, manuell umschalten zu können.

## Bevorzugte Farbeinstellungen des Nutzers erkennen

Um die Browser-Eigenschaft `prefers-color-scheme` auszulesen, gibt es zwei Möglichkeiten: CSS und Javascript.

Javascript

```js
if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	// Darkmode wird bevorzugt
}
```

CSS

```css
@media (prefers-color-scheme: dark) {
	// Darkmode wird bevorzugt
}
```

Die CSS-Variante bietet ausreichend Möglichkeiten, einen Darkmode für eine Website umzusetzen. Allerdings will ich den NutzerInnen ermöglichen, die bevorzugte Darstellungsweise selbst zu wählen. Da nur mit HTML und CSS keine Interaktion möglich ist, ist für das Umschalten der Darstellungsoptionen JavaScript erforderlich. Wenn JavaScript jedoch ohnehin erforderlich ist, ist es ratsam nicht zwei Technologien zu mischen, sondern konsistent innerhalb von JavaScript zu bleiben. Ich entscheide mich daher für meine persönliche Website dafür, das Erkennen der bevorzugten Farbeinstellungen über JavaScript abzubilden. 

Um die obige JavaScript-Funktionalität unmittelbar nach Laden der Website ausführen zu können, bedienen wir uns der `onLoad`-Funktionalität, indem wir sie unserem `<body>`-Tag hinzufügen.

```html
<html>
	<body onload="handleDarkmode()">
	</body>
</html>
```

```js
function handleDarkmode(){
	if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		// Darkmode wird bevorzugt und nach Seitenaufruf erkannt
	}
}
```

An welcher Stelle eurer Webseite dieser Javascript-Code hinzugefügt werden sollte, hängt von der jeweiligen Struktur eurer Website ab. 

## Darkmode aktivieren, falls BesucherInnen diesen bevorzugen

Um einen Darkmode aktivieren zu können, muss dieser natürlich zunächst vorhanden sein. Diese Anleitung geht davon aus, dass die Implementierung eines Lightmode nicht notwendig ist, und dass eine CSS-Klasse `dark-mode` vorhanden ist, die in etwa so aussehen könnte:

```css
.dark-mode {
	background-color: #1d1d1d;
	color: white;
}
```

Diese Klasse werden wir auf das `<body>` Element der Website anwenden.

```js
function handleDarkmode(){
	var element = document.body;
	if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		element.classList.toggle("dark-mode");
	}
}
```

Was geschieht hier?

- `var element = document.body` greift auf das HTML-Element `<body>` zu.
- Falls erkannt wird, dass ein Darkmode bevorzugt wird, wird der CSS-Klassenliste des `<body>`-Element die CSS-Klasse `.dark-mode`, die die Farbgebung des Darkmode definiert, hinzugefügt.

Sobald die Seite nun vollständig geladen hat, wird das Skript ausgeführt und der CSS-Stil des Darkmode hinzugefügt. Die Nutzung des Events `onload` bringt allerdings einen Nachteil: Der dort verbundene JavaScript-Code wird erst gestartet, wenn die Website vollständig geladen hat. Das führt unter anderem dazu, dass bei Seiten mit vielen Assets, insbesondere Bildern, der Darkmode erst nach dem Laden aller verlinkten Bilder angewandt wird.

## Manuelles Umschalten ermöglichen

Um manuelles Umschalten zu ermöglichen, kopieren wir einen Teil der Funktionalität in eine separate Funktion, die bei Interaktion mit den Schaltflächen aufgerufen wird.

```js
function toggleDarkMode(){
	var element = document.body;
	element.classList.toggle("dark-mode");
}
```

Diese Funktion wird mit einem beliebigen dafür vorgesehenen Element verknüpft und eine Interaktion mit diesem Element schaltet zwischen Darkmode und Lightmode um.