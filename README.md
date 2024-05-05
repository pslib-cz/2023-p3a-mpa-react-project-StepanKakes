# F1 stats dashboard
## Aplikace ještě není hotová
aplikace je funkční ale je nutné ještě dodělat/doladit pár funkcionalit a vylepšit styly a zlepšit responsibilitu


## Téma

F1 Dashboard s live informacemi ze závodů, statistikami z této sezóny a informacemi o závodnících.
inspirace:[01](https://dribbble.com/shots/11407021-F1-Insights-Dashboard), [02](https://dribbble.com/shots/6746836-F1-Red-Bull-Racing-interface)
https://www.figma.com/file/LYV1BtY0WuTrVDIoS9kguX/f1-dashboard?type=design&node-id=0%3A1&mode=design&t=gR4IpcDseirAnync-1

## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
