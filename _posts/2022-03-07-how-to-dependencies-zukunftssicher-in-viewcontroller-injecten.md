---
title: "How-To: Dependency-Injection zukunftssicher mit UIViewController nutzen"
layout: post
categories: swift
author: Florian Schuttkowski
excerpt: "UIViewController ist eine der ersten Kern-Klassen denen ein iOS-Entwickler begegnet. Insbesondere wenn man mit der Entwicklung von iOS-Software beginnt, drängt sich dem Entwicker
regelrecht auf, sich mit dieser Klasse auseinanderzusetzen. Ihre Einsatzmöglichkeiten sind vielfältig - aber genau hier liegt die Gefahr."
imageURL: https://cloud.fschuttkowski.xyz/s/QtrnZyHs9fnaqfT/download/Screenshot%202022-03-04%20at%2008.47.54.png
---

UIViewController ist eine der ersten Kern-Klassen denen ein iOS-Entwickler begegnet. Insbesondere wenn man mit der Entwicklung von iOS-Software beginnt, drängt sich dem Entwicker
regelrecht auf, sich mit dieser Klasse auseinanderzusetzen. Ihre Einsatzmöglichkeiten sind vielfältig -- aber genau hier liegt das Problem. UIViewController ist, nach modernem Verständnis, nicht mehr als eine Erweiterung der View - also der Anzeigeschicht. Leider neigen nach wie vor viele Entwickler dazu große Menge Business-Logic oder Interaktions-Logik wie zB. UITableViewDelegate in dieser Klasse abzulegen. Das altbekannte [Massive-View-Controller-Syndrom](https://www.hackingwithswift.com/articles/159/how-to-refactor-massive-view-controllers).

Doch auch View-Controller brauchen Logik. Je nach Architektur greifen ViewController auf verschiedenste Implementierungen zu, sei es ein ViewModel innerhalb einer MVVM-Architektur[^1], oder der Presenter eines MVP[^2] oder V.I.P.E.R.[^3] Stack oder einfach nur der vom Nutzer in einer TableView ausgewählte Datensatz.

Unabhängig von der zugrunde liegenden Architektur brauchen ViewController also oftmals weitere Daten. Nur wie kommen die ViewController an diese Daten? 

Im Laufe der letzten 7-8 Jahre sind mir viele verschiedene, teils sehr kreative, teils sehr durchdachte, und teils sehr fragwürdige Antworten für diese Fragestellungen begegnet. Fairerweise muss man sagen, das iOS SDK hat sich über die Jahre stark weiterentwickelt. Die Einführungen neuer APIs, die Einführung von Storyboards & Swift UI und nicht zuletzt die Entwicklung von SWIFT als neue Programmiersprache für das Apple Ökosystem, haben es uns Entwicklern über die Jahre einfacher gemacht. Aber nicht alle APIs und Sprachkomponenten sollten gedankenlos genutzt werden. *Insbesondere UIViewController, das zentrale Herzstück jedes App-Bildschirms und damit Kern der Nutzererfahrung, sollte mit Bedacht konstruiert werden.*  

Doch wie lassen sich Abhänigkeiten nun erfolgreich an UIViewController weitergeben? 

Um dieses Thema näher zu verstehen würde ich gerne zuerst auf  ein gängiges Modell und seine etwaigen Nachteile eingehen.

## Prepare for Segue

Mit der Einführung von Storyboards in iOS7 und den damit einhergehenden Segues[^4] begannen meine Kollegen und anfangs auch Ich, die neu eingeführte Methode `func prepare(for segue: UIStoryboardSegue, sender: Any?)` zu nutzen. Die Grundidee ist denkbar einfach: iOS ruft diese Methode vor jedem Übergang zwischen zwei UIViewController auf, sofern sich diese in derselben Storyboard-Datei befinden und durch eine Segue miteinander verbunden sind. Dabei spielt es keine Rolle ob die Segue über `performSegue(...)` angesteuert wird, oder durch Antippen eines UIButton durch den Nutzer. 

Apple selbst [lehrt diese Herangehensweise innerhalb seiner Einführung für Entwickler](https://developer.apple.com/library/archive/featuredarticles/ViewControllerPGforiPhoneOS/UsingSegues.html).

Ein Beispiel:


```swift
public class MainVC: UIViewController {
    ...
    override func prepare(for segue: UIStoryboardSegue, sender: Any?)  {
        // 1. Um welche Segue handelt es sich?
        if segue.identifier == "MainToSettingsVC" {
            // 2. Handelt es sich beim Ziel-ViewController der Segue um den erwarteten?
            // Diese Prüfung ist auch notwendig um Zugriff auf die Funktionen und Properties der Ziel-Klasse zu erhalten.
            if let destinationVC = segue.destination as? SettingsVC {
                // 3. Zuweisung des Ziel-Datenmodells.
                destinationVC.viewModel = self.viewModel
            } else {
                // Ziel-ViewController entspricht trotz vorhandenem Identifier nicht dem erwarteten Typs. Ein fatalError().
            }
        } else {
            // Der vom Entwickler erwartete Identifier wurde nicht gefunden. Das kann mehrere Ursache haben,
            // u.a. eine Änderung des Identifiers innerhalb der Storyboard-Datei.
        }
    }
    ...
}
```

### Nachteile von Prepare for Segue

- Alle UIViewController Interface-Builder Definitionen müssen sich in einem einzigen Storyboard befinden. Davon ist insbesondere bei mehr als einem Entwickler im Team grundlegend abzuraten, da sich Storyboard-Dateien aufgrund ihrer eigenwilligen, XML-artigen Struktur nur sehr schwer mergen lassen.
- UISegue ist ein Konstrukt dass noch nicht ganz ausgereift ist. Durch die harte Kopplung an UIStoryBoard und der erzwungenden Definition des Eingangs- und Ausgangs-ViewController kann hier nicht von einer allgemein gültigen Lösung gesprochen werden.
- UISegue ist nicht verfügbar, wenn Benutzeroberflächen mittels SwiftUI definiert werden.
- Diese Herangehensweise birgt die Gefahr, dass beide UIViewController stark aneinander gekoppelt werden, und von ihren jeweiligen Typen abhängig werden.
- Die Dependency wird *nach* dem Aufruf von `viewDidLoad()` weitergegeben.
- Die Verwendung String-basierter Identifier ist sehr volatil.
- Da `prepare(for segue: sender:)` nicht mit zusätzlichen Parametern aufgerufen werden kann, ist der Entwickler gezwungen das weiterzuleitende Datenobjekt innerhalb einer Klassenvariable abzulegen -- ein unnötiger Mehraufwand, und eine unnötige Fehlerquelle, da die Beeinflussung des Datensatzes möglich ist, was zu Fehlverhalten führen kann.
- Die Prüfung auf den `segue.identifier` muss für jeden UIViewController durchgeführt werden, der auf diese Weise angesprochen wird. Sehr viel redundanter Code, der sich durch Auslagerung in Funktionen lesbarer machen lässt, das Ursprungsproblem der direkten Kopplung an die Storyboard-Files aber nicht ändern.

### Testbarkeit von Prepare for Segue

Unit-Tests für diese Art der Datenweitergabe zu schreiben ist machbar, aber durchaus schwer. Der Unit-Test für die Klasse `SettingsVC` bräuchte Zugriff auf:

- Die Klasse `MainVC`.
- Alle Abhängigkeiten von `MainVC` und `SettingsVC`.
- Zugriff auf den Segue-Identifier.

Des Weiteren kann, wie bereits erwähnt, die Dependency erst weitergegeben, *nachdem* die Kern-Funktion `viewDidLoad()` des Ausgangs-ViewController aufgerufen wurde. Etwaige Logik innerhalb dieser ist somit bereits abgelaufen, *nachdem* die Dependency übergeben wurde. Daraus resultiert: die Dependency muss eine *Optional* sein. 

Moment? Eine fundamental wichtige, für die Funktionalität wichtige Datenklasse als optional? Hier stutzt nicht nur der alte Hase, sondern auch bei Neuankömmlingen sollten hier die Alarmglocken läuten. Zusätzliche artet jeder Zugriff auf diese wichtige Datenstruktur nun zu einer "Unwrapping-Party" aus. 

```swift
public class SettingsVC: UIViewController {
    var viewModel: SettingsViewModel?
    ...
    func updateOutlets(){
        if let vm = viewModel {
            ...
        } else {
            ...
        }
    }

    func populateTableView(){
        if let vm = viewModel {
            ...
        } else {
            ...
        }
    }
}
```
Eine unnötige Verkomplizierung, die kaum spürbaren Mehrwert generiert, aber durchaus mehr Code benötigt.


## Die Alternative: Protocol-injection, in einer Erweiterung des ViewControllers

```swift
// Die Verwendung eines Protokolls ermöglicht die Erweiterung der Basis-Klasse.
public protocol SettingsVM {
    var title: String { get set }
    var text: String { get set }
}

extension SettingsVC {
    // Die Verwendung von storyboard?=nil erlaubt es, diese Funktion auch ohne die Übergabe von UIStoryboard aufzurufen.
    // Das ist wichtig für Klassen, die keinen Zugriff auf UIKit benötigen. Bspw. Unit-Tests, Router.
    // Dennoch sollte der Parameter mit implementiert und geprüft werden, da sich die Eindeutigkeit der Funktion damit erhöht.
    public static func instantiate(from storyboard: UIStoryboard?=nil, with viewModel: SettingsVM) -> SettingsVC? {
        // Der Identifier wird in der dafür zuständigen Funktion abgelegt.
        let identifier = "SettingsVC"
        // Verwende das "Haupt"-Storyboard, falls keines per Parameter übergeben wurde.
        var sb = storyboard == nil ? UIStoryboard(name: "Profile", bundle: Bundle.main) : storyboard
        // Prüfung auf instanziierbaren ViewController. Der Vorteil? Die App crasht nicht bei dieser Funktion, wird können also
        // getrost auf eine unwrappable Optional prüfen.
        guard let vc = sb.instantiateViewController(withIdentifier: identifier) as? SettingsVC else {
            nil
        }
        // Zuweisung der Dependency.
        vc.viewModel = viewModel
        return vc
    }
}
```

---

[^1]: Model-View-Viewmodel, [https://de.wikipedia.org/wiki/Model_View_ViewModel](https://de.wikipedia.org/wiki/Model_View_ViewModel)
[^2]: Model-View-Presenter, [https://de.wikipedia.org/wiki/Model_View_Presenter](https://de.wikipedia.org/wiki/Model_View_Presenter)
[^3]: View-Iterator-Presenter-Entity-Router, [https://de.wikipedia.org/wiki/VIPER_(Entwurfsmuster)](https://de.wikipedia.org/wiki/VIPER_(Entwurfsmuster))
[^4]: Storyboard-Segues, Übergänge zwischen verschiedenen ViewControllern.