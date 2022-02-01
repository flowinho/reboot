---
layout: post
title: "Software Engineering: Wenn unterschiedliche Sichtweisen zu irrationalen Problemen führen"
author:
- Florian Schuttkowski
excerpt: "Egal in welche Bereiche des Lebens man blickt, seien es Beziehungen zu anderen Menschen, die Politik oder soziale Aktivtitäten, der Ratschlag “gute Kommunikation ist das Wichtigste” scheint universell zu gelten. Aber insbesondere in der Arbeitswelt können fehlende Kommunikation oder entstehende Missverständnisse sehr schnell zu weitreichenden Problemen, und damit Kosten, führen."
---

Egal in welche Bereiche des Lebens man blickt, seien es Beziehungen zu anderen Menschen, die Politik oder soziale Aktivtitäten, der Ratschlag "gute Kommunikation ist das Wichtigste" scheint universell zu gelten. Aber insbesondere in der Arbeitswelt können fehlende Kommunikation und dadurch entstandene Missverständnisse sehr schnell zu weitreichenden Problemen, und damit Kosten, führen.

<div class="grid500">
    <div align="center">
        <figure>
            <img src="/assets/gifs/detective.gif">
            <figcaption>Quelle: Nickelodean / GIPHY</figcaption>
        </figure>
    </div>
    <div class="col">
        <p>
        Während einem privaten Treffen kam neulich folgendes Thema auf:</p>
        <p>
    <em>Kannst du mir helfen? In meinem Team stimmt was nicht. Du kennst dich doch mit iOS aus. Irgendwie kommen unsere iOS-Entwickler nicht mit dem Einbinden einer Bibliothek voran. Eigentlich ist das doch Tagesgeschäft, richtig? </em>
        </p>
        <p>
        <em>
        Hättest du Zeit dir den Quellcode vielleicht mal anzuschauen? Es haben schon einige Kollegen drübergeschaut, aber irgendwie kommen wir nicht weiter, und wir haben das Problem schon seit Wochen!</em>
        </p>
        <p>Als guter Freund und insbesondere als neugieriger Entwickler lehnt man eine solche Frage nicht ab. Was wohl schiefging?</p>
    </div>
</div>

Die Problemstellung:

> Ein Team aus C++-Entwicklern entwickelt eine Komponente, die gleichermaßen in eine Android-App, wie in eine iOS-App eingebunden werden soll. Das iOS-Team schafft es aber nicht die Bibliothek, die das C++-Team zur Verfügung stellt, in ihre Software zu integrieren, während es das Android-Team problemlos hinbekommt.

Nachdem ein kurzer Block auf den Code - wie erwartet - leider keine direkte Schlussfolgerung zulies, bat ich um ein Treffen mit den iOS-Kollegen. Ein gemeinsamer Chatroom wurde eingerichtet, und wir begannen uns zu unterhalten, jeder basierend auf seinem Kenntnissstand der Problematik. 

Mein Blickwinkel war in diesem Fall: Sie schaffen es nicht, eine Bibliothek einzubinden. Aber wie genau ist das Problem gestrikt? Um was für eine Art App handelt es sich? Also erstmal Rahmenbedingungen checken.

iOS11, CocoaPods, hmmm das klingt irgendwie nicht so zeitgemäß. Aber gut, jedes Projekt ist eben so, wie es historisch gewachsen ist. Einen Hinweis auf das unter den Usern zu 98% verbreitete iOS14 oder höher umzusteigen konnte ich mir dennoch nicht verkneifen. Es macht 2022 einfach keinen Sinn mehr, iOS11 zu unterstützen. [^1]

<div class="grid500">
<div>
<p>Nach einigem Hin und Her stellte sich heraus: das Team hatte bereits eine funktionierende Lösung gefunden, basierend auf dem klassischen Objective-C / Objective-C++ Headerfiles.</p>
<p>Einen Hinweis darauf, dass das Team ein Xcode-Project mit CMake exportiert hatte, <em>ignorierte ich allerdings erst einmal.</em> Ein folgenschwerer Fehler, der mir allerdings in diesem Moment nicht bewusst war. Denn wieso sollte diese Thematik auch mit dem eigentlichen Problem zu tun haben?</p>
<p>Ich hatte keinen größeren Einblick in die Projektstruktur und die Code-Hierarchie und wollte mich weiter darauf fokussieren das Problem zu lösen das mir genannt wurde: </p>
<p><strong>Das Einbinden einer C++-Bibliothek in ein bestehendes iOS-Projekt.</strong></p>
<p>Ich nahm also an, dass die Signing Probleme aufgrund eines fehlerhaft konfigurierten Xcode-Projects oder einer fehlenden BundleID auftraten. Unabhängig davon war ich ja allerdings nicht hier, um Code Signing Issues zu beheben, sondern dem Team bei der Integration ihrer Bibliothek beiseite zu stehen.</p>
<p><em>Bleib beim Thema, Flo.</em></p>
</div>
<div align="center">
<figure>
<img src="https://cloud.fschuttkowski.xyz/s/LE3GfpHsnrYnCi8/download/MicrosoftTeams-image.jpg">
<figcaption>Eine der Entwickler sandte mir einen Screenshot der Code Signing Probleme zeigt.</figcaption>
</figure>
</div>
</div>

