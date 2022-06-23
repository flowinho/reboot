---
layout: post
title: "git push hängt nicht mehr. TIL Git hat nen Garbage Collector?!"
tags: development git macos github garbage-collector
---

Mehrere Tage lang hatte ich das Problem, `git push` nicht mehr durchführen zu können. Ich konnte Commits weder zu GitHub, noch zu Azure DevOps Repositories schieben. 

|![Screenshot eines Terminals, welches verschiedene GIT-Actions zeigt.](/assets/posts/git-push-terminal.png)|
|:-:|
|An der roten Linie kann man erkennen, dass ich `git push` abbrechen musste, nach Ausführen des Git Garbage Collectors läuft der Prozess problemlos durch.|

Durch [diesen Stack Overflow Post](https://stackoverflow.com/questions/39008395/git-push-stuck-after-total-when-using-terminal) wurde ich dann darauf aufmerksam gemacht, dass Git über einen Garbage Collector verfügt.

Siehe da, Problem gelöst.

Zeit sich den GIT Garbage Collector etwas genauer anzuschauen.

> Executing git gc is literally telling Git to clean up the mess it's made in the current repository. -- Atlassian

Aber was macht der Garbage Collector in einem Repository?

- Durch Änderungen an der Git-History, beispielsweise `git rebase` oder `get reset` können commits vorhanden sein, die aber nicht mehr in der History verlinkt sind. Der GC entfernt diese.
- Der GC führt einen Kompressionsalgorithmus aus[^1] aus, der Speicherplatz freigibt. Imho sollte er daher schon allein aus diesem Grund regelmäßig ausgeführt werden. 🤔
- GC prüft, ob im `reflog` Commits vorhanden sind, die älter als 90 Tage[^2] sind. Falls ja, werden diese entfernt.
- Objekte, dass können beispielsweise Commit-Pointer sein, die älter als zwei Wochen sind, werden gelöscht.
- Working Tree Items die älter als drei Monate sind, werden ebenfalls gelöscht.

**Wichtig zu wissen:** GC wird bei jeder Ausführung der Befehle `merge`, `pull`, `rebase` und `commit` ausgeführt.

[^1]: Leider war mir nicht möglich herauszufinden, welchen genau.
[^2]: 90 Tage sind hier der Default. Kann in den Repository settings geändert werden.
