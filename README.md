# F1 stats dashboard


### ukázka "hlavní" live funkcionality z 5.5.2024 (poslední závod který se v časovém rozmezí projektu jel), v tu dobu ještě nebyla aplikace zcela hotová, nyní jsou přidány nové funkcionality
https://github.com/pslib-cz/2023-p3a-mpa-react-project-StepanKakes/assets/91247524/d0e8bc83-e793-48b4-9e51-f739b319ff53

### ukázka "finálního" live dashboardu (testováno mimo závod se starými daty)
https://github.com/pslib-cz/2023-p3a-mpa-react-project-StepanKakes/assets/91247524/c3f67673-7895-4c8f-8ada-cb3a56038122

- Dashboard funguje pouze pokud je zrovna raceweekend tzn: practice/quali/sprint/race - jinak se zobrazí odpočet
- Kvůli tomu bylo velice složité testovat funkcionalitu, převážně to bylo možné pouze v neděli když byl závod (za dobu projektu asi 3x)
- Aplikace má několik nedostatků, limity pro live API mohou občas odmítnout request, nebo ho dlouho načítat
- API pro zobrazení žebřicku jezdců má limit 100 requestů za den
- Kvůli časovému nedostatku a omezeným možnostem debugování live funkcionalit, není ještě hotové zobrazení žebříčku i pro constructors (něco co by se dalo v budoucnu ještě dodělat)
- Možné budoucí upgrady: zobrazení žebříčku constructors, zobrazení informací o sessions, live zobrazení pozic jezdců (limitace API), další komponenty v live dashboardu, historie závodů (limitace API), barevný background
[Figma](https://www.figma.com/file/LYV1BtY0WuTrVDIoS9kguX/f1-dashboard?type=design&node-id=14%3A2&mode=design&t=IlCSR7CUO4aYP8ol-1)

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