Ich stützte mich also weiter auf die Problemstellung, die mir genannt worden war. Nach einiger Zeit kam es zu einem Telefonat mit den Kollegen aus dem iOS-Team, die mir die Problematik etwas besser erläuterten und mir mittels der "Bildschirm teilen"- Funktion Einblicke in ihren bestehenden Workflow und die aktuelle Problematik gaben.

Auch meine Kollegen stellten sich weiterhin die Frage: Wie können wir die Bibliothek in unser Projekt einbinden?

Um die Rahmenbedingungen besser verstehen zu können lag die Frage nahe wie das Projekt denn genau strukturell aufgebaut ist, und wie die Herangehensweise an die Deliverables[^2] der einzelnen Teams bisher stattgefunden hatte.

Das Einbinden der Bibliothek schien ein Fass ohne Boden zu sein. Eventuell lag ja ein strukturelles Problem vor?

## Die Struktur des Projekts

|Team Core|Team iOS|Team Android|
|:--|:--|:--|
|Entwickelt Kernfunktionalität.|Entwickelt iOS-App.|Entwickelt Android-App.|
|Sprache: C++|Sprache: Swift, Objective-Cpp|Sprache: Kotlin/Java|
|Deliverable: **Library**|Deliverable: **iOS-App**|Deliverable: **Android-App**|

Soweit so gut. Diese Art der Aufteilung in Component Teams ist nicht unüblich. Nach Nachfrage wurde mir mitgeteilt dass diese Aufteilung explizit vom Team so gewünscht waren, die Kollegen wollten nicht in Feature-Teams arbeiten. Unabhängig meiner Zuneigung zu Feature-Teams gilt ganz klar: Es funktioniert die Team-Struktur am Besten, in der sich alle wohl fühlen und arbeiten können.

<div class="side-note">
Hier sei vorab eingeworfen: Es stellt überhaupt kein Problem dar, wenn man als Entwickler etwas nicht kann. Im Gegenteil, es gehört zur täglichen Arbeit dazu, zugeben zu können, dass man eine Aufgabe nicht lösen kann. Es ist unprofessionell und geschäftsschädigend eine Problematik aus der Angst heraus sein Gesicht zu verlieren nicht anzusprechen.
</div>

Ich befand mich also immer noch im Microsoft Teams Call, und begann die Struktur des Projekts und seiner Software-Komponenten vor mich auf ein Blatt zu zeichnen. Bis plötzlich einer der Kollegen folgenden Satz aussprach:

> Es ist sehr ärgerlich, dass die Android-Kollegen so einfach mit CMake die Library aus dem C++-Quellcode bauen konnten. Wir schaffen es leider einfach nicht.

Ich nickte zustimmend mit dem Kopf und freute mich dass der Kollege so offen war, diese Limitierung seiner Kenntnisse so offen anzusprechen. Es ist ja auch wirklich nicht Sinne des Erfinders, dass ein iOS-Entwickler C++-Quellcode kompiliert und in eine verwendbare Bibliothek umwandelt. 

**Und genau hier lag das Problem. Es fand eine enorme Diskrepanz zwischen Erwartung und Realität statt.**[^3]

Denn wieso, um alles in der Welt, kompillierten meine iOS-Kollegen überhaupt C++-Quellcode?

Da es bei zwischenmenschlichen Problemen keine monokausalen Zusammenhänge gibt, liegt der Gedanke nahe, dass in diesem Fall einige mehrere Missverständnisse zu einem gemeinsamen Problem beitragen.

Zeit, die einzelnen Sichtweisen auf die Problematik genauer zu betrachten:

