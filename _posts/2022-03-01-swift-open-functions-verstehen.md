---
layout: post
title: "Swift Access Control: Open vs Public verstehen und anwenden"
author: Florian Schuttkowski
excerpt: "Es ist mal wieder soweit. In einem meiner Projekte entbrennt eine Diskussion, der ich nun schon allzuhäufig begegnet bin. Es geht um die Access Control Modifier open und public. Also insbesondere um die Unterschiede zwischen open classes und public classes. Es ist Zeit, auch für mich, sich noch einmal im Detail mit diesen Schlüsselwörtern auseinanderzusetzen."
categories: swift
imageURL: "https://cloud.fschuttkowski.xyz/s/7cHqG6jAT7QNFkX/download/Screenshot%202022-03-01%20at%2009.03.06.png"
---

Es ist mal wieder soweit. In einem meiner Projekte entbrennt eine Diskussion, der ich nun schon allzuhäufig begegnet bin. 
Es geht um die Access Control Modifier `open` und `public`. Also insbesondere um die Unterschiede zwischen open classes und public classes. Es ist Zeit, auch für mich, sich noch einmal im Detail mit diesen Schlüsselwörtern auseinanderzusetzen.

Um was geht es also genau? Um die unterschiedlichen Auswirkungen und Eigenschaften von Klassen und Funktionen, die entweder `public` oder `open` deklariert werden.

Sehen wir uns das mal im Detail an.

```swift
// Offene Klassen und Funktionen
open class Hyperball(){}
open func CatchEmAll() -> String { }

// Öffentliche Klassen und Funktionen
public class Superball(){}
public func TradeWithFriends() -> String { }
```
Wo genau liegen nun die Unterschiede?

Schauen wir uns dazu einmal die Definitionen beider Schlüsselwörter, sowie ihre Verfügbarkeit in den verschiedenen Swift-Versionen an.

|Open Class|Public Class|
|:--|:--|
|Eine offene Klasse ist außerhalb des Moduls, welches die Klasse definiert zugreifbar und Subklassen können erstellt werden.|Eine öffentliche Klasse ist außerhalb des definierenden Moduls zugreifbar, aber Subklassen können nicht abgeleitet werden.|
|Eine Variable einer offenen Klassen ist außerhalb des definierenden Moduls zugreifbar und überschreibbar.|Eine Variable einer öffentlichen Klasse ist zugreifbar aber nicht überschreibbar außerhalb des definierenden Moduls.|
|Das Schlüsselwort `open` steht ab Swift3 zur Verfügung. Eine Rückwärtskompatibilität ist nicht gegeben.|Das Schlüsselwort `public` steht immer zur Verfügung. Eine Rückwärtskompatibilität ist gegeben.|

Ebenfalls wichtig zu wissen ist der historische Hintergrund dieser Access Control Modifier innerhalb der Programmiersprache Swift. Bei der Einführung von Swift und Swift2 waren initial alle Klassen und Funktionen, die mit `public` gekennzeichnet wurden, überall verfügbar. Diese nachvollziehbar sehr gefährliche Herangehensweise an Access Control wurde von der Community stark kritisiert. Ein Auszug der Hauptkritikpunkte:

- Access Control existiert aus einem Grund. Die Tatsache dass öffentliche Klassen Systemweit verfügbar sind, erhöht das Risiko einer fehlerhaften oder gar schädlichen Verwendung dieser Klassen. 
    - Funktionen können überschrieben werden und zu Bugs führen.
    - Funktionalitäten können überschrieben werden und zu Sicherheitslücken führen.
- Eine Third-Party-Library ist quasi "zwanghaft Open Source", da es keine Möglichkeiten gibt die Funktionalität davor zu schützen überschrieben zu werden.
- Die Tatsache dass "einfach alles immer und überall" verfügbar ist, verleitet unerfahrene Entwickler dazu, unnötige Couplings zu Third-Party Code zu erzeugen, was weitreichende Probleme innerhalb eines Projekts erzeugen kann, insbesondere wenn diese Depedencies entfernt werden sollen / müssen.

Damit wird `open` zum Swift 3+ Äquivalent von `public` aus früheren Swift-Versionen.

...

Doch was bedeutet das nun konkret? Sollte ein:e Programmierer:in ab jetzt einfach immer zum `open` Keyword greifen?

Es bedeutet zunächst einmal folgendes: Von einer Klasse, die mit `open` deklariert wurde, können außerhalb ihres definierenden Moduls Subklassen abgeleitet werden. Es ist also vergleichbar mit `public`, allerdings schließt `public` eine Ableitung außerhalb des definierenden Moduls aus.

In Swift-Code bedeutet diese Definition folgendes:

```swift
// Klassendefinition in Modul "FiktivesSDK"
open class Foo { 
    open func OverrideMe() { 
        print("No one cares about me")
    }
}

public class Bar {
    public func OverrideMe() { 
        print("No one cares about me")
    }
}
```
```swift
// Neue Datei, außerhalb von Fiktives SDK
import FiktivesSDK

// Subklasse der mit open deklarierten Klasse Foo
class ThisWorks: Foo {
    func OverrideMe() {
        print("Well, at least someone cared!")
    }
}

// Dieser Code ist aufgrund des public Keywords nicht nutzbar.
class ThisDoesntWork: Bar {
    func OverrideMe() {
        print("Well, guess i'm alone forever.")
    }
}
```

Wann sollte also `open` zum Einsatz kommen? 

|Open sollte verwendet werden|Open sollte nicht verwendet werden|
|:--|:--|
|Wenn eine Klasse von vornherein dafür gedacht ist, von außerhalb abgeleitet zu werden.|Wenn man sich unsicher ist ob eine Klasse `open` oder `public` sein sollte.|
|Wenn absehbar ist, dass die Klasse außerhalb des definierenden Moduls verwendet werden soll, beispielsweise innerhalb eines Mocks.|Der Einfachheit halber.|
||Wenn gewährleistet werden soll, dass eine Klasse oder Methode nicht von außerhalb überschrieben werden darf, beispielsweise aus Sicherheitsgründen.|
||Wenn Rückwärtskompatibilität zu älteren Swift- / Xcode-Versionen erforderlich ist.|

Access Control Modifier existieren aus nachvollziehbaren und wichtigen Gründen. Sie geben an, wer Zugriff auf den Programmcode hat, und wer in die Lage versetzt werden soll, diesen zu ändern. Sie sollten bewusst und gewissenhaft verwenden werden.

Der Standard Access Control Modifier in Swift ist `internal`. Sollte die Verfügbarkeit einer Klasse erweitert werden müssen, sollte man sich langsam, über `public` an `open` herantasten und ganz bewusst nach und nach den Zugang zur Klasse erweitern.

Wer sich weitere Inhalte zu diesem Thema anschauen möchte, kann sich gerne [die offizielle Diskussion zu diesem Thema innerhalb der Swift-Entwicklung anschauen](https://github.com/apple/swift-evolution/blob/master/proposals/0117-non-public-subclassable-by-default.md).