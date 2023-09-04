# SudokuPizza 🍕

Ciao! Mettiti comodo e preparati a risolvere il problema che abbiamo preparato per te.
Ricordati di:

- Leggere attentamente i requisiti della soluzione
- Scrivere codice pulito e interpretabile facilmente
- Usare solo le librerie esterne consentite (trovi la lista alla fine!)


## Statement:
Scrivi un applicazione React partendo da questo skeleton project che dia la possibilità all'utente
di completare un sudoku con cifre a suo piacimento. 

- Deve essere possibile cliccare su un bottone "Solve" che risolverà il sudoku e mostrerà all'utente la soluzione.
- Deve essere possibile cliccare su un bottone "Clear" che riporterà il sudoku al suo stato iniziale: vuoto

### La Funzione "Solve"

Non è necessario che tu scriva la funzione per risolvere il sudoku. Effettua una chiamata ad un'ipotetica
API che si comporta nel seguente modo e restituisci una risposta hardcoded.

JSON based request:

```curl -H 'Content-Type: application/json' -X POST -d '{"sudoku":["9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254"]}' http://127.0.0.1:5000```

dove il "." rappresenta una cella vuota*

Succces response:

```
{
    "data":[
        {
        "puzzle":"9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254",
        "solution":"971536842286974513354812679563421798497658321128793465732145986645289137819367254",
        "status":"OK",
        "message":null
        }
    ]
}
```

P.S. Se vuoi usare una vera API, ecco quella da cui abbiamo preso ispirazione: https://github.com/navshaikh/sudoku-api

Potresti avere bisogno di un proxy per fare le richieste a causa delle CORS.

## Stile e UX

Crediamo che il look and feel di un'applicazione possa essere determinante per il suo successo, ecco perchè ti lasciamo
carta bianca sotto questo aspetto. Ogni idea è ben accetta, sorprendici. 

Ti consigliamo l'utilizzo di tailwind per lo styling, è tra le librerie permesse :) 

## Esempio

Ecco uno screen di un form grezzo che può darti un'idea di partenza:

Sudoku iniziale (vuoto):
![Screenshot 2023-09-04 at 7.23.11 AM.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2F0j%2F4grdvcrs4p7c35z692ddyqt00000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_MzRaBE%2FScreenshot%202023-09-04%20at%207.23.11%20AM.png)

Sudoku dopo "Solve":
![Screenshot 2023-09-04 at 7.32.48 AM.png](..%2F..%2F..%2F..%2Fvar%2Ffolders%2F0j%2F4grdvcrs4p7c35z692ddyqt00000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_uOzW89%2FScreenshot%202023-09-04%20at%207.32.48%20AM.png)

## Testing

Ti è richiesto di scrivere un test per questa semplice applicazione.

```
isSolvingSudokuCorrectly
```

Questo unit test, sfruttando il mock dell'API utilizzata per risolvere il sudoku, dovrà assicurarsi che 
- una volta inseriti i dati nel sudoku essi siano mostrati 
- una volta cliccato il bottone "Solve" i dati vengano inviati, la soluzione ricevuta e mostrata correttamente all'interno del sudoku di partenza

Per fare il mock dell'API utilizza "msw", è tra le dipendenza permesse :)

Ogni altro test è superfluo, ma se ti rimane tempo fai pure!

## Librerie permesse

Dovresti essere in grado di completare il progetto senza l'utilizzo di particolari dipendenze.
Ad ogni modo, ecco quelle che abbiamo pensato possano esserti utili e che sei libero di usare:
- Tailwind
- msw
- react-testing-library
- cors-proxy-server

Per qualsiasi domanda o dubbio siamo a tua disposizione.
Metticela tutta e a presto!