---
layout: post
title: "Swift Variablen: Strong, weak, unownend - wie bitte was?"
author: Florian Schuttkowski
excerpt: "
Ein weiteres Thema, das immer wieder auftaucht: Wie genau werden Variablen in Swift deklariert? Was bedeuten die Worte Strong, Weak und Unowned? Was sind die Vorteile und Nachteile der jeweilige Schlüsselwörter? Und wann macht Unowned überhaupt Sinn?"
categories: swift
imageURL: "https://cloud.fschuttkowski.xyz/s/AGMyxLz5q8xbmcd/download/Screenshot%202022-03-01%20at%2014.27.48.png"
---

Ein weiteres Thema, das immer wieder auftaucht: Wie genau werden Variablen in Swift deklariert? Was bedeuten die Worte Strong, Weak und Unowned? Was sind die Vorteile und Nachteile der jeweilige Schlüsselwörter? Und wann macht `unowned` überhaupt Sinn?

Prinzipiell kommt der Ursprung der Schlüsselworte `strong`, `weak` und `unowned` aus Apples hauseigener Version von Speichermanagement, dem Automatic Reference Counting. Wer nicht weiß, wie ARC funktioniert, sollte sich diese Funktionalität dringend zu Gemüte führen. Die Grundidee ist: das System zählt die Referenzen, die ein Objekt aufweist. 

## Strong - die starke Referenz

`strong` ist der Standard-Wert jeder deklarierten Variable sofern nicht anders angegeben. Damit sind die folgenden beiden Zeilen identisch:

```swift
let foo = 3.14
strong let foo = 3.14 // Swift benötigt das strong Keyword nicht.
```

Die Grundregel lautet: solange irgendetwas eine starke Referenz auf ein Objekt hat, wird dieses Objekt nicht dealloziiert.
Mit starken Referenzen macht man, vorerst, in den meisten Fällen nichts falsch, wenn diese Objekten einem linearen Zugriff folgen. 

Beispiele für linearen Zugriff sind unter anderem:

- Views und ihre Subviews
- Arrays und ihre Inhalte

In Code:

```swift
struct Pokemon { }

class Trainer {
    // Bei beiden Pokémon handelt es sich um eine starke Referenz.
    let firstMonster = Pokeball ()
    let secondMonster = Pokeball ()
}
```

## Weak - die schwache Referenz

Es kommt im Alltag einer Software durchaus vor, dass ein Kindobjekt auf ein übergeordnetes Object zugreifen muss. Würden hier nun starke Referenzen verwendet werden, würde das eigentlich Objekt niemals den Arbeitsspeicher verlassen, da bei Objekte sich gegenseitig referenzieren. Dieser Zustand wird allgemein als Memory Leak bezeichnet.

<div align="center">
<figure>
    {% include diagrams/circular-reference.html %}
    <figcaption>Diagramm: derflo.io, 2022</figcaption>
    </figure>
</div>


Ein praxisbezogenes Beispiel sind zum Beispiel Timer, die nach einer bestimmten Zeit eine Funktion innerhalb der Klasse ausführen sollen:

```swift
let timer = Timer.scheduledTimer(timeInterval: 3, 
                                target: self, 
                                selector: #selector(doStuff), 
                                userInfo: nil, 
                                repeats: true)

@objc func doStuff(){ }
```
Dieses nicht ungewöhnliche Szenario beinhaltet bereits eine Kreisreferenz, den allseits gefürchteten `retain cycle`. Warum? Timer enthält eine Referenz auf `self`, während `self`, als Klasse, natürlich ebenfalls eine Referenz auf `Timer` beinhaltet. Auf diese Weise werden beide Objekte niemals freigegeben. 

Die Lösung: `weak`

Indem wir einem der Objekte, in diesem Fall `self` keine starke, sondern eine schwache Referenz geben, wird diese Referenz aufgelöst. wenn sie nicht mehr gebraucht wird und die Objekte werden vom Automatic Reference Counting dealloziiert. 

Um die Art der Referenz zu ändern, ist ein closure-basierter Timer am anschaulichsten:

