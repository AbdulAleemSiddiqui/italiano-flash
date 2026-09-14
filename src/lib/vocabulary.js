// Italian vocabulary: hand-curated core words (ids 1-140) + AI-expanded words by difficulty level (1-10).
// Each word: { id, level, italian, english, emoji, example, exampleEn, exampleWords }
// exampleWords: word-by-word translation of the example sentence [italian, english].
import GENERATED from "@/data/vocabulary.json";

const CORE = [
  // Greetings & basics (level 1)
  { id: 1, level: 1, italian: "ciao", english: "hello / bye", example: "Ciao, come stai?", exampleEn: "Hello, how are you?", exampleWords: [["Ciao", "hello"], ["come", "how"], ["stai", "are you"]], emoji: "👋" },
  { id: 2, level: 1, italian: "salve", english: "hello (formal)", example: "Salve, buongiorno!", exampleEn: "Hello, good morning!", exampleWords: [["Salve", "hello"], ["buongiorno", "good morning"]], emoji: "🤝" },
  { id: 3, level: 1, italian: "arrivederci", english: "goodbye", example: "Arrivederci, a domani!", exampleEn: "Goodbye, see you tomorrow!", exampleWords: [["Arrivederci", "goodbye"], ["a", "until"], ["domani", "tomorrow"]], emoji: "👋" },
  { id: 4, level: 1, italian: "buongiorno", english: "good morning", example: "Buongiorno, professore!", exampleEn: "Good morning, professor!", exampleWords: [["Buongiorno", "good morning"], ["professore", "professor"]], emoji: "🌅" },
  { id: 5, level: 1, italian: "buonasera", english: "good evening", example: "Buonasera, signora Rossi.", exampleEn: "Good evening, Mrs. Rossi.", exampleWords: [["Buonasera", "good evening"], ["signora", "Mrs."], ["Rossi", "Rossi"]], emoji: "🌆" },
  { id: 6, level: 1, italian: "buonanotte", english: "good night", example: "Buonanotte, dormi bene.", exampleEn: "Good night, sleep well.", exampleWords: [["Buonanotte", "good night"], ["dormi", "sleep"], ["bene", "well"]], emoji: "🌙" },
  { id: 7, level: 1, italian: "grazie", english: "thank you", example: "Grazie per l'aiuto!", exampleEn: "Thank you for the help!", exampleWords: [["Grazie", "thank you"], ["per", "for"], ["l'aiuto", "the help"]], emoji: "🙏" },
  { id: 8, level: 1, italian: "prego", english: "you're welcome", example: "Prego, non c'è problema.", exampleEn: "You're welcome, no problem.", exampleWords: [["Prego", "you're welcome"], ["non", "not"], ["c'è", "there is"], ["problema", "problem"]], emoji: "😊" },
  { id: 9, level: 1, italian: "scusa", english: "excuse me / sorry", example: "Scusa, dov'è la stazione?", exampleEn: "Excuse me, where is the station?", exampleWords: [["Scusa", "excuse me"], ["dov'è", "where is"], ["la", "the"], ["stazione", "station"]], emoji: "🙇" },
  { id: 10, level: 1, italian: "per favore", english: "please", example: "Un caffè, per favore.", exampleEn: "A coffee, please.", exampleWords: [["Un", "a"], ["caffè", "coffee"], ["per favore", "please"]], emoji: "🥺" },
  { id: 11, level: 1, italian: "sì", english: "yes", example: "Sì, capisco.", exampleEn: "Yes, I understand.", exampleWords: [["Sì", "yes"], ["capisco", "I understand"]], emoji: "✅" },
  { id: 12, level: 1, italian: "no", english: "no", example: "No, non lo so.", exampleEn: "No, I don't know.", exampleWords: [["No", "no"], ["non", "not"], ["lo", "it"], ["so", "I know"]], emoji: "❌" },
  { id: 13, level: 1, italian: "bene", english: "well / good", example: "Sto bene, grazie!", exampleEn: "I'm well, thank you!", exampleWords: [["Sto", "I am"], ["bene", "well"], ["grazie", "thank you"]], emoji: "😄" },
  { id: 14, level: 1, italian: "male", english: "badly / bad", example: "Mi sento male oggi.", exampleEn: "I feel bad today.", exampleWords: [["Mi", "myself"], ["sento", "I feel"], ["male", "bad"], ["oggi", "today"]], emoji: "😞" },

  // People & family (levels 1-2)
  { id: 15, level: 1, italian: "uomo", english: "man", example: "Quell'uomo è mio padre.", exampleEn: "That man is my father.", exampleWords: [["Quell'uomo", "that man"], ["è", "is"], ["mio", "my"], ["padre", "father"]], emoji: "👨" },
  { id: 16, level: 1, italian: "donna", english: "woman", example: "La donna legge un libro.", exampleEn: "The woman reads a book.", exampleWords: [["La", "the"], ["donna", "woman"], ["legge", "reads"], ["un", "a"], ["libro", "book"]], emoji: "👩" },
  { id: 17, level: 1, italian: "bambino", english: "child (m)", example: "Il bambino gioca nel parco.", exampleEn: "The child plays in the park.", exampleWords: [["Il", "the"], ["bambino", "child"], ["gioca", "plays"], ["nel", "in the"], ["parco", "park"]], emoji: "🧒" },
  { id: 18, level: 1, italian: "ragazzo", english: "boy / boyfriend", example: "Il ragazzo è alto.", exampleEn: "The boy is tall.", exampleWords: [["Il", "the"], ["ragazzo", "boy"], ["è", "is"], ["alto", "tall"]], emoji: "👦" },
  { id: 19, level: 1, italian: "ragazza", english: "girl / girlfriend", example: "La ragazza studia italiano.", exampleEn: "The girl studies Italian.", exampleWords: [["La", "the"], ["ragazza", "girl"], ["studia", "studies"], ["italiano", "Italian"]], emoji: "👧" },
  { id: 20, level: 1, italian: "famiglia", english: "family", example: "La mia famiglia è grande.", exampleEn: "My family is big.", exampleWords: [["La mia", "my"], ["famiglia", "family"], ["è", "is"], ["grande", "big"]], emoji: "👨‍👩‍👧‍👦" },
  { id: 21, level: 1, italian: "madre", english: "mother", example: "Mia madre cucina bene.", exampleEn: "My mother cooks well.", exampleWords: [["Mia", "my"], ["madre", "mother"], ["cucina", "cooks"], ["bene", "well"]], emoji: "👩‍👦" },
  { id: 22, level: 1, italian: "padre", english: "father", example: "Mio padre lavora in ufficio.", exampleEn: "My father works in an office.", exampleWords: [["Mio", "my"], ["padre", "father"], ["lavora", "works"], ["in", "in"], ["ufficio", "office"]], emoji: "👨‍👧" },
  { id: 23, level: 2, italian: "figlio", english: "son", example: "Hai un figlio?", exampleEn: "Do you have a son?", exampleWords: [["Hai", "you have"], ["un", "a"], ["figlio", "son"]], emoji: "🧒" },
  { id: 24, level: 2, italian: "figlia", english: "daughter", example: "Mia figlia ha cinque anni.", exampleEn: "My daughter is five years old.", exampleWords: [["Mia", "my"], ["figlia", "daughter"], ["ha", "has"], ["cinque", "five"], ["anni", "years"]], emoji: "👧" },
  { id: 25, level: 1, italian: "fratello", english: "brother", example: "Mio fratello è più grande.", exampleEn: "My brother is older.", exampleWords: [["Mio", "my"], ["fratello", "brother"], ["è", "is"], ["più", "more"], ["grande", "big / older"]], emoji: "👦" },
  { id: 26, level: 1, italian: "sorella", english: "sister", example: "Mia sorella vive a Roma.", exampleEn: "My sister lives in Rome.", exampleWords: [["Mia", "my"], ["sorella", "sister"], ["vive", "lives"], ["a", "in"], ["Roma", "Rome"]], emoji: "👧" },
  { id: 27, level: 1, italian: "amico", english: "friend (m)", example: "Il mio amico si chiama Marco.", exampleEn: "My friend is called Marco.", exampleWords: [["Il mio", "my"], ["amico", "friend"], ["si chiama", "is called"], ["Marco", "Marco"]], emoji: "🧑" },
  { id: 28, level: 1, italian: "nonno", english: "grandfather", example: "Mio nonno ha ottant'anni.", exampleEn: "My grandfather is eighty years old.", exampleWords: [["Mio", "my"], ["nonno", "grandfather"], ["ha", "has"], ["ottant'anni", "eighty years"]], emoji: "👴" },
  { id: 29, level: 1, italian: "nonna", english: "grandmother", example: "Mia nonna fa la pasta.", exampleEn: "My grandmother makes pasta.", exampleWords: [["Mia", "my"], ["nonna", "grandmother"], ["fa", "makes"], ["la", "the"], ["pasta", "pasta"]], emoji: "👵" },

  // Food & drink (levels 1-2)
  { id: 30, level: 1, italian: "pane", english: "bread", example: "Compro il pane dal panettiere.", exampleEn: "I buy bread from the baker.", exampleWords: [["Compro", "I buy"], ["il", "the"], ["pane", "bread"], ["dal", "from the"], ["panettiere", "baker"]], emoji: "🍞" },
  { id: 31, level: 1, italian: "acqua", english: "water", example: "Bevo molta acqua.", exampleEn: "I drink a lot of water.", exampleWords: [["Bevo", "I drink"], ["molta", "a lot of"], ["acqua", "water"]], emoji: "💧" },
  { id: 32, level: 2, italian: "vino", english: "wine", example: "Un bicchiere di vino rosso.", exampleEn: "A glass of red wine.", exampleWords: [["Un", "a"], ["bicchiere", "glass"], ["di", "of"], ["vino", "wine"], ["rosso", "red"]], emoji: "🍷" },
  { id: 33, level: 1, italian: "caffè", english: "coffee", example: "Prendo un caffè al bar.", exampleEn: "I have a coffee at the bar.", exampleWords: [["Prendo", "I have"], ["un", "a"], ["caffè", "coffee"], ["al", "at the"], ["bar", "bar"]], emoji: "☕" },
  { id: 34, level: 1, italian: "latte", english: "milk", example: "Vuoi latte nel caffè?", exampleEn: "Do you want milk in the coffee?", exampleWords: [["Vuoi", "do you want"], ["latte", "milk"], ["nel", "in the"], ["caffè", "coffee"]], emoji: "🥛" },
  { id: 35, level: 2, italian: "formaggio", english: "cheese", example: "Mi piace il formaggio italiano.", exampleEn: "I like Italian cheese.", exampleWords: [["Mi piace", "I like"], ["il", "the"], ["formaggio", "cheese"], ["italiano", "Italian"]], emoji: "🧀" },
  { id: 36, level: 2, italian: "carne", english: "meat", example: "Non mangio la carne.", exampleEn: "I don't eat meat.", exampleWords: [["Non", "not"], ["mangio", "I eat"], ["la", "the"], ["carne", "meat"]], emoji: "🥩" },
  { id: 37, level: 2, italian: "pesce", english: "fish", example: "Stasera mangiamo pesce.", exampleEn: "Tonight we eat fish.", exampleWords: [["Stasera", "tonight"], ["mangiamo", "we eat"], ["pesce", "fish"]], emoji: "🐟" },
  { id: 38, level: 1, italian: "frutta", english: "fruit", example: "La frutta è buona per la salute.", exampleEn: "Fruit is good for your health.", exampleWords: [["La", "the"], ["frutta", "fruit"], ["è", "is"], ["buona", "good"], ["per", "for"], ["la", "the"], ["salute", "health"]], emoji: "🍎" },
  { id: 39, level: 2, italian: "verdura", english: "vegetables", example: "Mangio tanta verdura.", exampleEn: "I eat a lot of vegetables.", exampleWords: [["Mangio", "I eat"], ["tanta", "a lot of"], ["verdura", "vegetables"]], emoji: "🥬" },
  { id: 40, level: 1, italian: "mela", english: "apple", example: "Questa mela è rossa.", exampleEn: "This apple is red.", exampleWords: [["Questa", "this"], ["mela", "apple"], ["è", "is"], ["rossa", "red"]], emoji: "🍎" },
  { id: 41, level: 1, italian: "pomodoro", english: "tomato", example: "Aggiungo il pomodoro alla pasta.", exampleEn: "I add tomato to the pasta.", exampleWords: [["Aggiungo", "I add"], ["il", "the"], ["pomodoro", "tomato"], ["alla", "to the"], ["pasta", "pasta"]], emoji: "🍅" },
  { id: 42, level: 1, italian: "pizza", english: "pizza", example: "La pizza margherita è famosa.", exampleEn: "The margherita pizza is famous.", exampleWords: [["La", "the"], ["pizza", "pizza"], ["margherita", "margherita"], ["è", "is"], ["famosa", "famous"]], emoji: "🍕" },
  { id: 43, level: 1, italian: "pasta", english: "pasta", example: "La pasta è pronta!", exampleEn: "The pasta is ready!", exampleWords: [["La", "the"], ["pasta", "pasta"], ["è", "is"], ["pronta", "ready"]], emoji: "🍝" },
  { id: 44, level: 1, italian: "riso", english: "rice", example: "Mangio riso con verdure.", exampleEn: "I eat rice with vegetables.", exampleWords: [["Mangio", "I eat"], ["riso", "rice"], ["con", "with"], ["verdure", "vegetables"]], emoji: "🍚" },
  { id: 45, level: 2, italian: "uovo", english: "egg", example: "Vorrei un uovo fritto.", exampleEn: "I would like a fried egg.", exampleWords: [["Vorrei", "I would like"], ["un", "a"], ["uovo", "egg"], ["fritto", "fried"]], emoji: "🥚" },
  { id: 46, level: 2, italian: "zucchero", english: "sugar", example: "Un po' di zucchero nel caffè?", exampleEn: "A bit of sugar in the coffee?", exampleWords: [["Un po'", "a bit"], ["di", "of"], ["zucchero", "sugar"], ["nel", "in the"], ["caffè", "coffee"]], emoji: "🧁" },
  { id: 47, level: 2, italian: "sale", english: "salt", example: "Il sale è sulla tavola.", exampleEn: "The salt is on the table.", exampleWords: [["Il", "the"], ["sale", "salt"], ["è", "is"], ["sulla", "on the"], ["tavola", "table"]], emoji: "🧂" },

  // House & objects (level 2)
  { id: 48, level: 1, italian: "casa", english: "house / home", example: "La mia casa è vicino al mare.", exampleEn: "My house is near the sea.", exampleWords: [["La mia", "my"], ["casa", "house"], ["è", "is"], ["vicino", "near"], ["al", "to the"], ["mare", "sea"]], emoji: "🏠" },
  { id: 49, level: 2, italian: "porta", english: "door", example: "Chiudi la porta, per favore.", exampleEn: "Close the door, please.", exampleWords: [["Chiudi", "close"], ["la", "the"], ["porta", "door"], ["per favore", "please"]], emoji: "🚪" },
  { id: 50, level: 2, italian: "finestra", english: "window", example: "La finestra è aperta.", exampleEn: "The window is open.", exampleWords: [["La", "the"], ["finestra", "window"], ["è", "is"], ["aperta", "open"]], emoji: "🪟" },
  { id: 51, level: 2, italian: "cucina", english: "kitchen", example: "La cucina è piccola ma bella.", exampleEn: "The kitchen is small but beautiful.", exampleWords: [["La", "the"], ["cucina", "kitchen"], ["è", "is"], ["piccola", "small"], ["ma", "but"], ["bella", "beautiful"]], emoji: "🍳" },
  { id: 52, level: 2, italian: "camera", english: "room / bedroom", example: "La mia camera è al piano di sopra.", exampleEn: "My room is upstairs.", exampleWords: [["La mia", "my"], ["camera", "room"], ["è", "is"], ["al", "at the"], ["piano", "floor"], ["di sopra", "above"]], emoji: "🛏️" },
  { id: 53, level: 2, italian: "letto", english: "bed", example: "Il letto è molto comodo.", exampleEn: "The bed is very comfortable.", exampleWords: [["Il", "the"], ["letto", "bed"], ["è", "is"], ["molto", "very"], ["comodo", "comfortable"]], emoji: "🛏️" },
  { id: 54, level: 2, italian: "tavolo", english: "table", example: "Il libro è sul tavolo.", exampleEn: "The book is on the table.", exampleWords: [["Il", "the"], ["libro", "book"], ["è", "is"], ["sul", "on the"], ["tavolo", "table"]], emoji: "🪑" },
  { id: 55, level: 2, italian: "sedia", english: "chair", example: "Siediti su questa sedia.", exampleEn: "Sit on this chair.", exampleWords: [["Siediti", "sit down"], ["su", "on"], ["questa", "this"], ["sedia", "chair"]], emoji: "🪑" },
  { id: 56, level: 2, italian: "chiave", english: "key", example: "Hai le chiavi di casa?", exampleEn: "Do you have the house keys?", exampleWords: [["Hai", "you have"], ["le", "the"], ["chiavi", "keys"], ["di", "of"], ["casa", "house"]], emoji: "🔑" },
  { id: 57, level: 1, italian: "libro", english: "book", example: "Questo libro è interessante.", exampleEn: "This book is interesting.", exampleWords: [["Questo", "this"], ["libro", "book"], ["è", "is"], ["interessante", "interesting"]], emoji: "📖" },
  { id: 58, level: 2, italian: "penna", english: "pen", example: "Mi passi la penna?", exampleEn: "Can you pass me the pen?", exampleWords: [["Mi", "me"], ["passi", "you pass"], ["la", "the"], ["penna", "pen"]], emoji: "🖊️" },
  { id: 59, level: 1, italian: "telefono", english: "phone", example: "Il telefono sta suonando.", exampleEn: "The phone is ringing.", exampleWords: [["Il", "the"], ["telefono", "phone"], ["sta", "is"], ["suonando", "ringing"]], emoji: "📱" },
  { id: 60, level: 2, italian: "orologio", english: "watch / clock", example: "L'orologio è nuovo.", exampleEn: "The watch is new.", exampleWords: [["L'", "the"], ["orologio", "watch"], ["è", "is"], ["nuovo", "new"]], emoji: "⌚" },
  { id: 61, level: 2, italian: "borsa", english: "bag", example: "La borsa è sulla sedia.", exampleEn: "The bag is on the chair.", exampleWords: [["La", "the"], ["borsa", "bag"], ["è", "is"], ["sulla", "on the"], ["sedia", "chair"]], emoji: "👜" },
  { id: 62, level: 2, italian: "occhiali", english: "glasses", example: "Non trovo i miei occhiali.", exampleEn: "I can't find my glasses.", exampleWords: [["Non", "not"], ["trovo", "I find"], ["i miei", "my"], ["occhiali", "glasses"]], emoji: "👓" },

  // Common verbs (levels 2-3)
  { id: 63, level: 2, italian: "essere", english: "to be", example: "Io sono italiano.", exampleEn: "I am Italian.", exampleWords: [["Io", "I"], ["sono", "am"], ["italiano", "Italian"]], emoji: "✨" },
  { id: 64, level: 2, italian: "avere", english: "to have", example: "Ho una macchina nuova.", exampleEn: "I have a new car.", exampleWords: [["Ho", "I have"], ["una", "a"], ["macchina", "car"], ["nuova", "new"]], emoji: "🤲" },
  { id: 65, level: 2, italian: "fare", english: "to do / make", example: "Cosa fai stasera?", exampleEn: "What are you doing tonight?", exampleWords: [["Cosa", "what"], ["fai", "you do"], ["stasera", "tonight"]], emoji: "🔨" },
  { id: 66, level: 2, italian: "andare", english: "to go", example: "Vado a scuola.", exampleEn: "I go to school.", exampleWords: [["Vado", "I go"], ["a", "to"], ["scuola", "school"]], emoji: "🚶" },
  { id: 67, level: 2, italian: "mangiare", english: "to eat", example: "Mangiamo una pizza.", exampleEn: "We eat a pizza.", exampleWords: [["Mangiamo", "we eat"], ["una", "a"], ["pizza", "pizza"]], emoji: "🍽️" },
  { id: 68, level: 2, italian: "bere", english: "to drink", example: "Bevo un bicchiere d'acqua.", exampleEn: "I drink a glass of water.", exampleWords: [["Bevo", "I drink"], ["un", "a"], ["bicchiere", "glass"], ["d'acqua", "of water"]], emoji: "🥤" },
  { id: 69, level: 2, italian: "dormire", english: "to sleep", example: "Dormo otto ore ogni notte.", exampleEn: "I sleep eight hours every night.", exampleWords: [["Dormo", "I sleep"], ["otto", "eight"], ["ore", "hours"], ["ogni", "every"], ["notte", "night"]], emoji: "😴" },
  { id: 70, level: 2, italian: "parlare", english: "to speak", example: "Parlo italiano un po'.", exampleEn: "I speak Italian a little.", exampleWords: [["Parlo", "I speak"], ["italiano", "Italian"], ["un po'", "a little"]], emoji: "💬" },
  { id: 71, level: 2, italian: "capire", english: "to understand", example: "Capisco l'italiano.", exampleEn: "I understand Italian.", exampleWords: [["Capisco", "I understand"], ["l'italiano", "Italian"]], emoji: "💡" },
  { id: 72, level: 2, italian: "vedere", english: "to see", example: "Vedo un film.", exampleEn: "I watch a movie.", exampleWords: [["Vedo", "I watch"], ["un", "a"], ["film", "movie"]], emoji: "👀" },
  { id: 73, level: 2, italian: "sentire", english: "to hear / feel", example: "Sento la musica.", exampleEn: "I hear the music.", exampleWords: [["Sento", "I hear"], ["la", "the"], ["musica", "music"]], emoji: "👂" },
  { id: 74, level: 2, italian: "vivere", english: "to live", example: "Vivo a Milano.", exampleEn: "I live in Milan.", exampleWords: [["Vivo", "I live"], ["a", "in"], ["Milano", "Milan"]], emoji: "🏡" },
  { id: 75, level: 2, italian: "studiare", english: "to study", example: "Studio l'italiano ogni giorno.", exampleEn: "I study Italian every day.", exampleWords: [["Studio", "I study"], ["l'italiano", "Italian"], ["ogni", "every"], ["giorno", "day"]], emoji: "📚" },
  { id: 76, level: 2, italian: "lavorare", english: "to work", example: "Lavoro in un ufficio.", exampleEn: "I work in an office.", exampleWords: [["Lavoro", "I work"], ["in", "in"], ["un", "an"], ["ufficio", "office"]], emoji: "💼" },
  { id: 77, level: 2, italian: "comprare", english: "to buy", example: "Compro il pane al supermercato.", exampleEn: "I buy bread at the supermarket.", exampleWords: [["Compro", "I buy"], ["il", "the"], ["pane", "bread"], ["al", "at the"], ["supermercato", "supermarket"]], emoji: "🛒" },
  { id: 78, level: 3, italian: "volere", english: "to want", example: "Voglio un gelato.", exampleEn: "I want an ice cream.", exampleWords: [["Voglio", "I want"], ["un", "an"], ["gelato", "ice cream"]], emoji: "🤩" },
  { id: 79, level: 3, italian: "potere", english: "to be able to", example: "Posso entrare?", exampleEn: "May I come in?", exampleWords: [["Posso", "may I"], ["entrare", "enter"]], emoji: "💪" },
  { id: 80, level: 3, italian: "dovere", english: "must / to have to", example: "Devo studiare.", exampleEn: "I must study.", exampleWords: [["Devo", "I must"], ["studiare", "to study"]], emoji: "📌" },
  { id: 81, level: 3, italian: "sapere", english: "to know", example: "So la risposta.", exampleEn: "I know the answer.", exampleWords: [["So", "I know"], ["la", "the"], ["risposta", "answer"]], emoji: "🧠" },

  // Adjectives (levels 2-3)
  { id: 82, level: 2, italian: "grande", english: "big / great", example: "È una città grande.", exampleEn: "It's a big city.", exampleWords: [["È", "it is"], ["una", "a"], ["città", "city"], ["grande", "big"]], emoji: "🐘" },
  { id: 83, level: 2, italian: "piccolo", english: "small", example: "Ho un gatto piccolo.", exampleEn: "I have a small cat.", exampleWords: [["Ho", "I have"], ["un", "a"], ["gatto", "cat"], ["piccolo", "small"]], emoji: "🐭" },
  { id: 84, level: 2, italian: "bello", english: "beautiful", example: "Che bello!", exampleEn: "How beautiful!", exampleWords: [["Che", "how"], ["bello", "beautiful"]], emoji: "😍" },
  { id: 85, level: 2, italian: "brutto", english: "ugly", example: "Il tempo è brutto oggi.", exampleEn: "The weather is bad today.", exampleWords: [["Il", "the"], ["tempo", "weather"], ["è", "is"], ["brutto", "bad"], ["oggi", "today"]], emoji: "😬" },
  { id: 86, level: 1, italian: "buono", english: "good", example: "Questo cibo è buono.", exampleEn: "This food is good.", exampleWords: [["Questo", "this"], ["cibo", "food"], ["è", "is"], ["buono", "good"]], emoji: "😋" },
  { id: 87, level: 2, italian: "nuovo", english: "new", example: "Ho una bici nuova.", exampleEn: "I have a new bike.", exampleWords: [["Ho", "I have"], ["una", "a"], ["bici", "bike"], ["nuova", "new"]], emoji: "🆕" },
  { id: 88, level: 2, italian: "vecchio", english: "old", example: "Mio nonno è vecchio ma attivo.", exampleEn: "My grandfather is old but active.", exampleWords: [["Mio", "my"], ["nonno", "grandfather"], ["è", "is"], ["vecchio", "old"], ["ma", "but"], ["attivo", "active"]], emoji: "👴" },
  { id: 89, level: 2, italian: "caldo", english: "hot", example: "Oggi fa caldo!", exampleEn: "Today it's hot!", exampleWords: [["Oggi", "today"], ["fa", "it is"], ["caldo", "hot"]], emoji: "🔥" },
  { id: 90, level: 2, italian: "freddo", english: "cold", example: "D'inverno fa freddo.", exampleEn: "In winter it's cold.", exampleWords: [["D'inverno", "in winter"], ["fa", "it is"], ["freddo", "cold"]], emoji: "❄️" },
  { id: 91, level: 2, italian: "felice", english: "happy", example: "Sono molto felice!", exampleEn: "I am very happy!", exampleWords: [["Sono", "I am"], ["molto", "very"], ["felice", "happy"]], emoji: "😄" },
  { id: 92, level: 3, italian: "triste", english: "sad", example: "Il film mi rende triste.", exampleEn: "The movie makes me sad.", exampleWords: [["Il", "the"], ["film", "movie"], ["mi", "me"], ["rende", "makes"], ["triste", "sad"]], emoji: "😢" },
  { id: 93, level: 3, italian: "stanco", english: "tired", example: "Sono stanco dopo il lavoro.", exampleEn: "I am tired after work.", exampleWords: [["Sono", "I am"], ["stanco", "tired"], ["dopo", "after"], ["il", "the"], ["lavoro", "work"]], emoji: "😩" },
  { id: 94, level: 3, italian: "facile", english: "easy", example: "L'italiano è facile?", exampleEn: "Is Italian easy?", exampleWords: [["L'italiano", "Italian"], ["è", "is"], ["facile", "easy"]], emoji: "✨" },
  { id: 95, level: 3, italian: "difficile", english: "difficult", example: "Questo esercizio è difficile.", exampleEn: "This exercise is difficult.", exampleWords: [["Questo", "this"], ["esercizio", "exercise"], ["è", "is"], ["difficile", "difficult"]], emoji: "🤔" },
  { id: 96, level: 3, italian: "importante", english: "important", example: "È importante studiare.", exampleEn: "It's important to study.", exampleWords: [["È", "it is"], ["importante", "important"], ["studiare", "to study"]], emoji: "⭐" },

  // Places (levels 1-3)
  { id: 97, level: 2, italian: "città", english: "city", example: "Roma è una città bellissima.", exampleEn: "Rome is a beautiful city.", exampleWords: [["Roma", "Rome"], ["è", "is"], ["una", "a"], ["città", "city"], ["bellissima", "very beautiful"]], emoji: "🏙️" },
  { id: 98, level: 1, italian: "scuola", english: "school", example: "Vado a scuola alle otto.", exampleEn: "I go to school at eight.", exampleWords: [["Vado", "I go"], ["a", "to"], ["scuola", "school"], ["alle", "at"], ["otto", "eight"]], emoji: "🏫" },
  { id: 99, level: 2, italian: "ristorante", english: "restaurant", example: "Mangiamo al ristorante.", exampleEn: "We eat at the restaurant.", exampleWords: [["Mangiamo", "we eat"], ["al", "at the"], ["ristorante", "restaurant"]], emoji: "🍽️" },
  { id: 100, level: 3, italian: "albergo", english: "hotel", example: "L'albergo è in centro.", exampleEn: "The hotel is in the center.", exampleWords: [["L'albergo", "the hotel"], ["è", "is"], ["in", "in"], ["centro", "center"]], emoji: "🏨" },
  { id: 101, level: 2, italian: "stazione", english: "station", example: "La stazione è vicina.", exampleEn: "The station is near.", exampleWords: [["La", "the"], ["stazione", "station"], ["è", "is"], ["vicina", "near"]], emoji: "🚉" },
  { id: 102, level: 2, italian: "strada", english: "street / road", example: "La strada è lunga.", exampleEn: "The road is long.", exampleWords: [["La", "the"], ["strada", "road"], ["è", "is"], ["lunga", "long"]], emoji: "🛣️" },
  { id: 103, level: 3, italian: "piazza", english: "square (plaza)", example: "La piazza è piena di gente.", exampleEn: "The square is full of people.", exampleWords: [["La", "the"], ["piazza", "square"], ["è", "is"], ["piena", "full"], ["di", "of"], ["gente", "people"]], emoji: "⛲" },
  { id: 104, level: 2, italian: "ufficio", english: "office", example: "Lavoro in ufficio.", exampleEn: "I work in an office.", exampleWords: [["Lavoro", "I work"], ["in", "in"], ["ufficio", "office"]], emoji: "🏢" },
  { id: 105, level: 3, italian: "banca", english: "bank", example: "La banca apre alle nove.", exampleEn: "The bank opens at nine.", exampleWords: [["La", "the"], ["banca", "bank"], ["apre", "opens"], ["alle", "at"], ["nove", "nine"]], emoji: "🏦" },
  { id: 106, level: 3, italian: "farmacia", english: "pharmacy", example: "Cerco una farmacia.", exampleEn: "I'm looking for a pharmacy.", exampleWords: [["Cerco", "I look for"], ["una", "a"], ["farmacia", "pharmacy"]], emoji: "💊" },

  // Time (levels 1-3)
  { id: 107, level: 1, italian: "giorno", english: "day", example: "Che giorno è oggi?", exampleEn: "What day is it today?", exampleWords: [["Che", "what"], ["giorno", "day"], ["è", "is"], ["oggi", "today"]], emoji: "☀️" },
  { id: 108, level: 1, italian: "notte", english: "night", example: "Buonanotte, a domani!", exampleEn: "Good night, see you tomorrow!", exampleWords: [["Buonanotte", "good night"], ["a", "until"], ["domani", "tomorrow"]], emoji: "🌃" },
  { id: 109, level: 2, italian: "mattina", english: "morning", example: "La mattina bevo il caffè.", exampleEn: "In the morning I drink coffee.", exampleWords: [["La mattina", "in the morning"], ["bevo", "I drink"], ["il", "the"], ["caffè", "coffee"]], emoji: "🌄" },
  { id: 110, level: 2, italian: "sera", english: "evening", example: "La sera guardo la TV.", exampleEn: "In the evening I watch TV.", exampleWords: [["La sera", "in the evening"], ["guardo", "I watch"], ["la", "the"], ["TV", "TV"]], emoji: "🌆" },
  { id: 111, level: 1, italian: "oggi", english: "today", example: "Oggi fa bel tempo.", exampleEn: "Today the weather is nice.", exampleWords: [["Oggi", "today"], ["fa", "it is"], ["bel", "nice"], ["tempo", "weather"]], emoji: "📅" },
  { id: 112, level: 1, italian: "domani", english: "tomorrow", example: "Domani vado al cinema.", exampleEn: "Tomorrow I'm going to the cinema.", exampleWords: [["Domani", "tomorrow"], ["vado", "I go"], ["al", "to the"], ["cinema", "cinema"]], emoji: "⏭️" },
  { id: 113, level: 2, italian: "ieri", english: "yesterday", example: "Ieri ho lavorato molto.", exampleEn: "Yesterday I worked a lot.", exampleWords: [["Ieri", "yesterday"], ["ho", "I have"], ["lavorato", "worked"], ["molto", "a lot"]], emoji: "⏮️" },
  { id: 114, level: 2, italian: "settimana", english: "week", example: "Lavoro cinque giorni a settimana.", exampleEn: "I work five days a week.", exampleWords: [["Lavoro", "I work"], ["cinque", "five"], ["giorni", "days"], ["a", "per"], ["settimana", "week"]], emoji: "📆" },
  { id: 115, level: 2, italian: "mese", english: "month", example: "Questo mese ha trenta giorni.", exampleEn: "This month has thirty days.", exampleWords: [["Questo", "this"], ["mese", "month"], ["ha", "has"], ["trenta", "thirty"], ["giorni", "days"]], emoji: "🗓️" },
  { id: 116, level: 2, italian: "anno", english: "year", example: "Quest'anno vado in Italia.", exampleEn: "This year I'm going to Italy.", exampleWords: [["Quest'anno", "this year"], ["vado", "I go"], ["in", "to"], ["Italia", "Italy"]], emoji: "🎉" },
  { id: 117, level: 2, italian: "ora", english: "hour / now", example: "Che ora è?", exampleEn: "What time is it?", exampleWords: [["Che", "what"], ["ora", "time"], ["è", "is"]], emoji: "🕐" },
  { id: 118, level: 3, italian: "tempo", english: "time / weather", example: "Il tempo vola!", exampleEn: "Time flies!", exampleWords: [["Il", "the"], ["tempo", "time"], ["vola", "flies"]], emoji: "⏰" },

  // Nature (levels 1-2)
  { id: 119, level: 1, italian: "sole", english: "sun", example: "Il sole splende oggi.", exampleEn: "The sun is shining today.", exampleWords: [["Il", "the"], ["sole", "sun"], ["splende", "shines"], ["oggi", "today"]], emoji: "☀️" },
  { id: 120, level: 1, italian: "luna", english: "moon", example: "La luna è piena stasera.", exampleEn: "The moon is full tonight.", exampleWords: [["La", "the"], ["luna", "moon"], ["è", "is"], ["piena", "full"], ["stasera", "tonight"]], emoji: "🌕" },
  { id: 121, level: 2, italian: "cielo", english: "sky", example: "Il cielo è azzurro.", exampleEn: "The sky is blue.", exampleWords: [["Il", "the"], ["cielo", "sky"], ["è", "is"], ["azzurro", "blue"]], emoji: "☁️" },
  { id: 122, level: 1, italian: "mare", english: "sea", example: "Andiamo al mare!", exampleEn: "Let's go to the sea!", exampleWords: [["Andiamo", "let's go"], ["al", "to the"], ["mare", "sea"]], emoji: "🌊" },
  { id: 123, level: 2, italian: "montagna", english: "mountain", example: "La montagna è alta.", exampleEn: "The mountain is high.", exampleWords: [["La", "the"], ["montagna", "mountain"], ["è", "is"], ["alta", "high"]], emoji: "⛰️" },
  { id: 124, level: 1, italian: "albero", english: "tree", example: "L'albero è molto vecchio.", exampleEn: "The tree is very old.", exampleWords: [["L'albero", "the tree"], ["è", "is"], ["molto", "very"], ["vecchio", "old"]], emoji: "🌳" },
  { id: 125, level: 1, italian: "fiore", english: "flower", example: "Che bel fiore!", exampleEn: "What a beautiful flower!", exampleWords: [["Che", "what a"], ["bel", "beautiful"], ["fiore", "flower"]], emoji: "🌸" },
  { id: 126, level: 2, italian: "neve", english: "snow", example: "La neve è bianca.", exampleEn: "The snow is white.", exampleWords: [["La", "the"], ["neve", "snow"], ["è", "is"], ["bianca", "white"]], emoji: "❄️" },
  { id: 127, level: 2, italian: "pioggia", english: "rain", example: "La pioggia cade forte.", exampleEn: "The rain falls hard.", exampleWords: [["La", "the"], ["pioggia", "rain"], ["cade", "falls"], ["forte", "hard"]], emoji: "🌧️" },
  { id: 128, level: 2, italian: "vento", english: "wind", example: "Il vento è forte oggi.", exampleEn: "The wind is strong today.", exampleWords: [["Il", "the"], ["vento", "wind"], ["è", "is"], ["forte", "strong"], ["oggi", "today"]], emoji: "💨" },

  // Animals (levels 1-2)
  { id: 129, level: 1, italian: "cane", english: "dog", example: "Il mio cane è fedele.", exampleEn: "My dog is loyal.", exampleWords: [["Il mio", "my"], ["cane", "dog"], ["è", "is"], ["fedele", "loyal"]], emoji: "🐶" },
  { id: 130, level: 1, italian: "gatto", english: "cat", example: "Il gatto dorme sul divano.", exampleEn: "The cat sleeps on the sofa.", exampleWords: [["Il", "the"], ["gatto", "cat"], ["dorme", "sleeps"], ["sul", "on the"], ["divano", "sofa"]], emoji: "🐱" },
  { id: 131, level: 1, italian: "cavallo", english: "horse", example: "Il cavallo corre veloce.", exampleEn: "The horse runs fast.", exampleWords: [["Il", "the"], ["cavallo", "horse"], ["corre", "runs"], ["veloce", "fast"]], emoji: "🐴" },
  { id: 132, level: 2, italian: "uccello", english: "bird", example: "L'uccello canta al mattino.", exampleEn: "The bird sings in the morning.", exampleWords: [["L'uccello", "the bird"], ["canta", "sings"], ["al", "in the"], ["mattino", "morning"]], emoji: "🐦" },

  // Misc common (levels 1-3)
  { id: 133, level: 3, italian: "amore", english: "love", example: "L'amore è importante.", exampleEn: "Love is important.", exampleWords: [["L'amore", "love"], ["è", "is"], ["importante", "important"]], emoji: "❤️" },
  { id: 134, level: 2, italian: "lavoro", english: "work / job", example: "Il mio lavoro è interessante.", exampleEn: "My job is interesting.", exampleWords: [["Il mio", "my"], ["lavoro", "job"], ["è", "is"], ["interessante", "interesting"]], emoji: "💼" },
  { id: 135, level: 1, italian: "macchina", english: "car", example: "La macchina è rossa.", exampleEn: "The car is red.", exampleWords: [["La", "the"], ["macchina", "car"], ["è", "is"], ["rossa", "red"]], emoji: "🚗" },
  { id: 136, level: 1, italian: "treno", english: "train", example: "Il treno arriva alle dieci.", exampleEn: "The train arrives at ten.", exampleWords: [["Il", "the"], ["treno", "train"], ["arriva", "arrives"], ["alle", "at"], ["dieci", "ten"]], emoji: "🚆" },
  { id: 137, level: 2, italian: "aereo", english: "airplane", example: "L'aereo parte alle otto.", exampleEn: "The plane leaves at eight.", exampleWords: [["L'aereo", "the plane"], ["parte", "leaves"], ["alle", "at"], ["otto", "eight"]], emoji: "✈️" },
  { id: 138, level: 2, italian: "soldi", english: "money", example: "Non ho molti soldi.", exampleEn: "I don't have much money.", exampleWords: [["Non", "not"], ["ho", "I have"], ["molti", "many"], ["soldi", "money"]], emoji: "💰" },
  { id: 139, level: 1, italian: "nome", english: "name", example: "Il mio nome è Marco.", exampleEn: "My name is Marco.", exampleWords: [["Il mio", "my"], ["nome", "name"], ["è", "is"], ["Marco", "Marco"]], emoji: "🏷️" },
  { id: 140, level: 3, italian: "gentile", english: "kind", example: "La maestra è gentile.", exampleEn: "The teacher is kind.", exampleWords: [["La", "the"], ["maestra", "teacher"], ["è", "is"], ["gentile", "kind"]], emoji: "💕" },
];

// Merge generated words, dropping duplicates of the core set (and of each other).
const seen = new Set(CORE.map((w) => w.italian.toLowerCase()));
const EXTRA = (GENERATED || []).filter((w) => {
  const key = (w.italian || "").toLowerCase().trim();
  if (!key || seen.has(key)) return false;
  seen.add(key);
  return true;
});

export const VOCABULARY = [...CORE, ...EXTRA];

export function getWordById(id) {
  return VOCABULARY.find((w) => w.id === id);
}

// User level 1-10: one level per ~10% of all words learned.
export function computeUserLevel(totalLearned, totalWords = VOCABULARY.length) {
  const per = Math.ceil(totalWords / 10);
  return Math.min(10, Math.floor(totalLearned / per) + 1);
}

export function wordsToNextLevel(totalLearned, totalWords = VOCABULARY.length) {
  const per = Math.ceil(totalWords / 10);
  if (computeUserLevel(totalLearned, totalWords) >= 10) return 0;
  return per - (totalLearned % per);
}