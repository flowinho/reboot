---
layout: post
title: "Über Meetingkultur, Defaults von SwiftUI, Jekyll-Titel-Fuqup + GIT-Bonus"
tags: arbeit meetings swiftui markdown jekyll git-remotes
---


## Zu Meetings

Es ist einfach super wichtig, dass die Erwartungen des Veranstalters und der Teilnehmer eines Meetings von vornherein so gut wie möglich abgefangen werden.

- **Teilnehmende Personen**  
Eine Auflistung der am Meeting teilnehmenden Personen und warum sie wichtig sind. *Mega mäßig unterschätzt.* Auch für den Veranstalter manchmal ganz gut. „Warum habe ich XY nochmal eingeladen?!“
- **Agenda**  
Ablauf des Meetings. Ich kann das nicht genug betonen. Wer als Veranstalter eines Meetings, selbst wenn es nur ein paar Minuten dauert, eine Agenda definiert, tut sich wesentlich leichter Abschweifungen[^1] aus dem Weg zu gehen.
- **Erwartetes Ergebnis**
Dieser Teil muss einfach *immer* beinhalten, *wer* am Ende des Meetings mit *welcher Aufgabe* betreut wird.

Und es gibt keinen größeren Fuckup, als wenn man von Kollegen gebeten wird, einen Termin anzulegen, dann lange nach einem freien Termin, nur um dann die Nachricht zu erhalten: „Sorry, da kann ich nicht.“

Okay, ich habs verstanden. Du hast in der Zwischenzeit ein neues Meeting erhalten, dass wichtiger ist. Alles cool. Wäre halt nett gewesen, dass Meeting selbst zu verlegen, statt es einfach abzusagen und um einen neuen Termin bitten. Ich bin nicht dein Assistent.

## SwiftUI HStacks haben ein Default-Spacing von 10

Warum genau? Soll das einsteigerfreundlich sein? Da das Ganze nirgends wirklich direkt ersichtlich ist, tut es ganz schön weh, das herauszufinden. Default-Werte die nicht `0` sind? Hmmmm, immer kritisch.

## Die Dateinamen eines Jekyll-Posts brauchen zwingend einen Titel

Dieser Titel wird in der Dokumentation als `Document Title` beschrieben. Ist dieser Titel nicht vorhanden, taucht der Post nicht in der Post-List auf. Umgehen lässt sich das Ganze durch setzen der Property `slug` in der Frontmatter, aber zufriedenstellend ist das Ganze nicht.

Ich hatte ursprünglich geplant maximal täglich einen Post zu verfassen, da wäre das wirklich praktisch gewesen.

## Git-Bonus?

Eigentlich wollte ich hier schreiben, wie sich bei einem neuen, lokal erstellten GIT-Repository eine Remote hinzufügen lässt. Stellt sich aber raus: das war gar nicht nötig. Ich habe einfach den Inhalt meines alten Blogs mit meinem neuen Code ersetzt. 🤐

Aber wenn wir schonmal dabei sind...

```bash
// Auflistung aller Remotes
git remote -v 

// Hinzufügen einer neuen Remote
git remote add nameDerRemote git@remote.server.com:username/repo
```

Nach dem Hinzufügen erneut durch `git remote -v` sicherstellen das es funktioniert hat.

---

[^1]: Und wir Programmierer lieben es, abzuschweifen.