```swift
Timer.scheduledTimer(withTimeInterval: 1, repeats: true){ [weak self] in
    self?.doStuff()
}
```
Was passiert hier?

<div align="center">
<figure>
    {% include diagrams/weak-reference-timer-example.html %}
    <figcaption>Diagramm: derflo.io, 2022</figcaption>
    </figure>
</div>

Die Kreisreferenz wird aufgelöst, indem die `self` Referenz vor Übergabe in die closure mit `weak` gekennzeichnet wird. 

Schwache Referenzen haben unter anderem folgende Eigenschaften:

- Sie sind immer `optional`. Das ist notwendig, denn schwache Referenzen könnten in der Zwischenzeit vom ARC aufgelöst worden sein. Auf diese Weise wird sichergestellt, dass ein Zugriff auf dieser Variable entweder ein valides Objekt oder nil zurückgibt.
- Sie erhöhen den Reference Count eines Objekts nicht. Dies erlaubt dem Automatic Reference Counting das Objekt zur korrekten Zeit zu dealloziieren.

Diese Eigenschaften zeigen auch einen sehr häufig vorkommenden Fehler auf: die Verwendung von non-optional delegates. 
```swift
public class MyViewController: UIViewController {
    var tableViewDelegateStrong: UITableViewDelegate    // Falsch!
    var tableViewDelegateWeak: UITableViewDelegate?     // Richtig!
}
```
Dieses Problem wird besonders deutlich, sobald mehrere Delegates in einem System vorhanden sind. Beispielsweise in einem Bildschirm, der eine Tabelle darstellt, eine TabBar, ein Eingabefeld und eine Suche. Werden für diese Delegates keine schwachen Referenzen verwendet, erhalten wir den `retain cycle of hell`

<div align="center">
<figure>
    {% include diagrams/retain-cycle-delegates.html %}
    <figcaption>Diagramm: derflo.io, 2022</figcaption>
    </figure>
</div>

Alle Delegates in diesem Beispiel, sowie der ViewController der diese referenziert, werden niemals freigegeben. Ein Worst Case Scenario. Zudem kann sich diese Situation nahezu unendlich komplizierter gestalten, falls die entsprechenden Delegates ihrerseits starke Referenzen beinhalten.

Deshalb die goldene Regel: 

<div class="side-note">
Das Delegation Principle sollte immer über optionals erfolgen, um weitreichenden retain cycles vorzubeugen.
</div>

## Unowned - die einfachere, aber gefährlichere Alternative

Eine Alternative zu `weak` stellt unowned dar. Die Hauptunterschiede von `unowned` und `weak` sind:

- `unowned` Variablen sind keine Optionals. Dadurch sind die einfach zu handhaben und bestimmte Sicherheitsmaßnahmen, wie das allseits gehasste `if let`, sind nicht mehr notwendig.
- Pointer `unowned` Variablen werden bei einer Dealloziierung des Objekts auf das sie zeigen NICHT auf `nil` gesetzt. Dies hat zur Folge dass eine `Null Pointer Exception` erzeugt werden kann.

In Code lassen sich diese Vor- und Nachteile folgendermaßen darstellen:

```swift
public class MyClass {
    var weakDelegate: UITableViewDelegate?
    unowned var unownedDelegate: UITableViewDelegate

    init(){
        let tableView = UITableView()
        tableView.delegate = weakDelegate       // Korrekt. Nicht funktional, aber möglich.
        tableView.delegate = unownedDelegate    // Falsch. Die App crashed, da unownedDelegate nicht initialisiert ist.
    }
}
```
## Fazit

Wie immer sollten sich Programmierer über das exakte Verhalten dieser Funktionalitäten bewusst werden, bevor sie sich dafür entscheiden. Weak und insbesondere unowned sollten nicht genutzt werden, wenn die Implikationen nicht klar sind. Ebenfalls ist die durchgehende Nutzung von starken Referenzen nicht zielführend, da Kreisreferenzen herbeigeführt werden können.

Ich hoffe dieser Artikel konnte ein wenig dazu beitragen, euer Verständnis für diese Mechanismen zu vertiefen.