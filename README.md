# quackr
quacker ist eine Anwendung zum Austausch von nutzerspezifischen Kurznachrichten (vgl. Twitter).

Nutzer können Nachrichten erstellen, ändern, löschen und sich Nachrichten anderer Nutzer anzeigen lassen.

Administratoren haben die Möglichkeit, Nachrichten aller Nutzer zu löschen.

## lokales Setup & Starten der Anwendung
### Voraussetzungen
- laufende Docker Engine
- Docker Compose
- JDK 17

### Starten der Anwendung
Über die docker-compose.yml Datei kann zunächst die Datenbank gestartet werden.
Anschließend kann die Anwendung über das maven run goal des Spring Boot Plugins gestartet werden und läuft dann auf Port 8080.
Danach kann das Frontend über ng serve im entsprechenden Ordner gestartet werden und läuft auf Port 4200.


### Anlegen eines Administrator-Accounts
Falls ein (oder auch mehrere) Administrator-Account(s) gewünscht ist (sind), muss dieser manuell in der Datenbank hinterlegt werden.
Dies hat den Grund, dass gewöhnliche Nutzer selbstverständlich keinen Administrator-Account anlegen dürfen sollen und eine Beschränkung dieser Funktionalität auf Administratoren auch wenig Sinn hätte, weil so kein Administrator erstellt werden kann, wenn noch keiner vorhanden ist.
Das Hinterlegen des Admin-Accounts ist aber nach dem Herstellen einer Verbindung zur Datenbank z.B. in IntelliJ IDEA (Zugangsdaten sind in „docker-compose.yml“ hinterlegt, siehe oben) einfach über die folgende SQL Query möglich:
INSERT INTO quackr_user (id, username, password, role) values ([id], ‚[Nutzername]‘, ‚[Passwort Hash]‘, ‚ROLE_ADMIN‘);
Für das gewünschte Passwort muss zuvor einmal ein bcrypt-Hash generiert werden , der dann in der SQL-Query für das „password“-Feld eingetragen wird.
Des Weiteren ist zu beachten, dass die vergebene id noch nicht existieren darf und auch der Wert für „username“ einzigartig sein muss.
Nach Ausführung der SQL-Query ist der Administrator-Account erfolgreich hinterlegt und ein Login erfolgt mit den gewählten Daten über die standardmäßige Login-Maske.


## Technologien & Architektur
### Backend
Für das Backend wurde Java mit dem Spring Framework in Kombination mit dem Clean Architecture Konzept verwendet.
Für die Kommunikation mit dem Frontend wurde mit Hilfe von Spring Web eine REST Schnittstelle bereitgestellt.
Für die Umsetzung von Authentifizierung und Autorisierung werden JSON Web Tokens verwendet (implementiert durch Spring Security).

### Frontend
Das Frontend verwendet eine recht simple Kombination aus TypeScript, Sass, Angular & RxJS.
