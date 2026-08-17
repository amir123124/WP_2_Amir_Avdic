Ime i prezime: Amir Avdic
Broj indeksa: 0116/23
Godina studija: Treca 

O projektu:
Struktura moje aplikacije ima zadatak da kroz jednstavnu staticku HTML stranicu kroz login/register formu da koristnika uputi na dinamičku Angular stranicu. Nakon sto korisnik izvrši registraciju svog profila i ispuni potrebnu login formu u kojoj ima mogucnosti izmjene teme i stila kako ce stranica izgledat, dobija pristup glavnom dashboardu aplikacije. Dashboard aplikacija posujeduje mnostvo modula trackera za pracenje svakodnevnih aktivnosti i navika kroz dan,koji ce pomoci korisniku u ispunjavanju njegovih dnevnih ciljeva. Pored svega dashboard ima opcije poput StudentFunZone stranice koja posjeduje zabavne igre razlicitog tipa. 

Način pokretanja projekta:
Projekat pokrecemo na slijedeci nacin u folderu C:\Users\avdic\Desktop\WP_2_Amir_Avdic-main pokrecemo folder C:\Users\avdic\Desktop\WP_2_Amir_Avdic-main\ipi-angular iz kojeg brisemo putanju foldera iz searchbara i kucamo cmd. Na taj nacin pokrecemo standardnu komandnu konzolu. 

Napomena u slucaju da projekat ima probleme sa pokretanjem ili konflikt verzija paketa potrebno je koristiti sljedece komande:
cd ipi-angular
npm install --legacy-peer-deps

Nakon toga aplikacija ce se pokrenuti:
Pomocu komande ng serve finalno izvrsavamo pokretanje aplikacije koja je otvara na 
http://localhost:4200 

Opis staticke HTML stranice
Do staticke HTML stranice u folderu se pristupa na sljedeci nacin, otvorimo folder WP_2_Amir_Avdic/ u kojem cemo pronaci fajl pod nazivom index.html. Nakon ponalaska koristimo dupli klik misa kako bi pokrenuli fajl koji nas vodi na internet browser koji ucitava prvu pocetnu stranicu projekta. Internet browser nam ucitava stil i izgled HTML CSS i JavaScript fajlova koji cine tu stranicu u cijelini.
HTML stranica koja je osmisljena na nacin da bude glavna stranica Ipi-akademije je samo tu kao posrednik koji ce nas zapravo odvesti do glavne stranice ove aplikacije a to je dinamicka Angular stranica.

Struktura foldera projekta

\`\`\`
WP_2_Amir_Avdic-main/
├── index.html, kontakt.html, popis.html, raspored.html
├── style.css
├── slike/
├── WP_2_Amir_Avdic_izvjestaj.pdf
└── ipi-angular/
    └── src/
        ├── app/
        │   ├── auth/
        │   │   ├── login/
        │   │   └── register/
        │   ├── funzone/
        │   ├── app.ts, app.routes.ts, app.config.ts
        │   ├── auth.service.ts
        │   └── firestore.service.ts
        ├── dashboard/
        └── modules/
            ├── bingo/, calendar/, finance/, fitness/, gratitude/
            ├── habit/, kanbanboard/, kviz/, mail/, meal/
            ├── mood/, reflection/, sleep/, study/, tasks/
            ├── visionboard/, water/, whiteboard/
\`\`\`

Login/Register i teme:
Za Login/Register formu koristena je standardna autentifikacija korisnika. 
Registracija je jednostavna svedena na nekoliko osnovnih podataka o korisniku, ime i prezime, emailom, lozinkom i mogucnostima odabira teme. 
Login opcija je tu da pronadje podatke iz registera odnosno da provjeri podatke o korisniku koji su smjesteni u localStorage. 
Projekat posjeduje i AuthGuard zastitu ruta od neautroizovanog pristupa. 
Autmoatski redirect na login ako koristnik nije prijavljen ili nema profil.

O dashboardu:
Prelaskom sa login/register forme dolazimo do glavne stranice aplikacije i njene sustine. Stvari koje korisnik moze prvo uociti jesu, pozdrav u obliku dobar dan/vecer u zavisnosti od vremena kada se prijavi na stranicu i u produzetku tacno ime korisnika sa kojim se prijavio na stranicu. 
U desnom uglu se nalazi tacno vrijeme izrazeno u satima i minutama, mogucnost promijene teme u dark/light mode koje nisam uspio da uskladim ali je to bila ideja. I krajnje desno mogucnost odjave odnosno povratka na login/register formu. 
Ideja cijelog dashboarda je bila da se jednim minimalistickim stilom i jednom jednostavnscu predstave moduli aplikacije. Naravno cilj je bi da bude sto transparetnija stranica da bi korisnici koji ne znaju ili nisu mnogo upuceni u IT uspijeli da se snadju u koristenju iste. Stil stranice se ne mjenja kroz sve module i trakcere, stranica ostaje sa istim stilom i dizjanom kao sto su zlatne trakice ispod headera i pozadine u boji ovisno o tome koju je opciju izabrao koristnik u samoj login formi. Isti stil i izgled koji se na nekin nacin ponavlja citavoj stranici daje na neki nacin ujednacenost i pristupacnost korisniku. Kada korisnik pristupi aplikaciji stil se ne mjenja i ne mora da razmislja gdje je sta smjesteno, sve je jednostavno i slicno. 
Animacije koje su koristene su jednostavne, prelaskom kursora preko odredjenog modula moze se primjetiti animacija brzog prolaska zlatne trakice u headeru koji daje signal korisniku da je kusorom tacno na tom modulu koji zeli. 

Izdvoji bi 2 trakcera koji su mi bili najzanimljivi i koje bi licno ja koristio najvise. 

Tracker Refleksija: Dnevna refleksija je jako vazna za svaku osobu koja zeli da ima uvid o svoji postupcima, desavanjima oko njega. Da na neki nacin uvidi svoje dobre i lose strane.
Izazovi koji te zadese tog dana i planovi za sutra.
Standardna dnevna biljeska sa konkretnim svakodnevnim pitanjima. 

Voda/hidracija: Veoma vazna stavka za mene, kao i za svakog covjeka koji vodi brigu o svom zdravlju. Aplikacija nam kroz odredeni period pruza uvid u naviku unosa tecnosti, pa lakse vidimo koliko zapravo pazimo na hidraciju ili je zapostavljamo.

StudnetFunZone: 
StudentFunZone stranice su zabavnog tipa, radi se o igrama koje poticu korisnika da koristi svoju kreativnost ili znanje u IT oblasti. 

FunZone sacinjavaju sljedece igre:
Bingo | Interaktivna bingo kartica
Kviz | Kviz iz IT znanja
Whiteboard | Digitalna tabla za crtanje
Kanban Board | Organizacija zadataka
Vision Board | Vizualni board ciljeva

Upotreba AI alata: 
AI alate sam koristio za dio vizuelnog stila dinamicke animacije i pomoc oko CSS tema, kako bi stranica izgledala savremenije.