<div class="grid300">
    <div class="col"><h3>Product Owner*in</h3>
        <ul>
            <li>C++-Team liefert Bibliothek.</li>
            <li>Android-Team integriert diese erfolgreich.</li>
            <li>iOS-Team schafft dies nicht. Wo liegt das Problem?</li>
        </ul>
        <p>Missverständnis: Der Fehler muss beim iOS-Team liegen. Sollte der Druck erhöht werden?</p>
    </div>
    <div class="col"><h3>C++-Team</h3>
        <ul>
            <li>Baut die Kernfunktionalität.</li>
            <li>Legt den Quellcode in Versions-Branches ab.</li>
            <li>Hat den Anspruch, eine Bibliothek in die mobilen Anwendungen einzubinden, da sich eine Library leichter einbinden und versionieren lässt.</li>
        </ul>
        <p>Missverständnis: Der Wunsch nach einer Bibliothek ist gut und richtig. Wir haben kein Android / iOS-KnowHow, also sollen die Teams die Bibliothek bauen.    </p>
    </div>
    <div class="col"><h3>iOS-Team</h3>
        <ul>
            <li>Hat eine konventionelle Lösung für C++-Code gefunden.</li>
            <li>Schafft es nicht eine Bibliothek zu erstellen.</li>
        </ul>
        <p>Missverständnis: Es ist nicht unsere Aufgabe die Bibliothek zu bauen, aber wir versuchen der Erwartung gerecht zu werden.</p>
    </div>
</div>

Die Lösung des Problems: Dem C++-Team das KnowHow an die Hand geben um, idealerweise mittels Continuous Integration, aus ihrem entsprechenden Code eine Bibliothek für Android und iOS zu bauen, und damit das Deliverable zu liefern, welches sie von Anfang an hätten liefern sollten, aber nicht konnten.

## Aber Flo, was lernen wir jetzt daraus?

Tendenziell könnte man nun hingehen, und klassisch analysieren, *wer* sich *wann* falsch verhalten hat. Natürlich ohne sich Gegenseitig die Schuld zu geben[^4] sondern um etwas daraus zu lernen. 

Eine klassiche Analyse wäre:

- Product Owner*in: Genauer ins Team reinhorchen, nicht pauschal Schuld zuweisen. Auch ein gedachtes "Ich gebe den Entwicklern ja keine Schuld, aber sie scheinen nicht weiterzukommen..." bedeutet dass die Ursache des Problems beim iOS-Team liegt. Dort lag sie aber nicht.
- C++-Team: Auftrag verfehlt. Es ist die Aufgabe des Teams als Deliverable eine Library zu entwickeln. Das haben sie nicht getan, sondern ihre Verantwortung auf die App-Teams abgewälzt.
- iOS-Teams Es ist niemand geholfen, wenn man vermeintlich selbstlos versucht zu helfen. Die Verantwortlichkeiten bezüglich eines Softwareprojekts sind nicht ohne Grund definiert.

<div align="center">
    <figure>
        <img src="/assets/gifs/learning.gif">
        <figcaption>Quelle: foxtel.com.au / Giphy</figcaption>
    </figure>
</div>

Aber sind den Mitgliedern dieses Teams ihre Verantwortlichkeiten überhaupt klar?

Bestimmt sind Sie das vermutlich. Aber *versteht* sie auch jedes Team Mitglied? In meinem alten Start-Up myScotty[^5] haben wir aus diesem Grund einen Workshop abgehalten. Jedes Teammitglied sollte seine Definition der Aufgaben-, Verantwortungs- und Entscheidungsbereiche von Positionen wie Product Owner, System Architect, Backend Developer, App Developer, Tester, etc. aufschreiben und dann wurde gemeinsam diskutiert. Der Workshop ergab, nach über zwei Tagen, was zu erwarten war:

Jeder Mensch hat aufgrund seiner persönlichen Erfahrungen innerhalb einer oder mehreren Firmen und / oder Projekten ganz individuelle Definitionen dieser Rollen angetroffen und für sich ein Verständnis dieser Rollen abgeleitet. Es ist also immer davon auszugehen, dass diese unterschiedlichen Sichtweisen zwangsläufig zu Problemen innerhalb des Teams führen werden.

Für dieses Team wäre mein Ratschlag also: Setzt euch zusammmen, reflektiert diese Geschehnisse und überlegt, wie es dazu kam, dass drei Entitäten einer Projektgruppe an einander vorbei gearbeitet haben. 

Letztendlich ist "an einander vorbei arbeiten" ja ganz normal. 

But don't be normal - be excellent.

---

[^1]: Es mag allerdings Projekte geben, die derart alte Libraries einbinden, dass sie auf eine Funktionalität ovn iOS11 angewiesen sind, die seitens Apple mit iOS12 entfernt wurde.
[^2]: Deliverables sind Software-Komponenten, die ein Team "ausliefert". Ein der industriellen Fertigung entliehener Begriff.
[^3]: Ein Schelm, wer hier an meine letzte Beziehung denkt.
[^4]: Das geschieht nur hinter vorgehaltener Hand.
[^5]: Gott wie ich diese Zeit vermisse! 🛵