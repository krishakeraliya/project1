require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../model/question-model');
const connectdb = require('../utils/db');

// We'll create a comprehensive list of questions across categories and difficulties.
const questions = [
  // Quantitative - Easy (10)
  { questionText: 'What is 15% of 200?', options: ['20','25','30','35'], correctAnswer: '30', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'If 5x + 3 = 18, what is x?', options: ['2','3','4','5'], correctAnswer: '3', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is 7 × 8?', options: ['54','56','58','60'], correctAnswer: '56', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is 1/4 of 100?', options: ['20','25','30','35'], correctAnswer: '25', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is the sum of angles in a triangle?', options: ['90°','180°','270°','360°'], correctAnswer: '180°', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is 12 + 15 + 13?', options: ['38','39','40','41'], correctAnswer: '40', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is the square of 9?', options: ['72','81','90','99'], correctAnswer: '81', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'If x + x = 16, what is x?', options: ['4','8','12','16'], correctAnswer: '8', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is 20% of 50?', options: ['5','10','15','20'], correctAnswer: '10', category: 'quantitative', difficulty: 'easy', level: 1 },
  { questionText: 'What is the next number: 2,4,6,8,...?', options: ['9','10','11','12'], correctAnswer: '10', category: 'quantitative', difficulty: 'easy', level: 1 },

  // Quantitative - Medium (10)
  { questionText: 'Solve: (3 × 4) + (5 × 2)', options: ['22','23','24','25'], correctAnswer: '22', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'What is the square root of 144?', options: ['10','11','12','13'], correctAnswer: '12', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'If 3x - 7 = 14, what is x?', options: ['5','6','7','8'], correctAnswer: '7', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'What is 25% of 300?', options: ['65','70','75','80'], correctAnswer: '75', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'Area of rectangle 8 by 6?', options: ['42','44','46','48'], correctAnswer: '48', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'Simplify: 18 ÷ 3 × 2 + 4', options: ['14','16','18','20'], correctAnswer: '16', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'What is 75% of 80?', options: ['55','60','65','70'], correctAnswer: '60', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'If y = 3x + 2 and x = 4, what is y?', options: ['11','12','13','14'], correctAnswer: '14', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'Perimeter of square side 7?', options: ['21','24','28','35'], correctAnswer: '28', category: 'quantitative', difficulty: 'medium', level: 1 },
  { questionText: 'Solve: 5(3 + 2)', options: ['20','25','30','35'], correctAnswer: '25', category: 'quantitative', difficulty: 'medium', level: 1 },

  // Quantitative - Hard (10)
  { questionText: 'If 2^x = 32, what is x?', options: ['4','5','6','7'], correctAnswer: '5', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'Volume of cube with side 4?', options: ['56','60','64','68'], correctAnswer: '64', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'Solve: log10(100)', options: ['1','2','3','4'], correctAnswer: '2', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'What is the value of 3^3?', options: ['21','24','27','30'], correctAnswer: '27', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'If x^2 + 5x + 6 = 0, values of x?', options: ['-3,-2','-2,-3','2,3','3,2'], correctAnswer: '-3,-2', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'Square root of 256?', options: ['14','15','16','17'], correctAnswer: '16', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'Solve: 3x + 7 = 2x - 5', options: ['10','11','12','13'], correctAnswer: '12', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'What is 1.5% of 3000?', options: ['35','40','45','50'], correctAnswer: '45', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'If cos(x) = 0, what is x in degrees?', options: ['45','60','90','180'], correctAnswer: '90', category: 'quantitative', difficulty: 'hard', level: 1 },
  { questionText: 'Value of pi^2 (approx)?', options: ['9.87','9.89','9.86','9.88'], correctAnswer: '9.87', category: 'quantitative', difficulty: 'hard', level: 1 },

  // Logical - Easy (10)
  { questionText: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?', options: ['Yes','No','Only some','Cannot determine'], correctAnswer: 'Yes', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'Find the next in series: 1, 3, 5, 7, ...', options: ['8','9','10','11'], correctAnswer: '9', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'If TOM is coded as 20-15-13, what is CAT?', options: ['3-1-20','2-1-20','3-2-20','None'], correctAnswer: '3-1-20', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'Which shape has 4 equal sides and 4 right angles?', options: ['Rectangle','Square','Rhombus','Parallelogram'], correctAnswer: 'Square', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'If today is Monday, what day will it be after 3 days?', options: ['Thursday','Wednesday','Friday','Tuesday'], correctAnswer: 'Thursday', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'Choose the odd one out: Apple, Banana, Carrot, Mango', options: ['Apple','Banana','Carrot','Mango'], correctAnswer: 'Carrot', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'If 2+2=4 and 4+4=8, then 8+8=?', options: ['14','15','16','17'], correctAnswer: '16', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'Which number does not belong: 2,4,6,9,10', options: ['6','9','4','10'], correctAnswer: '9', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'If A>B and B>C, which is true?', options: ['A>C','C>A','A=B','B>A'], correctAnswer: 'A>C', category: 'logical', difficulty: 'easy', level: 1 },
  { questionText: 'Complete: 3,6,12,24,...', options: ['30','36','48','60'], correctAnswer: '48', category: 'logical', difficulty: 'easy', level: 1 },

  // Logical - Medium (10)
  { questionText: 'If in a code, 725 = DOG, 538 = CAT, what does 758 = ?', options: ['CAG','DAG','DOT','COG'], correctAnswer: 'COG', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'Find missing number: 2,5,10,17,26, ?', options: ['37','38','39','40'], correctAnswer: '37', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'If P -> Q and Q -> R then P -> ?', options: ['R','Q','P','None'], correctAnswer: 'R', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'Which of the following completes the series: J, F, M, A, M, J, ? ', options: ['J','A','S','O'], correctAnswer: 'J', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'If 3 workers take 4 days, how many days will 6 workers take?', options: ['2','3','4','5'], correctAnswer: '2', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'Choose the odd one: 121, 144, 169, 200', options: ['121','144','169','200'], correctAnswer: '200', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'If ALL S are T and some T are U, are some S U?', options: ['Yes','No','Only if all T are U','Cannot determine'], correctAnswer: 'Cannot determine', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'Find next: 1,4,9,16,25,...', options: ['36','30','35','29'], correctAnswer: '36', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'Arrange in logical order: 1) Seed 2) Plant 3) Harvest 4) Water', options: ['1,4,2,3','1,2,4,3','2,1,4,3','1,3,2,4'], correctAnswer: '1,4,2,3', category: 'logical', difficulty: 'medium', level: 1 },
  { questionText: 'If A=1,B=2,...,Z=26, what is sum of CAT?', options: ['24','26','30','33'], correctAnswer: '24', category: 'logical', difficulty: 'medium', level: 1 },

  // Logical - Hard (10)
  { questionText: 'Find the next: 2,3,5,9,17,33,...', options: ['65','67','68','69'], correctAnswer: '65', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'If the day after tomorrow is two days before Thursday, what day is today?', options: ['Saturday','Sunday','Monday','Tuesday'], correctAnswer: 'Tuesday', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'Which statement is false: All roses are flowers; Some flowers fade quickly; Some roses fade quickly?', options: ['First','Second','Third','None'], correctAnswer: 'Second', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'If 7 people sit in a circle, how many ways to arrange?', options: ['720','5040','7200','504'], correctAnswer: '720', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'Solve the sequence rule: a_n = 2a_{n-1} + 1, a1=1; a4 = ?', options: ['15','16','17','18'], correctAnswer: '15', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'Which number replaces ?: 3,8,15,24,35,? ', options: ['48','46','47','49'], correctAnswer: '48', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'If p->q is true and q->r is false, can p->r be true?', options: ['Yes','No','Only if r->p','Cannot say'], correctAnswer: 'Cannot say', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'Find the odd one: 2,3,5,7,11,13,15', options: ['2','11','13','15'], correctAnswer: '15', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'If twelve workers do a job in ten days, how many worker-days needed?', options: ['120','100','110','130'], correctAnswer: '120', category: 'logical', difficulty: 'hard', level: 1 },
  { questionText: 'Which rearrangement makes a meaningful sentence: "books / the / on / table / the"', options: ['the books on the table','books the on the table','on the table the books','the on table books'], correctAnswer: 'the books on the table', category: 'logical', difficulty: 'hard', level: 1 },

  // Verbal - Easy (10)
  { questionText: 'Choose synonym of "happy"', options: ['sad','elated','angry','tired'], correctAnswer: 'elated', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Choose antonym of "optimistic"', options: ['hopeful','pessimistic','cheerful','positive'], correctAnswer: 'pessimistic', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Fill: He ___ to school every day.', options: ['go','goes','going','gone'], correctAnswer: 'goes', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Which is a noun?', options: ['run','quickly','happiness','blue'], correctAnswer: 'happiness', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Choose correct spelling', options: ['recieve','receive','recive','receeve'], correctAnswer: 'receive', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Fill: They ___ playing now.', options: ['is','are','am','be'], correctAnswer: 'are', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Which is an adjective?', options: ['slowly','green','run','happiness'], correctAnswer: 'green', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Choose synonym of "begin"', options: ['start','end','finish','stop'], correctAnswer: 'start', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Fill: I have ____ apple.', options: ['a','an','the','none'], correctAnswer: 'an', category: 'verbal', difficulty: 'easy', level: 1 },
  { questionText: 'Choose antonym of "ancient"', options: ['old','modern','ancient','archaic'], correctAnswer: 'modern', category: 'verbal', difficulty: 'easy', level: 1 },

  // Verbal - Medium (10)
  { questionText: 'Choose correct sentence', options: ['He don\'t like it','He doesn\'t like it','He not like it','He isn\'t like it'], correctAnswer: 'He doesn\'t like it', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Choose synonym of "complex"', options: ['simple','complicated','easy','plain'], correctAnswer: 'complicated', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Fill: She has been ___ since morning.', options: ['wait','waiting','waited','to wait'], correctAnswer: 'waiting', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Which is passive voice for "They built the house"', options: ['The house was built by them','The house built them','They were built the house','Built was the house'], correctAnswer: 'The house was built by them', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Identify the adverb: He ran quickly.', options: ['He','ran','quickly','none'], correctAnswer: 'quickly', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Choose meaning of idiom "break the ice"', options: ['to freeze','to initiate conversation','to break something','to relax'], correctAnswer: 'to initiate conversation', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Fill: If I ___ you, I would apologize.', options: ['am','were','was','be'], correctAnswer: 'were', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Choose correct preposition: He is good ___ math.', options: ['on','in','at','for'], correctAnswer: 'at', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Synonym of "obvious"', options: ['apparent','hidden','obscure','vague'], correctAnswer: 'apparent', category: 'verbal', difficulty: 'medium', level: 1 },
  { questionText: 'Choose correct: Neither of the options ___ correct.', options: ['is','are','were','be'], correctAnswer: 'is', category: 'verbal', difficulty: 'medium', level: 1 },

  // Verbal - Hard (10)
  { questionText: 'Choose the correct sentence (subjunctive): If I ___ king, I would help people.', options: ['am','were','was','be'], correctAnswer: 'were', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Identify the antonym of "ephemeral"', options: ['lasting','short-lived','temporary','brief'], correctAnswer: 'lasting', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Choose correct usage: He insisted that she ___ present.', options: ['be','is','was','were'], correctAnswer: 'be', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'What does "ubiquitous" mean?', options: ['rare','everywhere','unique','hidden'], correctAnswer: 'everywhere', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Choose synonym of "obfuscate"', options: ['clarify','confuse','simplify','explain'], correctAnswer: 'confuse', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Select correct relative clause: The man ___ car was stolen is here.', options: ['whose','who','which','whom'], correctAnswer: 'whose', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Choose correct: It is high time we ___ to work.', options: ['start','started','had started','would start'], correctAnswer: 'started', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Identify the mood: "If I had known..." (subjunctive/indicative/imperative)', options: ['subjunctive','indicative','imperative','conditional'], correctAnswer: 'subjunctive', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Choose correct punctuation use: She said "Hello" ___ left.', options: ['and',',',';','then'], correctAnswer: ',', category: 'verbal', difficulty: 'hard', level: 1 },
  { questionText: 'Which is a gerund: "Swimming is fun" - which word?', options: ['Swimming','is','fun','none'], correctAnswer: 'Swimming', category: 'verbal', difficulty: 'hard', level: 1 },

  // Technical - Easy (10)
  { questionText: 'What does CPU stand for?', options: ['Central Processing Unit','Computer Processing Unit','Central Performance Unit','Control Processing Unit'], correctAnswer: 'Central Processing Unit', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'Which is an input device?', options: ['Monitor','Keyboard','Printer','Speaker'], correctAnswer: 'Keyboard', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'Which protocol is used for web pages?', options: ['FTP','SMTP','HTTP','SSH'], correctAnswer: 'HTTP', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'What does RAM stand for?', options: ['Read Access Memory','Random Access Memory','Run Access Memory','Rapid Access Memory'], correctAnswer: 'Random Access Memory', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'What is binary base?', options: ['2','8','10','16'], correctAnswer: '2', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'Which is a storage device?', options: ['CPU','Hard Drive','Mouse','Monitor'], correctAnswer: 'Hard Drive', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'What is an IP address used for?', options: ['Sending email','Identifying a device on network','Storing files','Running programs'], correctAnswer: 'Identifying a device on network', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'Which is an OS?', options: ['Windows','Chrome','Firefox','Edge'], correctAnswer: 'Windows', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'What is HTML used for?', options: ['Styling','Scripting','Structuring web pages','Database'], correctAnswer: 'Structuring web pages', category: 'technical', difficulty: 'easy', level: 1 },
  { questionText: 'Which device is used to convert digital to analog?', options: ['Modem','Router','Switch','Hub'], correctAnswer: 'Modem', category: 'technical', difficulty: 'easy', level: 1 },

  // Technical - Medium (10)
  { questionText: 'Which database is relational?', options: ['MongoDB','MySQL','Cassandra','Redis'], correctAnswer: 'MySQL', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'What is normalization in DB?', options: ['Reducing redundancy','Increasing redundancy','Speeding queries','Encrypting data'], correctAnswer: 'Reducing redundancy', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'What does REST stand for?', options: ['Representational State Transfer','Remote State Transfer','Representational Server Transfer','Remote Server Transfer'], correctAnswer: 'Representational State Transfer', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'Which is NoSQL DB?', options: ['Postgres','MongoDB','MariaDB','Oracle'], correctAnswer: 'MongoDB', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'What does TCP ensure?', options: ['No connection','Reliable delivery','Fastest delivery','No ordering'], correctAnswer: 'Reliable delivery', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'Which language is strongly typed?', options: ['JavaScript','Python','Java','Bash'], correctAnswer: 'Java', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'What is virtualization?', options: ['Simulating hardware','Installing OS','Running apps','Managing files'], correctAnswer: 'Simulating hardware', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'Which is a container runtime?', options: ['Docker','VirtualBox','Hyper-V','VMware Workstation'], correctAnswer: 'Docker', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'What is load balancing used for?', options: ['Database backups','Distributing traffic','Encrypting data','Logging'], correctAnswer: 'Distributing traffic', category: 'technical', difficulty: 'medium', level: 1 },
  { questionText: 'Which port is default for HTTPS?', options: ['80','21','22','443'], correctAnswer: '443', category: 'technical', difficulty: 'medium', level: 1 },

  // Technical - Hard (10)
  { questionText: 'Which CAP property means availability?', options: ['Consistency','Availability','Partition tolerance','Atomicity'], correctAnswer: 'Availability', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is eventual consistency?', options: ['Immediate consistency','Consistency over time','Never consistent','Always consistent'], correctAnswer: 'Consistency over time', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is a deadlock?', options: ['Two processes waiting forever','Fast process','Multiple threads working','Single-threaded'], correctAnswer: 'Two processes waiting forever', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'Which sorting is O(n log n) average?', options: ['Bubble sort','Insertion sort','Quick sort','Selection sort'], correctAnswer: 'Quick sort', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is ACID in databases?', options: ['Atomicity, Consistency, Isolation, Durability','Availability, Consistency, Isolation, Durability','Atomicity, Concurrency, Isolation, Durability','None'], correctAnswer: 'Atomicity, Consistency, Isolation, Durability', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is sharding?', options: ['Splitting database horizontally','Vertical scaling','Indexing','Caching'], correctAnswer: 'Splitting database horizontally', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is consensus in distributed systems?', options: ['Agreement among nodes','Single node decision','Client-server model','None'], correctAnswer: 'Agreement among nodes', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'Which is a message broker?', options: ['RabbitMQ','MySQL','Nginx','Redis (primary)'], correctAnswer: 'RabbitMQ', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is tail latency?', options: ['Average latency','95th/99th percentile latency','Minimum latency','Median latency'], correctAnswer: '95th/99th percentile latency', category: 'technical', difficulty: 'hard', level: 1 },
  { questionText: 'What is idempotency?', options: ['Operation giving same result when repeated','Operation changing state each time','Unreliable operation','Asynchronous operation'], correctAnswer: 'Operation giving same result when repeated', category: 'technical', difficulty: 'hard', level: 1 },

  // Programming - Easy (10)
  { questionText: 'Which language is primarily used for web styling?', options: ['HTML','CSS','JS','SQL'], correctAnswer: 'CSS', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which is used to run JavaScript in browser?', options: ['V8','SpiderMonkey','Java VM','Both V8 and SpiderMonkey'], correctAnswer: 'Both V8 and SpiderMonkey', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which symbol is used for comments in JS single-line?', options: ['//','/*','<!--','#'], correctAnswer: '//', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which keyword declares a constant in JS?', options: ['let','var','const','static'], correctAnswer: 'const', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'What does SQL stand for?', options: ['Structured Query Language','Simple Query Language','Sequential Query Language','Standard Query Language'], correctAnswer: 'Structured Query Language', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which is not a programming language?', options: ['Python','Java','HTML','Ruby'], correctAnswer: 'HTML', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which loop runs until condition is false?', options: ['for','while','if','switch'], correctAnswer: 'while', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which is used for version control?', options: ['Git','Docker','Jenkins','Kubernetes'], correctAnswer: 'Git', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which data type holds true/false?', options: ['int','string','boolean','char'], correctAnswer: 'boolean', category: 'programming', difficulty: 'easy', level: 1 },
  { questionText: 'Which keyword creates a function in JS?', options: ['function','def','fn','fun'], correctAnswer: 'function', category: 'programming', difficulty: 'easy', level: 1 },

  // Programming - Medium (10)
  { questionText: 'What is closure in JS?', options: ['Function + lexical env','Loop','Variable type','Promise'], correctAnswer: 'Function + lexical env', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'Which is asynchronous in JS?', options: ['setTimeout','for loop','while loop','if statement'], correctAnswer: 'setTimeout', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'What is Big O of binary search?', options: ['O(n)','O(log n)','O(n log n)','O(1)'], correctAnswer: 'O(log n)', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'Which HTTP method is idempotent?', options: ['POST','GET','PATCH','None'], correctAnswer: 'GET', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'What is polymorphism?', options: ['Multiple forms','Single form','No forms','Data type'], correctAnswer: 'Multiple forms', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'Which is a NoSQL DB?', options: ['MongoDB','Postgres','SQLite','Oracle'], correctAnswer: 'MongoDB', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'What is recursion?', options: ['Function calling itself','Looping','Conditional','Variable'], correctAnswer: 'Function calling itself', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'Which HTTP status means created?', options: ['200','201','400','404'], correctAnswer: '201', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'What is event loop?', options: ['JS concurrency model','Database','Scheduler','OS component'], correctAnswer: 'JS concurrency model', category: 'programming', difficulty: 'medium', level: 1 },
  { questionText: 'Which is a package manager for Node.js?', options: ['npm','pip','gem','composer'], correctAnswer: 'npm', category: 'programming', difficulty: 'medium', level: 1 },

  // Programming - Hard (10)
  { questionText: 'Which algorithm is used for shortest path?', options: ['Dijkstra','Bubble Sort','Quick Sort','Merge Sort'], correctAnswer: 'Dijkstra', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'What is tail recursion optimization?', options: ['Optimizing tail recursive calls','Memory leak','Looping overhead','None'], correctAnswer: 'Optimizing tail recursive calls', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'What is CAP theorem?', options: ['Consistency, Availability, Partition tolerance','Cache, Access, Performance','Concurrency, Atomicity, Partition','None'], correctAnswer: 'Consistency, Availability, Partition tolerance', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'Which is NP-complete?', options: ['Traveling Salesman Problem','Binary Search','Merge Sort','Linear Search'], correctAnswer: 'Traveling Salesman Problem', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'What is memoization?', options: ['Caching results of function calls','Recursion','Loop optimization','Sorting'], correctAnswer: 'Caching results of function calls', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'Which protocol is used for secure HTTP?', options: ['HTTP','HTTPS','FTP','SMTP'], correctAnswer: 'HTTPS', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'What is dependency injection?', options: ['Providing dependencies externally','Creating dependencies inside','Hardcoding dependencies','None'], correctAnswer: 'Providing dependencies externally', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'Which is eventual consistency example?', options: ['DNS','Relational DB','Immediate sync','Locking'], correctAnswer: 'DNS', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'What is a race condition?', options: ['Unexpected ordering of operations','Synchronized operation','Safe concurrent program','Debug mode'], correctAnswer: 'Unexpected ordering of operations', category: 'programming', difficulty: 'hard', level: 1 },
  { questionText: 'Which is a garbage collected language?', options: ['C++','Rust','Go','Assembly'], correctAnswer: 'Go', category: 'programming', difficulty: 'hard', level: 1 }
];

async function seed() {
  try {
    await connectdb();
    console.log('Connected to database');

    await Question.deleteMany({});
    console.log('Cleared existing questions');

  const result = await Question.insertMany(questions);
  console.log(`Added ${result.length} questions`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed();