export const LESSON_CONTENT = {
        l1_1: {
                title: "Course Overview & Setup",
                description: "Javascript covers the progression from basic syntax to advanced asynchronous programming, enabling you to build interactive websites and applications. JavaScript is the 'layer of interactivity' that works alongside HTML (structure) and CSS (styling) to bring web pages to life.",
                objectives: ["Syntax & Basics", "Operators", "Control Flow", "Loops & Iteration", "Functions", "Data Structures", "DOM Manipulation & Events", "Intermediate Concepts"],
                code: `// Download and Install
         Install VS Code
         Download the Node File
         Run the Installer of Node

//verify your setup
        node --version    // should be v18+

// Create your File in VS Code
        file>New File

//Write in File
        console.log("Hello World")

//Save this file with a .js extension
        ex. hello.js

Then click on the run button on the top right side of your screen.


`,
                notes: "Every statement must end with a semicolon (;) when written on the same line, though JavaScript often allows omitting it if each instruction is placed on its own separate line.",
                nextLesson: "l1_2"
        },
        l1_2: {
                title: "ES6+: let, const, Arrow Functions",
                description: "Modern JavaScript is the foundation of everything in MERN. This lesson covers the ES6+ syntax you'll use every single day: proper variable declarations, arrow functions, and template literals.",
                objectives: ["Understand var vs let vs const scoping", "Write clean arrow functions", "Use template literals effectively", "Grasp default parameters"],
                code: `// var vs let vs const
var oldWay = "function scoped, avoid";
let mutable = "block scoped, can reassign";
const immutable = "block scoped, no reassign";

// Arrow functions
const greet = (name) => \`Hello, \${name}!\`;
const add = (a, b) => a + b;
const getUser = async (id) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};

// Default parameters
const createUser = (name, role = "student") => ({
  name,
  role,
  createdAt: new Date()
});

// Template literals
const url = \`http://localhost:\${PORT}/api/users/\${userId}\`;`,
                notes: "Always prefer const. Only use let when you need to reassign. Never use var in modern JS — it has confusing scoping rules.",
                nextLesson: "l1_3"
        },
        l1_3: {
                title: "Destructuring & Spread/Rest",
                description: "Destructuring lets you unpack values from arrays and objects cleanly. Spread and rest operators make copying and merging data effortless. These patterns are everywhere in MERN code.",
                objectives: ["Destructure objects and arrays", "Use spread to copy/merge", "Use rest in function parameters", "Apply these in real React and Express patterns"],
                code: `// Object destructuring
const { name, email, password } = req.body;
const { data: { token, user } } = response;

// Array destructuring
const [first, second, ...rest] = items;
const [state, setState] = useState(null); // React!

// Nested destructuring
const { address: { city, zip } } = user;

// Default values in destructuring
const { role = "student", avatar = null } = user;

// Spread — copy and merge objects
const updated = { ...existingUser, role: "admin" };
const merged  = { ...defaults, ...overrides };

// Rest parameters
const log = (level, ...messages) => {
  messages.forEach(msg => console.log(\`[\${level}] \${msg}\`));
};`,
                notes: "Destructuring in function parameters is extremely common in Express controllers: `const { title, description } = req.body` — you'll write this pattern dozens of times.",
                nextLesson: "l1_4"
        },

        l1_4: {
                title: "Promises & async/await",
                description: "Promises and async/await are tools used to handle asynchronous operations, such as fetching data from a server or reading a file, without blocking the main execution thread.",
                objectives: ["Understand Promise States", "Creation & Consumption", "Chaining and Cleanup", "Declaring Async Functions", "Using Await", "Standard Error Handling"],
                code: `// Javascript

//Promises
   const fetchData = new Promise((resolve, reject) => {
         const success = true;
         setTimeout(() => {
                if (success) {
                        resolve("Data received! ✅");
                 } else {
                        reject("Error: Request failed! ❌");
                 }
        }, 2000);
   });
// Consuming the promise
        fetchData
                .then((data) => console.log(data))
                .catch((err) => console.error(err));
  
  
//async/await
          async function getData() {
                try {
                        // Execution pauses here until fetchData resolves
                        const data = await fetchData; 
                        console.log(data);
                    }
                catch (err) {
                                console.error(err);
                }
        }
      
        getData();
        `,
                notes: "Destructuring in function parameters is extremely common in Express controllers: `const { title, description } = req.body` — you'll write this pattern dozens of times.",
                nextLesson: "l1_5"
        },
        l1_5: {
                title: "Array Methods Deep Dive",
                description: "Array methods are built-in functions that allow you to manipulate, iterate, and transform ordered collections of data [1, 2, 3]. A 'deep dive' definition typically categorizes these methods by their behavior: whether they mutate (modify) the original array, return a new array, or return a single value [2, 5].",
                objectives: ["Mutation Methods (Modifies the Original Array)", "Accessor & Transformation Methods (Returns New Data)", "Searching & Testing Methods"
                ],
                code: `// Javascript

// .map() – Transforming Data
        const numbers = [1, 2, 3];
        const doubled = numbers.map(num => num * 2);

// .filter() – Selecting Data
        const prices = [10, 25, 50, 5];
        const expensive = prices.filter(price => price > 20); 

// .reduce() – Aggregating Data
        const cart = [10, 20, 30];
        const total = cart.reduce((acc, curr) => acc + curr, 0);
          
// .find() - Returns the first element that matches a condition.
        const users = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
        const user = users.find(u => u.id === 2);

// .includes(): Checks if an array contains a specific value, returning true or false.
        const colors = ['red', 'blue'];
        console.log(colors.includes('red')); // true

//.reverse()
        const colors = ["red", "green", "blue"];
        colors.reverse(); 
        console.log(colors); // Output: ["blue", "green", "red"]

//.sort()
        // Alphabetical Sort
                const fruits = ["Banana", "Orange", "Apple"];
                fruits.sort();
                console.log(fruits); // Output: ["Apple", "Banana", "Orange"]

        // Numerical Sort (Ascending)
                const numbers = [40, 100, 1, 5];
                numbers.sort((a, b) => a - b);
                console.log(numbers); // Output: [1, 5, 40, 100]

// .reverse() and .sort() both
        // Method 1: Chaining
                const letters = ["b", "a", "c"];
                letters.sort().reverse(); 
                console.log(letters); // Output: ["c", "b", "a"]

        // Method 2: Custom Compare Function (Best for numbers)
                const scores = [10, 5, 80];
                scores.sort((a, b) => b - a);
                console.log(scores); // Output: [80, 10, 5]

// .concat()
        const fruits = ["Apple", "Banana"];
        const veggies = ["Carrot", "Potato"];
        const grains = ["Rice"];

        // Merging multiple arrays
        const food = fruits.concat(veggies, grains);
        console.log(food);        // Output: ["Apple", "Banana", "Carrot", "Potato", "Rice"]

        let hello = "Hello";
        let world = "World";

        // Joining strings with a space in between
                let greeting = hello.concat(" ", world, "!");
                console.log(greeting);  // Output: "Hello World!"
  
//  .some()
        const users = [ { name: "Alice", age: 15 },
                        { name: "Bob", age: 22 },
                        { name: "Charlie", age: 17 }];

        // Checks if AT LEAST ONE user is 18 or older
        const hasAdult = users.some(user => user.age >= 18);
        console.log(hasAdult); // true (because of Bob)

//  .every()
        const users = [{ name: "Alice", age: 15 },
                       { name: "Bob", age: 22 },
                       { name: "Charlie", age: 17 }];

        // Checks if EVERY user is 18 or older
        const allAdults = users.every(user => user.age >= 18);
        console.log(allAdults); // false (because Alice and Charlie are under 18)


.push()         Adds to the end                 [1, 2, 3] → push(4) → [1, 2, 3, 4]
.unshift()      Adds to the beginning           [1, 2, 3] → unshift(0) → [0, 1, 2, 3]
.pop()          Removes from the end            [1, 2, 3] → pop() → [1, 2]
.shift()        Removes from the beginning      [1, 2, 3] → shift() → [2, 3]
.slice()        Returns a portion (new array)   [1, 2, 3, 4].slice(1, 3) → [2, 3] 

.splice()
Remove          arr.splice(1, 1)                Removes 1 item at index 1
Add             arr.splice(2, 0, 'X')           Adds 'X' at index 2
Replace         arr.splice(0, 1, 'Y')           Replaces index 0 with 'Y'
Clear           arr.splice(0)                   Removes everything
`,
                notes: "JavaScript array methods requires understanding mutability (modifying existing arrays) versus immutability (returning new arrays).In JavaScript array manipulation revolve around Higher-Order Functions, which execute a callback function over elements.",
                nextLesson: "l1_6"
        },
        l1_6: {
                title: "Modules: import / export",
                description: "JavaScript modules (introduced in ES6) allow you to break your code into separate, reusable files. They use the export keyword to share code and the import keyword to use that code in other files.",
                objectives: ["The export Statement", "The import Statement", "Key Characteristics"],
                code: `// Javascript

// mathUtils.js (The Module)

                // Exporting a function that takes parameters 'a' and 'b'
                        export function add(a, b) {
                                return a + b;
                        }
                        export const multiply = (x, y) => x * y;

// main.js (The Importer)

                // Import the functions from the module file
                        import { add, multiply } from './mathUtils.js';

                // Pass actual values as parameters when calling the functions
                        console.log(add(5, 10));      // Output: 15
                        console.log(multiply(4, 3));  // Output: 12
                `,
                notes: "Modules always run in Strict Mode automatically, even if you don't declare it.Standard import statements must be at the top of your file. They are resolved before the rest of the code runs.",
                nextLesson: "l1_7"
        },
        l1_7: {
                title: "Interview Quiz Questions - Answers",
                code: `
        Q-1 : What is the output of "10"+20 in Javascript?
                1. 30
                2. "1020"
                3. TypeError
                4. undefined
        A: "1020"

        Q-2 : Which method can be used to convert JSON data to  Javascript object?
                1. JSON.parse()
                2. JSON.stringify()
                3. JSON.toObject()
                4. JSON.toJavaScript()
        A: JSON.parse()

        Q-3 : What does the map() method do?
                1. Modifies each item in an array and returns a new array.
                2. Returns the First element passing a test.
                3. Executes a function for each array element.
                4. Filters elements based on a test and returns a new array.
        A: Modifies each item in an array and returns a new array.

        Q-4 : What will console.log(typeof null) output ?
                1. "null"
                2. "object"
                3. "undefined"
                4. "number"
        A: "object"

        Q-5 : How do you create a new Promise in Javascript?
                1. new Promise()
                2. Promise.create()
                3. Promise.new()
                4. new Async()
        A: new Promise()

        Q-6 : Which of the following is not a valid way to declare a variable in Javascript?
                1. let x = 1;
                2. const x = 1;
                3. var x = 1;
                4. int x = 1;
        A: int x = 1;

        Q-7 : What is the purpose of the Array.reduce() method?
                1. To execute a reducer function on each element of the array,resulting in a single output value.
                2. To check if all elements in an array pass a test.
                3. To loop through an array.
                4. Toreduce the size of an array by half.
        A: To execute a reducer function on each element of the array,resulting in a single output value.

        Q-8 : Which operator is used to check both value and type?
                1. ==
                2. !=
                3. ===
                4. !==
        A: ===

        Q-9 : What will console.log(0.1 + 0.2 == 0.3) output?
                1. true
                2. false
                3. TypeError
                4. undefined
        A: false

        Q-10 : What is the purpose of the splice() method in arrays?
                1. To connect two arrays.
                2. To search for elements.
                3. To add/remove elements from an array.
                4. To slice a portion of the array.
        A: To add/remove elements from an array.

        Q-11 : How can you get the number of miliseconds elapsed since January 1, 1970 ?
                1. Date.getMilliseconds()
                2. Date.now()
                3. new Date().getTime()
                4. new Date().milliseconds()
        A: Date.now()

        Q-12 : What does the this keyword refer to inside an arrow function?
                1. The arraow function itself
                2. The object that called the function
                3. The global object
                4. The parent scope
        A: The parent scope

        Q-13 : What are higher-order functions in Javascript?
                1. Function that operate on other functions.
                2. Functions that are written in uppercase.
                3. Asynchronous functions.
                4. Functions that return other functions.
        A: Function that operate on other functions.

        Q-14 : What is event delegation in JavaScript ?
                1. Triggering an event on multiple elements individually.
                2. Handling an event at a parent element rather than the element itself.
                3. Delegating event handling to the browser.
                4. Scheduling events in the future.
        A: Handling an event at a parent element rather than the element itself.

        Q-15 : Which HTML element <> is used to embed JavaScript?
                1. < javascript >
                2. < js >
                3. < script >
                4. < code >
        A: < script >

        Q-16 : What is the main use of the async keyword in JavaScript ?
                1. To run a function in a seperate thread.
                2. To mark a function as asynchronous.
                3. To speed up code execution.
                4. To avoid using callbacks.
        A: To mark a function as asynchronous.

        Q-17 : What is the output of console.log("2" +2*"2")?
                1. 24
                2. 6
                3. "222"
                4. "42"
        A: "42"

        Q-18 : How can you stop the execution of a setInterval timer?
                1. clearInterval()
                2. clearTimer()
                3. stopInterval()
                4. pauseInterval()
        A: clearInterval()

        Q-19 : What is the correct way to create an object in JavaScript?
                1. var obj = new Object();
                2. var obj = Object.create();
                3. var obj = {};
                4. Both 1 and 3.
        A: Both 1 and 3.

        Q-20 : What will be the result of console.log(!!"false")?
                1. true
                2. false
                3. "false"
                4. null
        A: true

        Q-21 : How do you find yhe minimum of two numbers x and y in JavaScript?
                1. min(x,y)
                2. Math.min(x,y)
                3. Math.minimum(x,y)
                4. x.min(y)
        A: Math.min(x,y)

        Q-22 : Which statement creates a new function in Javascript?
                1. function myFunc() {}
                2. var myFunc = function() {};
                3. var myFunc = new Function();
                4. All of the above.
        A: All of the above.

        Q-23 : What is the use of the finally statement in a try-catch block?
                1. To run code after a try block only if there are no errors.
                2. To execute code whether an exception is thrown or not.
                3. To finalize object cleanup.
                4. To run final checks.
        A: To execute code whether an exception is thrown or not.

        Q-24 : How do you declare a static method in a JavaScript class?
                1. static methodName() {}
                2. methodName() static {}
                3. class.static methodName() {}
                4. method staticName() {}
        A: static methodName() {}

        Q-25 : What is the correct syntax for importing a module in ES6 ?
                1. import myModule from "module.js";
                2. require("module.js");
                3. include myModule from "module.js";
                4. load "module.js"
        A: import myModule from "module.js";
                `,

                nextLesson: "l2_1"
        },

        l2_1: {
                title: "Node.js Core: Modules & fs",
                description: "In Node.js, modules are reusable blocks of code that encapsulate specific functionality, allowing you to organize complex applications into smaller, manageable parts. Core modules are built directly into the Node.js binary, meaning they are available immediately after installation without needing separate downloads via npm.",
                objectives: ["fs", "http", "path", "events", "stream", "os", "url", "querystring", "crypto", "zlib", "child_process", "timers", "dns", "module"],
                code: `// Node JS
1. fs – File System Module
        Definition: The fs module lets you work with the file system. Whether it's reading, writing, updating, or deleting files .

        Example:
                const fs = require('fs');
                // Read a file
                        fs.readFile('example.txt', 'utf8', (err, data) => {
                                if (err) throw err;
                                console.log(data);
                        });
                // Write to a file
                        fs.writeFile('hello.txt', 'Hello World!', (err) => {
                        if (err) throw err;
                        console.log('File created!');
                        });

                //Append to a file
                        const logEntry = \${new Date().toISOString()}: Application started\n;
                         await fs.appendFile('app.log', logEntry, 'utf8');
                            console.log('Log entry added');
                        } catch (err) {           console.error('Error appending to file:', err);
                        }

                //Delete a file
                        const filePath = 'file-to-delete.txt';

                                // Check if file exists before deleting
                                await fs.access(filePath);

                                // Delete the file
                                await fs.unlink(filePath);
                                console.log('File deleted successfully');
                
                //Deleting multiple files
                        const filesToDelete = [
                                'temp1.txt',
                                'temp2.txt',
                                'temp3.txt'
                        ];

                        await Promise.all(
                                filesToDelete.map(file =>
                                fs.unlink(file).catch(err => {
                                if (err.code !== 'ENOENT') {
                                console.error(Error deleting \${file}:, err);
                        }
                        })  )  );
                        console.log('Files deleted successfully');
                
                //Renaming a file
                        const oldPath = 'old-name.txt';
                        const newPath = 'new-name.txt';
                        
                        await fs.access(oldPath);
                        await fs.access(newPath);
                        await fs.rename(oldPath, newPath);
                                console.log('File renamed successfully');
                
2. http – HTTP Module
        Definition: The http module allows you to create a web server and handle HTTP requests/responses without any external libraries.

        Example:
                const http = require('http');
                const server = http.createServer((req, res) => {
                         res.writeHead(200, {'Content-Type': 'text/plain'});
                         res.end('Welcome to Node.js Server!');
                });
                server.listen(3000, () => {
                          console.log('Server running at http://localhost:3000');
                });

3. path – Path Module
        Definition: Working with file and folder paths is made easy with the path module. It’s especially useful when dealing with cross-platform file systems.

        Example:
                const path = require('path');
                const filePath = '/user/data/image.png';
                console.log(path.basename(filePath)); // image.png
                console.log(path.dirname(filePath));  // /user/data
                console.log(path.extname(filePath));  // .png

4. events – Events Module
        Definition: Node.js uses an event-driven architecture. The events module allows you to create and manage custom events.

        Example:
                const EventEmitter = require('events');
                const emitter = new EventEmitter();
                emitter.on('login', (user) => {
                         console.log(\${user} has logged in.);
                });
                emitter.emit('login', 'Amit');
                // Output: Amit has logged in.

5. stream – Stream Module
        Definition: Streams are used for reading or writing data piece by piece, especially useful for large files.

        Example:
                const fs = require('fs');
                const readStream = fs.createReadStream('largefile.txt');
                const writeStream = fs.createWriteStream('output.txt');
                readStream.pipe(writeStream); // Transfers data chunk by chunk

6. os – Operating System Info
        Definition: The os module provides operating system-related utility methods and properties.

        Example:
                const os = require('os');
                console.log('Platform:', os.platform());
                console.log('CPU Cores:', os.cpus().length);
                console.log('Free Memory:', os.freemem());

7. url – URL Utilities
        Definition: The url module provides utilities for URL resolution and parsing.

        Example:
                const { URL } = require('url');
                const myURL = new URL('https://example.com/product?id=123&cat=books');
                console.log(myURL.searchParams.get('id')); 
                // Output: 123

8. querystring – Query Parser (legacy)
        Definition: The querystring module provides utilities for parsing and formatting URL query strings. (Deprecated in favor of URLSearchParams)

        Example:
                const qs = require('querystring');
                console.log(qs.parse('id=10&cat=books'));
                //Output: { id: '10', cat: 'books' }

9. crypto – Cryptography
        Definition: The crypto module provides cryptographic functionality including wrappers for OpenSSL's hash, HMAC, cipher, and decipher functions.

        Example:
                const crypto = require('crypto');
                const hash = crypto.createHash('sha256').update('password').digest('hex');
                console.log(hash);
                // Output: a hexadecimal hash string like
                // e3afed0047b08059d0fada10f400c1e5b1a3... (truncated)

10. zlib – Compression
        Definition: The zlib module provides compression functionality using Gzip and Deflate/Inflate.

        Example:
                const zlib = require('zlib');
                const fs = require('fs');
                fs.createReadStream('file.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('file.txt.gz'));

11. child_process – Run Commands
        Definition: The child_process module allows you to spawn new processes, execute shell commands and communicate with them.

        Example:
                const { exec } = require('child_process');
                exec('ls', (err, stdout) => console.log(stdout));

12. timers – Scheduling
        Definition: Provides functions to execute code after a delay or at intervals (setTimeout, setInterval, etc.).

        Example:
                setTimeout(() => console.log('Executed after 2 seconds'), 2000);
                // After 2 seconds:
                // Output: Executed after 2 seconds

13. dns – DNS Lookup
        Definition: The dns module provides functions to perform DNS queries and resolve domains.

        Exaample:
                const dns = require('dns');
                dns.lookup('nodejs.org', (err, address, family) => {
                        if (err) throw err;
                        console.log('address:', address);
                        console.log('IPv Family:', family);
                });
                dns.resolveMx('gmail.com', (err, addresses) => {
                        if (err) throw err;
                        console.log('MX Records:', addresses);
                });

14. module – Module System
        Definition: The module object represents the current module and provides information about it.

        Example:
                console.log('Module ID:', module.id);
                console.log('Module Filename:', module.filename);
                console.log('Module Loaded:', module.loaded);


`,
                notes: "fs : Saving user data, logs, uploading files, reading configs -- http : Creating REST APIs, handling client-server communication -- path : File uploads, dynamic routing, path management -- events : Notifications, logging, async workflows -- stream : File uploads/downloads, real-time data processing -- os : System stats, dashboards -- url : Query parsing, routing -- querystring : Parsing GET params -- crypto : Password hashing, token generation -- zlib : Compress files or API responses --  child_process :  Scripts, automation --  timers : Time delays, polling -- dns : Building tools that need DNS resolution, diagnostics, email service verification -- module : Deep understanding of how Node loads and caches modules, custom loaders, debugging module trees ",
                nextLesson: "l2_2"
        },
        l2_2: {
                title: "pm & package.json Mastery",
                description: "pm typically stands for Package Manager. The most common ones are [npm (Node Package Manager)] and A package.json file is the blueprint and manifest of your project. It lives in the root directory and serves two primary functions: tracking vital project metadata (like name and version) and managing your project's dependencies and automation scripts.",
                objectives: ["PM  : Dependency Management(node_modules) , Version Control , Task Automation(npm run start or npm run build)", "package.json : Metadata(name, version, and description) , Dependencies , devDependencies , Scripts"],
                code: `// Node JS
      
        To create a package.json file, you can run the following command in your project directory:
               npm init                      : Interactively creates a new package.json file.
               npm init -y                   : Skips the prompts and creates a package.json with default settings.
               npm install <pkg>                  : Installs a package and automatically adds it to your dependencies.
               npm install <pkg> --save-dev       : Installs a package and adds it to your devDependencies.
               Lockfiles (package-lock.json) : Automatically generated to lock down the exact tree of dependencies and sub-dependencies installed. Commit this file to version control to guarantee identical installations across environments.

        Metadata Fields
                The metadata in package.json provides basic information about your project, which is especially useful for open-source packages.

                name       : The name of the package. It must be unique if published on npm.
                version    : The version of the package. Follows semantic versioning (e.g., 1.0.0).
                description: A short description of the package.
                keywords   : An array of keywords for search optimization on npm.
                author     : The author’s name and contact information.
                license    : Defines the license under which the package is distributed (e.g., MIT, ISC).
                repository : The URL to the package’s source code repository.
                        {
                                "name": "my-awesome-project",
                                "version": "1.0.0",
                                "description": "A project to showcase package.json features",
                                "keywords": ["example", "package.json", "guide"],
                                "author": "Kajal Patel",
                                "license": "MIT",
                                "repository": {
                                        "type": "git",
                                        "url": "https://github.com/janedoe/my-awesome-project.git"
                                }
                        }

        Scripts :
                The scripts section allows you to define commands that you can run via npm run.These are commonly used for build processes, testing, linting, and more.
                        "scripts": {
                                "start": "node index.js",
                                "build": "webpack --config webpack.config.js",
                                "test": "jest",
                                "lint": "eslint ."
                        }

        Dependencies :
                dependencies    : Packages required for the application to run in production.
                devDependencies : Packages only needed during development, like testing or build tools.
                        "dependencies": {
                                "express": "^4.17.1",
                                "mongoose": "^5.12.3"
                                },
                        "devDependencies": {
                                "jest": "^26.6.3",
                                "eslint": "^7.22.0"
                                }

        Versioning in Dependencies : 
                ^            : Allows for minor and patch updates, e.g., ^1.0.0 will accept versions up to <2.0.0.
                ~            : Allows only patch updates, e.g., ~1.0.0 will accept versions up to <1.1.0.
                Fixed version: Use an exact version if you don’t want any updates, e.g., 1.0.0.

        
        Peer Dependencies : 
                Peer dependencies specify packages that your package is compatible with but do not install automatically.
                        "peerDependencies": {  "react": "^16.0.0" }

        Engines : 
                The engines field specifies which versions of Node.js or npm your project is compatible with.
                        "engines": {
                                "node": ">=12.0.0",
                                "npm": ">=6.0.0"
                                }

        Configurations : 
                Some tools allow you to define their configurations directly in package.json instead of separate config files. For example:
                        eslintConfig : Configuration for ESLint.
                        jest         : Configuration for Jest.  

                                "eslintConfig": {
                                        "extends": "eslint:recommended",
                                        "rules": {
                                        "no-console": "warn"
                                        }
                                        },
                                "jest": {
                                        "testEnvironment": "node"
                                        }
                                        
        Optional Dependencies :
                optionalDependencies lists packages that your project can operate without. If installation fails, npm continues without error.
                "optionalDependencies": {  "fsevents": "^2.0.0"  }

        Resolutions (Yarn Specific) :
                For projects using Yarn, resolutions allows you to override specific package versions to address dependency conflicts.
                            "resolutions": {  "lodash": "4.17.21"  }

        Workspaces (Monorepo Support) :
                Workspaces are used for managing monorepos, allowing you to manage multiple packages within a single repository.
                             "workspaces": [ "packages/*"  ]
        
        Private Field :

                Setting "private": true in package.json prevents your package from being accidentally published to the npm registry, 
                                   which is helpful for private or internal projects.
                `,
                notes: "package.json Is much more than just a list of dependencies; it’s a configuration hub for your project.Now that you’re equipped with a complete guide, dive into your package.json, optimize it, and make it work for you!",
                nextLesson: "l2_3"
        },
        l2_3: {
                title: "Express Server from Scratch",
                description: "Express.js is an awesome framework, that allows you to set up simple Node.js web servers in little to no time. Those simple web servers can be used to test endpoints, serve the front-end, and even grow to become big back-end servers.",
                objectives: [" Project Initialization", " Dependency Installation", "Server Configuration", "Running the Server"],
                code: `// Node JS

                1. Project Initialization
                   Open your terminal and create a new directory for your project:
                                mkdir my-server
                                cd my-server

                   Initialize the project with a package.json file
                                npm init -y

                2. Dependency Installation
                   Install the express package:
                                npm install express
                                npm install -D nodemon

                3.Server Configuration
                                const express = require('express');
                                const app = express();
                                app.use(express.json()); // So Express know you're using JSON
                                const PORT = 3000;
                                app.get('/', (request, response) => {     return 'Hello World!';         });

                                app.listen(PORT, () => {
                                console.log(Server is running on http://localhost:\${PORT});
                                });

                4.Running the Server
                        Update your package.json to include a start script :
                                "scripts": {
                                           "start": "node server.js",
                                           "dev": "nodemon server.js"
                                           }
                        Start the server using npm :
                                npm run start

                        Open your web browser and navigate to http://localhost:3000 to verify that your server is running.

`,
                notes: "Nowadays you have lots of other options, some even more simple and some far more robust, but Express.js is a very nice tool to have in your kit, as it is now in mine.",
                nextLesson: "l2_4"
        },

        l2_4: {
                title: "REST Routing: GET POST PUT DELETE",
                description: "In Node.js (typically using the Express framework), REST routing maps HTTP methods to specific server actions. REST (Representational State Transfer) is an architectural style for designing networked applications that has become the standard for web services.In Node.js (typically using the Express framework), REST routing maps HTTP methods to specific server actions. Here is a breakdown of the four main methods: GET , POST , PUT , DEL .",
                objectives: ["Client-Server Architecture", "Statelessness", "Cacheability", "Layered System", "Uniform Interface"],
                code: `// Node JS

                Method	        Action	                        Example                 Request Body?
                
                GET	        Retrieve resource(s)	        GET /api/users          No
                POST	        Create a new resource	        POST /api/users         Yes
                PUT	        Update a resource completely	PUT /api/users/123      Yes
                PATCH   	Update a resource partially	PATCH /api/users/123    Yes
                DELETE	        Delete a resource	        DELETE /api/users/123   No


                        const express = require('express');
                        const app = express();
                        app.use(express.json());

                        let users = [
                                        { id: 1, name: 'John Doe', email: 'john@example.com' },
                                        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
                                    ];

                        // GET - Retrieve all users
                                app.get('/api/users', (req, res) => {
                                res.json(users);
                                });

                        // GET - Retrieve a specific user
                        app.get('/api/users/:id', (req, res) => {
                                const user = users.find(u => u.id === parseInt(req.params.id));
                                if (!user) return res.status(404).json({ message: 'User not found' });
                                res.json(user);
                                });

                        // POST - Create a new user
                        app.post('/api/users', (req, res) => {
                                        const newUser = {
                                        id: users.length + 1,
                                        name: req.body.name,
                                        email: req.body.email
                                        };
                                        users.push(newUser);
                                        res.status(201).json(newUser);
                                        });

                        // PUT - Update a user completely
                        app.put('/api/users/:id', (req, res) => {
                                        const user = users.find(u => u.id === parseInt(req.params.id));
                                        if (!user) return res.status(404).json({ message: 'User not found' });

                                        user.name = req.body.name;
                                        user.email = req.body.email;

                                        res.json(user);
                                        });

                        // DELETE - Remove a user
                        app.delete('/api/users/:id', (req, res) => {
                                        const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
                                        if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

                                        const deletedUser = users.splice(userIndex, 1);
                                        res.json(deletedUser[0]);
                                        });

                        app.listen(8080, () => {
                        console.log('REST API server running on port 8080');
                        });

       
`,
                notes: "Unlike SOAP or RPC, REST is not a protocol but an architectural style that leverages existing web standards like HTTP, URI, JSON, and XML. , To read req.body in POST/PUT, you must use app.use(express.json()); ,  Status Codes: -- 200 OK for successful GET/PUT/DELETE.  -- 201 Created for successful POST. -- 404 Not Found if the ID doesn't exist. , Use PATCH if you only want to update part of a resource (like just changing an email) rather than replacing the whole thing. ",
                nextLesson: "l2_5"
        },
        l2_5: {
                title: "Middleware: Built-in & Custom",
                description: "Middleware in Node.js (primarily used with the Express framework) functions as an intermediary layer that processes incoming requests before they reach your final route handler . Each middleware function can perform operations on the request and response objects and decide whether to pass control to the next middleware or end the request-response cycle . All middleware functions have access to three main objects : -- req: The request object (data from the client). -- res: The response object (data to the client). -- next: A function that, when called, passes control to the next middleware in the stack.",
                objectives: ["Built-in Middleware", "Custom Middleware"],
                code: `// Node JS
         
        1. Built-in Middleware
                express.json()          : Parses incoming requests with JSON payloads and populates req.body.
                express.urlencoded()    : Parses incoming requests with URL-encoded payloads.
                express.static('public'): Serves static assets such as images, CSS, and HTML files from a specified folder.

                                const express = require('express');
                                const app = express();
                                app.use(express.json()); // Built-in: parse JSON
                                app.use(express.static('public')); // Built-in: serve static files

        2. Custom Middleware
                A custom middleware must either end the request-response cycle (by sending a response) or call next() to avoid hanging the request
                                const logger = (req, res, next) => {
                                console.log(\${req.method} request to \${req.url});
                                next(); // Pass control to the next function
                                };
                                app.use(logger); // Apply globally to all routes
                
                Example: Simple Authentication
                                const auth = (req, res, next) => {
                                const token = req.headers['authorization'];
                                if (token === 'secret-key') {
                                        next(); // Authorized, proceed to the route
                                        } 
                                else {
                                        res.status(401).send('Unauthorized'); // Stop the cycle here
                                     }
                                };
                                app.get('/dashboard', auth, (req, res) => {
                                                res.send('Welcome to the dashboard!');
                                });
`,
                notes: "Middlewares run in the order they are defined using app.use(). , Multiple middlewares can be passed to a single route as a comma-separated list. , Special middleware with four arguments (err, req, res, next) is used specifically to catch errors in the stack.",
                nextLesson: "l2_6"
        },

        l2_6: {
                title: "JWT Authentication Full Build",
                description: "Building JSON Web Tokens (JWT) provide a stateless authentication mechanism that's compact and self-contained. Unlike session-based authentication, token-based authentication (JWT) doesn't require a server to store session data.  JWTs are self-contained and carry all necessary user information in an encoded string. ",
                objectives: ["Project Setup", "Environment Configuration", "Step by Step of build Auth "],
                code: `// Node JS

                1. Project Setup
                        mkdir jwt-auth && cd jwt-auth
                        npm init -y
                        npm install express jsonwebtoken bcrypt dotenv
                
                2. Environment Configuration
                        JWT_SECRET : A long, random string used to sign and verify tokens.
                        PORT       : The port your server will run on (e.g., 5000).

                3. Step by Step of build Auth

                        // models/User.js
                                const mongoose = require('mongoose');
                                const userSchema = new mongoose.Schema({
                                                username: { type: String, unique: true, required: true },
                                                password: { type: String, required: true },
                                });
                                module.exports = mongoose.model('User', userSchema);
                        
                        // routes/auth.js
                                const express = require('express');
                                const router = express.Router();
                                const User = require('../models/User');
                                const bcrypt = require('bcrypt');
                                const jwt = require('jsonwebtoken');

                                // User registration
                                router.post('/register', async (req, res) => {
                                try {
                                        const { username, password } = req.body;
                                        const hashedPassword = await bcrypt.hash(password, 10);
                                        const user = new User({ username, password: hashedPassword });
                                        await user.save();
                                        res.status(201).json({ message: 'User registered successfully' });
                                } catch (error) {
                                        res.status(500).json({ error: 'Registration failed' });
                                }
                                });

                                // User login
                                router.post('/login', async (req, res) => {
                                try {
                                        const { username, password } = req.body;
                                        const user = await User.findOne({ username });
                                        if (!user) {
                                                return res.status(401).json({ error: 'Authentication failed' });
                                        }
                                        const passwordMatch = await bcrypt.compare(password, user.password);
                                        if (!passwordMatch) {
                                                return res.status(401).json({ error: 'Authentication failed' });
                                        }
                                        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                                               expiresIn: '1h',
                                        });
                                                res.status(200).json({ token });
                                } catch (error) {
                                        res.status(500).json({ error: 'Login failed' });
                                }
                                });
                                module.exports = router;
                        
                        // middleware/authMiddleware.js
                                const jwt = require('jsonwebtoken');
                                function verifyToken(req, res, next) {
                                const token = req.header('Authorization');
                                if (!token) return res.status(401).json({ error: 'Access denied' });
                                        try {
                                                const decoded = jwt.verify(token, 'your-secret-key');
                                                req.userId = decoded.userId;
                                                next();
                                        } catch (error) {
                                                 res.status(401).json({ error: 'Invalid token' });
                                        }
                                };
                                module.exports = verifyToken;

                        // routes/protectedRoute.js
                                const express = require('express');
                                const router = express.Router();
                                const verifyToken = require('../middleware/authMiddleware');
                                // Protected route
                                router.get('/', verifyToken, (req, res) => {
                                           res.status(200).json({ message: 'Protected route accessed' });
                                });
                                module.exports = router;

                        // app.js
                                const express = require('express');
                                const app = express();
                                const authRoutes = require('./routes/auth');
                                const protectedRoute = require('./routes/protectedRoute');
                                app.use(express.json());
                                app.use('/auth', authRoutes);
                                app.use('/protected', protectedRoute);
                                const PORT = process.env.PORT || 3000;
                                app.listen(PORT, () => {
                                           console.log(Server is running on port \${PORT});
                                });

        Start your Node.js application using  "node app.js".

`,
                notes: "Demonstrates a basic implementation of authentication in a Node.js web application using Express.js, MongoDB for storing user data, and JWT for token-based authentication. Remember to replace `’your-secret-key’` with a strong, secret key and consider using environment variables for configuration and security. Additionally, in a production environment, you should use HTTPS to secure communication between the client and server.",
                nextLesson: "l2_7"
        },

        l2_7: {
                title: "Error Handling Patterns",
                description: "Effective error handling in Node.js ensures application stability and provides a better developer experience for debugging.",
                objectives: ["Error-First Callbacks", "Try/Catch with Async/Await", "Centralized Middleware", "Promises (.catch)", "Errors as Values"],
                code: `// Node JS

        Error-First Callbacks       : A traditional pattern where the first argument of a callback function is reserved for an error object.
        Try/Catch with Async/Await  : Modern approach that allows handling both synchronous and asynchronous errors in a clean, readable block.
        Centralized Middleware      : In frameworks like Express, a global middleware handles all application errors in one place.
        Promises (.catch)           : Direct handling of rejected promises using the .catch() method.
        Errors as Values            : An advanced pattern (similar to Go) where functions return an array/tuple containing both the result and error to avoid deep nesting.
        
        Error            TypeDescription                                 Example Cause
        
        TypeError        Operation performed on an incompatible type     Calling a method on null
        ReferenceError   Accessing a variable that is not defined        Using unknownVar
        RangeError       Value is outside the allowed range              new Array(-1)
        SystemError      Low-level OS errors (Node.js specific)          ENOENT (File not found)

                Example :

                const express = require('express');
                const app = express();

                // 1. Operational Error Controller
                app.get('/user/:id', async (req, res, next) => {
                try {
                        const user = await database.findUser(req.params.id);
                        if (!user) {
                        // Manually creating and passing an error to the global handler
                        const err = new Error('User not found');
                        err.statusCode = 404;
                        return next(err);
                        }
                        res.json(user);
                } catch (error) {
                        // Automatically catches database or connection errors
                        next(error); 
                }
                });

                // 2. Centralized Global Error Handler Middleware
                // Must have 4 arguments (err, req, res, next) for Express to recognize it
                app.use((err, req, res, next) => {
                const statusCode = err.statusCode || 500;
                
                // Log error for developers (use tools like Winston or Pino in production)
                console.error([Error]: \${err.message}, err.stack);

                res.status(statusCode).json({
                        status: 'error',
                        message: err.message || 'Internal Server Error',
                        // Only show stack trace in development mode
                        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
                });
                });

                app.listen(3000, () => console.log('Server running on port 3000'));
              

`,
                notes: " Avoid throwing strings or plain objects; use the built-in Error class to preserve stack traces.  Every error should be logged, handled, or propagated up the stack to prevent silent failures.",
                nextLesson: "l2_8"
        },
        l2_8: {
                title: "Interview Quiz Questions - Answers",
                code: `
        Q-1 : What is Node.js commonly used for?
                a) Managing databases
                b) Developing mobile apps
                c) Creating user interfaces
                d) Building server-side applications
        Answer: d
        
        Q-2 : Which statement is true about Node.js?
                a) It is primarily used for desktop applications
                b) It supports multi-threading out of the box
                c) It operates asynchronously and uses an event-driven model
                d) It operates in a synchronous manner only
        Answer: c
        
        Q-3 : Who created Node.js?
                a) Brendan Eich
                b) Tim Berners-Lee
                c) Ryan Dahl
                d) James Gosling
        Answer: c
        
        Q-4 : Node.js is built on which JavaScript engine?
                a) SpiderMonkey
                b) V8
                c) Chakra
                d) JavaScriptCore
        Answer: b

        Q-5 : What is the primary function of the Node.js event loop?
                a) Handling user interface updates
                b) Managing multiple threads of execution
                c) Handling asynchronous tasks without blocking the program
                d) Processing synchronous tasks in order
        Answer: c

        Q-6 : How do you create an HTTP server in Node.js?
                a) startServer()
                b) listenServer()
                c) createServer()
                d) createHttpServer()
        Answer: c

        Q-7 : What language is Node.js written in?
                a) C++
                b) JavaScript
                c) C
                d) All of the mentioned
        Answer: d
        
        Q-8 : What is a callback function in Node.js?
                a) A function passed as an argument to another function, which is then executed after a task is completed
                b) A function that manages asynchronous code execution
                c) A function that runs at the start of the program
                d) A function that outputs data to the console
        Answer: a

        Q-9 : Which package manager is most commonly used with Node.js?
                a) Maven
                b) Composer
                c) npm
                d) pip
        Answer: c
        
        Q-10 : What does npm stand for?
                a) Node Program Module
                b) Node Package Manager
                c) Node Project Management
                d) None of the mentioned
        Answer: b
        
        Q-11 : What is the default port number for a Node.js HTTP server?
                a) 3000
                b) 5000
                c) 443
                d) 8080
        Answer: a

        Q-12 : Which of the following can be used for routing in Node.js with Express?
                a) app.controller()
                b) app.listen()
                c) app.route()
                d) app.get(), app.post(), app.put(), app.delete()
        Answer: d

        Q-13 : Which of the following is an example of a Node.js framework?
                a) React
                b) Angular
                c) Express
                d) Vue
        Answer: c

        Q-14 : What does the res.json() method in Express do?
                a) Redirects to another route
                b) Renders a view
                c) Sends a JSON response to the client
                d) Sets the status code of the response
        Answer: c

        Q-15 : What is the purpose of app.use() in Express.js?
                a) To register middleware that will be applied to incoming requests
                b) To define a route handler
                c) To send a response to the client
                d) To start the server
        Answer: a

        Q-16 : How do you handle errors in Node.js?
                a) By using try-catch blocks
                b) By using try-catch blocks & callback functions
                c) By using event listeners
                d) By using callback functions
        Answer: b

        Q-17 : Which command is used to install a package in Node.js using npm?
                a) npm update
                b) npm get
                c) npm add
                d) npm install
        Answer: d
        
        Q-18 : Which method is used to send a response to the client in a Node.js HTTP server?
                a) res.write()
                b) res.send()
                c) response.write()
                d) response.send()
        Answer: b

        Q-19 : Which keyword is used to export functionality from a Node.js module?
                a) include
                b) export
                c) module.exports
                d) global.exports
        Answer: c

        Q-20 : What is the purpose of the res.status() method in a Node.js HTTP server?
                a) To set the content type of the response
                b) To set the status code of the HTTP response
                c) To log the response to the console
                d) To send the response body
        Answer: b

        Q-21 : Which of the following is a core feature of Node.js?
                a) GUI support
                b) Relational database integration
                c) Multi-threading
                d) Non-blocking I/O
        Answer: d
        
        Q-22 : How can you create a Node.js stream?
                a) By using the buffer module
                b) By using the file system module
                c) By using the stream module
                d) By using the createStream() function
        Answer: c

        Q-23 : What is Node.js primarily designed to handle efficiently?
                a) CSS rendering
                b) High-concurrency I/O operations
                c) Database queries
                d) Synchronous operations
        Answer: b

        Q-24 : What is the primary advantage of Node.js being single-threaded?
                a) It simplifies concurrent request handling through non-blocking I/O
                b) It supports multi-core CPUs by default
                c) It guarantees faster code execution for all operations
                d) It can process CPU-intensive tasks efficiently
        Answer: a

        Q-25 : What does the term “Middleware” in Express.js refer to?
                a) A caching mechanism
                b) A code block that processes requests before reaching the route handler
                c) A frontend tool
                d) A database connection module
        Answer: b

        Q-26 : Which of the following Node.js modules is used for handling file system operations?
                a) url
                b) http
                c) events
                d) fs
        Answer: d

        Q-27 : Which of the following file extensions is commonly used in Node.js applications?
                a) .html
                b) .node
                c) .json
                d) .js
        Answer: d

        Q-28 : What does the global object in Node.js represent?
                a) It logs errors and warnings
                b) It is the top-level object that provides global variables and functions
                c) It manages asynchronous operations
                d) It contains all the environment variables
        Answer: b

        Q-29 : What is the primary role of the Node.js REPL (Read-Eval-Print Loop)?
                a) To start the Node.js application server
                b) To compile JavaScript code into binary
                c) To debug applications
                d) To execute JavaScript code interactively
        Answer: d
        
        Q-30 : Which of the following is true about Node.js modules?
                a) Modules are only used for HTTP requests
                b) Modules are reusable pieces of code
                c) Modules are always built-in
                d) Modules cannot be created by users
        Answer: b

        Q-31 : Which database is commonly paired with Node.js for NoSQL integration?
                a) SQLite
                b) MySQL
                c) MongoDB
                d) PostgreSQL
        Answer: c

        Q-32 : Which of the following shortcut commands is used to kill a process in Node.js?
                a) Ctrl + Z
                b) Ctrl + X
                c) Ctrl + K
                d) Ctrl + C
        Answer: d
        
        Q-33 : What does the console.log() function do in Node.js?
                a) Logs errors to a file
                b) Prints messages to the console
                c) Sends responses to the client
                d) Starts the server
        Answer: b

        Q-34 : What does the ‘require’ keyword in Node.js do?
                a) It calls an API endpoint
                b) It creates a new HTTP request
                c) It defines a new module
                d) It imports external modules or libraries into the current file
        Answer: d

        Q-35 : Which of the following modules is NOT built into Node.js?
                a) axios
                b) os
                c) buffer
                d) path
        Answer: a

        Q-36 : Which of the following is used to handle multiple requests in Node.js without blocking?
                a) Using a synchronous loop
                b) Using callback functions
                c) Using the await keyword
                d) Using a separate thread for each request
        Answer: b
        
        Q-37 : Which of the following is true about the setTimeout() function in Node.js?
                a) It stops the application
                b) It executes the function on the next event loop iteration
                c) It runs the callback function after a specified delay
                d) It runs the callback function immediately
        Answer: c

        Q-38 : How do you handle errors in async/await syntax in Node.js?
                a) Errors are ignored in async operations
                b) With the try…catch block
                c) With the finally statement
                d) Using only callbacks
        Answer: b

        Q-39 : Which technique helps in distributing load across multiple CPU cores in Node.js?
                a) Docker
                b) Node.js Clustering
                c) Multithreading
                d) Load Balancer
        Answer: b

        Q-40 : Which Node.js tool helps monitor application performance in production?
                a) PM2
                b) Babel
                c) Webpack
                d) ESLint
        Answer: a

        Q-41. What does HTTPS ensure for a Node.js application?
                a) Simplifying routing
                b) Real-time communication
                c) Data encryption and secure transmission
                d) Faster database queries
        Answer: c
                `,
                nextLesson: "l3_1"
        },
        l3_1: {
                title: "MongoDB Concepts & Atlas Setup",
                description: "MongoDB is a highly scalable, document-oriented NoSQL database with excellent speed, high availability, and automatic scaling . Instead of rows and columns, it stores data as flexible, JSON-like documents called BSON (Binary JSON) .Benefits of Using MongoDB (Flexible Document Schemas, Widely Supported and Code Native Access, Change-Friendly Design, Easy Horizontal Scale-Out with Sharding, High Performance (Speed), Simple Installation, Cost-Effective, MongoDB has No Joins, No Primary Key Set-Up, MongoDB Uses CAP Theorem) . Disadvantages of Using MongoDB (High Memory Usage, Limited Data Size, Limited Nesting, Not Support Transaction, Duplicates, Indexing ) ",
                objectives: ["Database", "Collection", "Document", "Cluster"],
                code: `// Step-by-Step MongoDB Atlas Setup

        Step 1: Create an AccountGo to MongoDB Atlas and click "Start Free".
                Register using your email or select "Sign up with Google".
                Answer the onboarding questions regarding your project and language, then hit Finish.
        
        Step 2: Deploy a Free ClusterOn the deployment page, select the "Shared" (Free) cluster option and click Create.
                Select a cloud provider (AWS, Google Cloud, or Azure) and a geographic region close to you.
                Name your cluster (or leave the default name) and click Create Deployment.
        
        Step 3: Configure Database AccessGo to the Security tab on the left menu and click Database Access.
                Click "Add New Database User".
                Select Password as the authentication method.
                Create a secure Username and Password (save these to connect to your app).
                Set Database User Privileges (e.g., "Read and write to any database") and click Add User.
        
        Step 4: Configure Network AccessUnder the Security tab, click Network Access.
                Click "Add IP Address".
                Click "Add My Current IP Address" to whitelist your local machine's network.
                Click Finish and Close.

        Step 5: Connect and View DataNavigate to the Database menu, locate your cluster, and click Connect.
                Choose a connection method based on your needs:
                        Drivers         : Copy the connection string to use in your application's code (replace <password> with your database user password).
                        MongoDB Compass : Download the official GUI, open it, and paste the connection string to browse collections visually.
`,
                nextLesson: "l3_2"
        },
        l3_2: {
                title: "Mongoose Schemas & Validation",
                description: "Mongoose is an Object Data Modeling (ODM) library for MongoDB. A schema defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection. Schema validation lets you create validation rules for your fields, such as allowed data types and value ranges.",
                objectives: ["Mongoose Schemas", "Built-in Validation Rules", "Implementation"],
                code: `// MongoDB

        1. Mongoose SchemasA schema maps directly to a MongoDB collection and defines the fields and data types for your documents.
                Permitted SchemaTypes   : Common types include String, Number, Date, Boolean, Array, Buffer, Mixed, Double, Map and ObjectId.
                Implementation          : Use new mongoose.Schema({ ... }) to define fields.
                Models                  : Once a schema is defined, it must be compiled into a Model to interact with the database (CRUD operations).
        
        2. Built-in Validation RulesMongoose provides several out-of-the-box validators that vary by data type:
                All Types       : required (ensures a value is provided).
                Strings         : minLength, maxLength, enum (allowed values), and match (regex).
                Numbers         : min and max.Dates: min and max

        3. Implementation
                const userSchema = new mongoose.Schema({
                                username: {
                                        type: String,
                                        required: [true, 'Username is required'],
                                        minLength: 3
                                },
                                 email: {
                                        type: String,
                                        minLength: 10,
                                        required: true,
                                        lowercase: true
                                },
                                age: {
                                        type: Number,
                                        min: [18, 'Must be at least 18']
                                },
                                role: {
                                        type: String,
                                        enum: ['user', 'admin'],
                                        default: 'user'
                                }
                                });

                const User = mongoose.model('User', userSchema);
        

`,
                notes: "Mongoose validation runs at the application layer as a pre('save') hook. Direct MongoDB updates or insertions (e.g., using updateMany or insertMany with wrong options) can bypass these rules and write invalid data directly to the database unless specifically enforced using MongoDB's backend Schema Validation features. By default, validation does not run on findOneAndUpdate or update queries. You must pass { runValidators: true } in your options object. Validators do not run on undefined values (if a field is optional and omitted, Mongoose skips the validation).  While used in schemas, the unique: true property is a configuration for creating MongoDB indexes, not a built-in validator. It simply tells MongoDB to reject duplicate index entries at the database level.",
                nextLesson: "l3_3"
        },
        l3_3: {
                title: "CRUD: Create , Read , Update & Delete",
                description: "CRUD operations describe the conventions of a user interface that let users view, search, and modify parts of the database. MongoDB documents are modified by connecting to a server, querying the proper documents, and then changing the setting properties before sending the data back to the database to be updated.",
                objectives: ["Create operation", "Read operation", "Update operation", "Delete operation"],
                code: `// CRUD operations:
        
        The create operation is used to insert new documents in the MongoDB database.
        The read operation is used to query a document in the database.
        The update operation is used to modify existing documents in the database.
        The delete operation is used to remove documents from the database.

        1 . Create operation
                db.collection.insertOne()
                db.collection.insertMany()

                        db.RecordsDB.insertOne({
                                name: "Riya",
                                age: "6 years",
                                gender:"female",
                                chipped: true  })

                        db.RecordsDB.insertMany([
                                {
                                name: "Devika",
                                age: "10 years",
                                gender:"female",
                                chipped: true   },
                                {
                                name: "Jay", 
                                age: "24 years",
                                gender:"male", 
                                chipped: false  }])

        2 . Read operations
                db.collection.find()
                db.collection.findOne()
                
                        db.RecordsDB.find()
                        db.RecordsDB.find({"name":"Devika"})   
                                 "find() always returns all document, if multiple documents match the query."
                        db.passengers.findOne({"name":"Devika"})  
                                 "findOne() always returns only the first document, even if multiple documents match the query."

        3 . Update operations
                db.collection.updateOne()
                db.collection.updateMany()
                db.collection.replaceOne()

                        db.RecordsDB.updateOne({name: "Devika"}, {$set:{age: "12"}})
                        db.RecordsDB.updateMany({gender:"female"}, {$set: {age: "15"}})
                        db.RecordsDB.replaceOne({ name: "Devika" },{ name: "Devika Patel", age: 12 },
                                                { upsert: true }  // create if it doesn't exist)

        4. Delete operations
                db.collection.deleteOne()
                db.collection.deleteMany()

                        db.RecordsDB.deleteOne({name:"Riya"})
                        db.RecordsDB.deleteMany({gender:"female"})

                `,
                notes: "MongoDB also has an advantage in providing atomic updates (field level updates), which is more time-consuming in any other document-oriented database.",
                nextLesson: "l3_4"
        },
        l3_4: {
                title: "Population & References",
                description: "Understanding Population and References involves defining how your documents relate to one another . When related data lives in separate collections, store a reference (ObjectId) in one document that points to a document in another collection. Mongoose populate() resolves those references with additional queries - similar to a SQL JOIN, but done in the application layer.",
                code: `// MongoDB

        1. Defining a Reference Field
                const postSchema = new mongoose.Schema({
                        title:   { type: String, required: true },
                        body:    String,
                        author:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                        tags:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
                });
                const Post = mongoose.model('Post', postSchema);
        
        2. Basic populate()
                const post = await Post.findById(postId).populate('author');
                console.log(post.author.username); // resolved User document

                //Selecting Fields During Population
                const post = await Post.findById(postId)
                        .populate('author', 'username email -_id')  // include only username and email
                        .populate('tags', 'name');

                //Populating Nested References
                const post = await Post.findById(postId)
                        .populate({
                        path: 'author',
                        populate: { path: 'company', select: 'name' }  // nested populate
                        });
                console.log(post.author.company.name);

                //Populating in Query Results
                const posts = await Post.find({ published: true })
                        .populate('author', 'username')
                        .limit(20)
                        .sort({ createdAt: -1 });

                //Model.populate() for Post-Query Population
                const posts = await Post.find().lean();
                        await Post.populate(posts, { path: 'author', select: 'username' });

                //Filtering Populated Documents
                const author = await User.findById(userId).populate({
                                path: 'posts',
                                match: { published: true },
                                select: 'title createdAt',
                                options: { sort: { createdAt: -1 }, limit: 5 }
                                });

                //Virtual Population
                const userSchema = new mongoose.Schema({ username: String });
                                        userSchema.virtual('posts', {
                                        ref:         'Post',
                                        localField:  '_id',
                                        foreignField: 'author'
                                        });
                const author = await User.findById(id).populate('posts');

                `,
                notes: "If embedding would result in severe data duplication, the data changes frequently, or you have many-to-many relationships.  If you have one-to-one or one-to-few relationships, read performance is your top priority, and the data rarely changes.",
                nextLesson: "l3_5"
        },
        l3_5: {
                title: "Aggregation Pipeline",
                description: "An Aggregation Pipeline is a multi-stage framework in MongoDB used for processing, transforming, and analyzing documents. Think of it like a factory assembly line: documents enter the pipeline, pass through various 'stages' (machines) that filter or reshape them, and finally emerge as a refined result.",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB

        Pipeline Stages         : Each stage performs a specific operation on input documents and passes the output to the next stage.
        The aggregate Method    : Use db.collection.aggregate([ { <stage1> }, { <stage2> } ]) to run a pipeline.
        Non-Destructive         : By default, pipelines only return results to the cursor and do not modify original documents unless you use stages like $out or $merge.
        
        Common Pipeline Stages
        
        Stage     FunctionSQL                                                                           Equivalent
        
        $match    Filters documents to only those that meet specific criteria.                            WHERE
        $group    Groups documents by a key and performs calculations (sum, average, etc.).               GROUP BY
        $project  Selects, renames, or creates new fields; reshapes the document.                         SELECT
        $sort     Orders documents based on specified fields (1 for asc, -1 for desc).                    ORDER BY
        $limit    Passes only the first \(n\) documents to the next stage.                                LIMIT
        $unwind   Deconstructs an array field from input documents to output a document for each element. N/A
        $lookup   Performs a "left outer join" to combine data from another collection.                   JOIN

        Example : 
                db.orders.aggregate([
                        { $match: { status: "Approved" } },     // 1. Filter approved orders
                        { $group: { 
                                _id: "$category",               // 2. Group by category
                                totalSales:
                                 { $sum: "$amount" }            // 3. Sum the amount field
                                }},
                        { $sort: { totalSales: -1 } }           // 4. Sort by highest sales
                        ])
`,
                notes: "The MongoDB aggregation pipeline is that it automatically reshapes the query to improve its performance. Having said that, here are a few things to consider for optimized query performance. It depends on how the data is stored in the embedded document. If you store a million entries into the embedded document, it will create a performance overhead in stages like $unwind.",
                nextLesson: "l3_6"
        },
        l3_6: {
                title: "Interview Quiz Questions - Answers",
                code: `
        Q-1 : What is MongoDB?
                a) A relational database
                b) A document-oriented NoSQL database
                c) A key-value store
                d) A file storage system
        A: b

        Q-2 : Which of the following language is MongoDB written in?
                a) C
                b) C++
                c) Javascript
                d) All of the mentioned
        A: d

        Q-3 : Which of the following format is supported by MongoDB?
                a) BSON
                b) XML
                c) SQL
                d) All of the mentioned
        A: a

        Q-4 :  Which of the following is true about MongoDB indexes?
                a) They improve query performance
                b) They increase disk usage
                c) They can be created on any field
                d) All of the mentioned"               
        A: d

        Q-5 :  With what feature does MongoDB support a complete backup solution and full deployment monitoring?
                a) MMS
                b) AMS
                c) CMS
                d) DMS
        A: a

        Q-6 :  In MongoDB, what is a “collection”?
                a) A group of tables
                b) A group of documents
                c) A single document
                d) A type of index
        A: b

        Q-7 :  How does MongoDB scale horizontally for load balancing purposes?
                a) Replication
                b) Sharding
                c) Partitioning
                d) None of the mentioned
        A: b

        Q-8 : Which of the following sorting is not supported by MongoDB?
                a) heap
                b) collection
                c) collation
                d) none of the mentioned
        A: c

        Q-9 : What type of data storage does MongoDB use?
                a) Column-based storage
                b) Key-value storage
                c) Relational table storage
                d) Document-based storage
        A: d

        Q-10 : Which of the following is a wide-column store?
                a) Riak
                b) Cassandra
                c) Redis
                d) MongoDB
        A: b

        Q-11 : Which of the following is web-based client software for MongoDB?
                a) BI Studio
                b) Fang of Mongo
                c) Database Master
                d) Mongo3
        A: c

        Q-12 : What command is used to insert a document into a collection in MongoDB?
                a) db.collection.put()
                b) db.collection.add()
                c) db.collection.insertDocument()
                d) db.collection.insertOne()
        A: d

        Q-13 : Which MongoDB command removes all documents from a collection without dropping it?
                a) db.collection.truncate()
                b) db.collection.remove({})
                c) db.collection.delete()
                d) db.collection.drop()
        A: b

        Q-14 : Which of the following tool is similar to the UNIX/Linux top utility?
                a) mongofiles
                b) mongooplog
                c) mongotop
                d) mongosniff
        A: c

        Q-15 :Which of the following network analyzer fully supports MongoDB?
                a) Suricata
                b) Snort
                c) Riakshark
                d) Wireshark
        A: d

        Q-16 : Which command-line utility is used to import content from a JSON, CSV, or TSV.
                a) mongosupport
                b) mongorestore
                c) mongoimport
                d) mongofiles
        A: c

        Q-17 : Which of the following is used for creating a binary export of the contents of a Mongo database?
                a) mongofiles
                b) mongodump
                c) mongoimport
                d) mongosupport
        A: b

        Q-18 :What is the purpose of MongoDB’s replication feature?
                a) To create multiple copies of data for high availability
                b) To improve data consistency in queries
                c) To backup data to external storage
                d) To distribute data across various regions
        A: a

        Q-19 : Which of the following file is not a MongoDB configuration file?
                a) mongodb.conf
                b) mongodb.con
                c) mongod.conf
                d) none of the mentioned
        A: c

        Q-20 : What is the default port for MongoDB?
                a) 3306
                b) 8080
                c) 5432
                d) 27017
        A: d

        Q-21 : Which is the primary daemon process for the MongoDB system?
                a) mongod
                b) mongos
                c) syspathlog
                d) logpath
        A: a

        Q-22 : What file does the mongo shell load and parse on startup?
                a) mongoc.js
                b) mongorc.js
                c) mongo.js
                d) all of the mentioned
        A: b

        Q-23 :  What is a MongoDB “shard”?
                a) An index type that speeds up queries
                b) A type of collection used for caching
                c) A copy of the database used for backup
                d) A smaller part of a larger dataset used to distribute data across multiple servers
        A: d

        Q-24 : Which of the following pipeline is used for aggregation in MongoDB?
                a) knowledge processing
                b) information processing
                c) data processing
                d) none of the mentioned
        A: c

        Q-25 : Which of the following is used to avoid the repetition of data in MongoDB schema?
                a) Cursor
                b) Collectors
                c) DeReferences
                d) References
        A: d

        Q-26 : Which of the following statement is incorrect about documents in MongoDB?
                a) The field names cannot contain the null character
                b) The field names cannot contain the dot (.) character
                c) The field names cannot start with the dollar sign ($) character
                d) None of the mentioned
        A: d

        Q-27 : MongoDB documents are composed of field-and-value pairs and have the following structure?
                a) field1: value1
                b) field1: value1;
                c) field1:; value1
                d) none of the mentioned
        A : a

        Q-28 : Which of the following statements is true about MongoDB’s schema design?
                a) MongoDB only supports simple data types
                b) MongoDB enforces primary keys on all documents
                c) MongoDB requires a fixed schema for all collections
                d) MongoDB collections have no fixed schema, allowing flexible document structures
        A : d

        Q-29 : What does BSON stand for in MongoDB?
                a) Binary JSON
                b) Binary Serialized Object Notation
                c) Basic Standard Object Notation
                d) Binary Structure Object Network
        A : a

        Q-30 : Which of the following best describes MongoDB’s data storage format?
                a) Flat files
                b) JSON-like documents
                c) Key-value pairs
                d) Rows and columns
        A : b
        
        Q-31 : Which of the following command returns quickly and does not impact MongoDB performance?
                a) dbStats
                b) db.stats()
                c) db.serverStatus()
                d) none of the mentioned
        A : c

        Q-32 : Which of the following should be avoided with MongoDB Deployments?
                a) RAID-0
                b) RAID-7
                c) RAID-10
                d) RAID-5
        A : a

        Q-33 : Which of the following is especially important in Sharded Clusters?
                a) NTP
                b) SSD
                c) NSS
                d) STP
        A : a

        Q-34 : Which of the following provides information on the MongoDB instance?
                a) serverInfo
                b) executeStats
                c) queryPlanner
                d) none of the mentioned
        A : a

        Q-35 : Which of the following method is used for managing users?
                a) db.User()
                b) db.superuser()
                c) db.createUser()
                d) none of the mentioned
        A : c

        Q-36 : Which of the following authentication methods is used by default by MongoDB?
                a) LDAP
                b) SCRAM-SHA-1
                c) MONGODB-CR
                d) None of the mentioned
        A : b

        Q-37 : If a .mongorc.js file exists, what file will the mongo shell evaluate before starting?
                a) .mongorc.js
                b) .mongo.js
                c) .mongorc.jscript
                d) all of the mentioned
        A : a

        Q-38 : For which server-side operations does MongoDB support the execution of JavaScript code?
                a) group
                b) mapreduce
                c) where
                d) all of the mentioned
        A : d

        Q-39 : Which of the following database commands is used for the mapreduce function?
                a) redmap
                b) mapReduce
                c) mapperRed
                d) none of the mentioned
        A : b

        Q-40 : Which of the following stages cannot appear multiple times in a pipeline?
                a) $reg
                b) $out
                c) $regex
                d) $match
        A : d

        Q-41 : What type of field does MongoDB support for creating user-defined ascending or descending indexes?
                a) Non Unique
                b) Single
                c) Compound
                d) None of the mentioned
        A : b

        Q-42 : Which of the following methods is used to verify whether MongoDB used index intersection?
                a) explain()
                b) intersect()
                c) analyze()
                d) none of the mentioned
        A : a

        Q-43. Which of the following GeoJSON objects is not supported in MongoDB?
                a) Point
                b) MultiPoint
                c) None of the mentioned
                d) LineString
        A : c

                `,

                nextLesson: "l4_1"
        },
        l4_1: {
                title: "JSX, Components & Props",
                description: "In React, JSX, Components, and Props work together to create modular, dynamic user interfaces. Think of Components as the building blocks, JSX as the blueprint, and Props as the specific data used to customize each block.",
                objectives: ["JSX", "Components", "Props"],
                code: `// React JS
        JSX :
                JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file, making code more readable and maintainable by keeping UI structure and logic together .
                With JSX     : < div>   Hello World    < /div> 
                Without JSX  : React.createElement('h1',null,"HelloWorld")
                               React.createElement('div',null,React.createElement('h1',null,"user")) 
        
        Components :
                Components are independent, reusable pieces of UI. React allows you to split a complex UI into smaller, manageable parts.
                Types :
                        Functional Components : The modern standard. They are just JavaScript functions that return JSX.
                                                Example:
                                                        import React from 'react';
                                                        function Welcome() {
                                                                return < h1>Hello, World!< /h1>;
                                                        }
                                                        export default Welcome;
                        
                        Arrow Functions (ES6) : Many developers prefer the arrow function syntax for conciseness.
                                                Example :
                                                        import React from 'react';
                                                        const Header = ({ title }) => {
                                                                return (
                                                                        < header>
                                                                        < h1>{title}< /h1>
                                                                        < /header>
                                                                );};
                                                        export default Header;

                        Class Components      : An older way to write components using ES6 classes.
                                                Example :
                                                        import React, { Component } from 'react';
                                                        class Counter extends Component {
                                                                constructor(props) {
                                                                        super(props);
                                                                        // Initializing state
                                                                        this.state = {
                                                                        count: 0
                                                                }; }
                                                                // Event handler as an arrow function to avoid manual binding
                                                                increment = () => {
                                                                        this.setState({ count: this.state.count + 1 });
                                                                };
                                                                render() {
                                                                return (
                                                                        < div>
                                                                                < h2>{this.props.title}< /h2>
                                                                                < p>Current Count: {this.state.count}< /p>
                                                                                < button onClick={this.increment}>Add 1< /button>
                                                                        < /div>
                                                                ); } }
                                                        export default Counter;

        Props :
                Props are read-only inputs passed from a parent component to a child component , 
                They allow components to be dynamic and reusable by letting them display different information based on the data received.
                Example :
                        // Child Component
                        function Greeting(props) {
                                 return < h1>Hello, {props.name}!< /h1>;         // Accessing the prop via the props object
                        }
                        // Parent Component
                        const App =()=> {
                                return (
                                < div>
                                < Greeting name="Alice" /> {/* Passing "Alice" as the name prop */}
                                < Greeting name="Bob" />   {/* Reusing the same component with different data */}
                                < /div>
                        );}

                `,
                notes: " JSX : Must return a single root element (often wrapped in a <div> or a Fragment <>...</>) , Use camelCase for attributes (e.g., className instead of class, onClick instead of onclick),Embed JavaScript expressions by wrapping them in curly braces , Component : It names must be capitalized (e.g., <MyComponent />) to distinguish them from standard HTML tags. , Props : -- Immutable: A child component cannot modify the props it receives. -- Unidirectional: Data flow is strictly one-way (parent to child). -- Versatility: You can pass strings, numbers, arrays, objects, and even functions as props.",
                nextLesson: "l4_2"
        },
        l4_2: {
                title: "useState & Controlled Forms",
                description: "In React, Controlled Components are forms where React state is the 'single source of truth.' Instead of the DOM holding the form data, React handles it via the useState hook.",
                objectives: ["Initialize State", "Bind Value", "Handle Changes"],
                code: `// React JS
                
        1. Initialize State : Create a state variable for the input value.
        2. Bind Value       : Set the input’s value prop to the state variable.
        3. Handle Changes   : Update the state using an onChange event handler.

        Example : Single Input
                import React, { useState } from 'react';
                const SimpleForm =()=> {
                        const [name, setName] = useState('');
                        const handleSubmit = (e) => {
                                e.preventDefault(); // Prevents page reload
                                alert(\Submitted Name: \${name});
                        };
                        return (
                                < form onSubmit={handleSubmit}>
                                < label>Name: < /label>
                                < input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                />
                                < button type="submit">Submit< /button>
                                < /form>
                        );
                }
        
        Example : Multiple Inputs 
                import React, { useState } from 'react';
                const MultiInputForm = () => {
                        const [formData, setFormData] = useState({
                                username: '',
                                email: '',
                                isAdmin: false
                                });
                        const handleChange = (event) => {
                                const { name, value, type, checked } = event.target;
                                setFormData((prevData) => ({...prevData,[name]: type === 'checkbox' ? checked : value }));
                        };

                        return (
                                < form>
                                < input
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                />
                                
                                < input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                />

                                < label>
                                        Admin?
                                        < input
                                        name="isAdmin"
                                        type="checkbox"
                                        checked={formData.isAdmin}
                                        onChange={handleChange}
                                        />
                                < /label>
                                < /form>
                        );
                }

                
                `,
                notes: "Never call useState inside loops, conditions, or nested functions , The value prop of the input must always match the state variable , Use an onChange handler to update the state. Without it, the input becomes read-only because the state doesn't change when you type , When using objects for form state, never modify the state directly. Always return a new object using the spread operator (...) , Use event.preventDefault() in the onSubmit handler to prevent the page from refreshing.",
                nextLesson: "l4_3"
        },
        l4_3: {
                title: "useEffect & Data Fetching",
                description: "Using useEffect for data fetching is a fundamental React pattern. Here are concise instruction notes and a clean example to get you started.",
                objectives: ["The Trigger", "The State", "Cleanup"],
                code: `// React JS

        The Trigger  : Use an empty dependency array [] to fetch data only once when the component mounts.
        The State    : You usually need three states: data (for the results), loading (for the spinner), and error (for failures).
        Cleanup      : Always use a "cleanup function" or a flag to prevent memory leaks if the component unmounts before the fetch finishes.
        
        Example :
                import React, { useState, useEffect } from 'react';

                const Counter =()=> {
                        const [count, setCount] = useState(0);

                        // Runs after every render where 'count' has changed
                        useEffect(() => {
                                document.title = You clicked \${count} times;
                        }, [count]); // Dependency array: only re-run if 'count' changes

                        return (
                                < div>
                                < p>Count: {count}< /p>
                                < button onClick={() => setCount(count + 1)}>
                                        Increment Count
                                < /button>
                                < /div>
                        );
                }
                export default Counter;
                
                `,
                notes: "useEffect cannot be an asynchronous function itself because it must return either nothing or a cleanup function. Define the async function inside the hook.",
                nextLesson: "l4_4"
        },
        l4_4: {
                title: "React Router v6",
                description: "React as a Single Page Application (SPA) which allows content to be rendered faster without the page being refreshed.",
                objectives: ["Create multiple components", "Define routes", "Use Link to navigate to routes"],
                code: `// React JS
        Install React Router
                npm install react-router-dom

        index.js
                import React from 'react';
                import ReactDOM from 'react-dom';
                import './index.css';
                import App from './App';
                import { BrowserRouter } from "react-router-dom";

                ReactDOM.render(
                        < BrowserRouter>
                        < App />
                        < /BrowserRouter>,
                document.getElementById("root")
                );

1 . Create multiple components
        Home.js
                const Home =()=> {
                        return (
                                < div>
                                < h1>This is the home page< /h1>
                                < /div>
                        );
                }
                export default Home;

        About.js
                import React from 'react'
                const About =() => {
                        return (
                                < div>
                                < h1>This is the about page< /h1>
                                < /div>
                        )
                }
                export default About;
                
        Contact.js
                import React from 'react'
                const Contact() {
                        return (
                                < div>
                                < h1>This is the contact page< /h1>
                                < /div>
                        )
                }
                export default Contact;

2 . Define routes
        App.js
                import { Routes, Route } from "react-router-dom"
                import Home from "./Home"
                import About from "./About"
                import Contact from "./Contact"

                const App=()=> {
                        return (
                                < div className="App">
                                < Routes>
                                        < Route path="/" element={ < Home/> } />
                                        < Route path="about" element={ < About/> } />
                                        < Route path="contact" element={ < Contact/> } />
                                < /Routes>
                                < /div>
                        )
                }
                export default App

3 . Use Link to navigate to routes
        Main.js
                import { Link } from "react-router-dom";
                const Main =()=> {
                        return (
                                < div>
                                < h1>This is the home page< /h1>
                                < Link to="about">Click to view our about page< /Link>
                                < Link to="contact">Click to view our contact page< /Link>
                                < /div>
                                );
                        }
                export default Main;


                `,
                notes: "You can use useNavigate to push users to various pages, and you can use useLocation to get the current URL. : Newer versions support createBrowserRouter and RouterProvider for more advanced features like data loaders and actions.",
                nextLesson: "l4_5"
        },
        l4_5: {
                title: "Context API: Global State",
                description: "The Context API is React's built-in way to share data across your entire component tree without 'prop drilling' (passing props through every level).",
                objectives: ["Create the Context ", "Wrap your App ", "Consume the State"],
                code: `// React JS
        1. Create the Context
                Create a file (e.g., AppContext.js) to define your state and the provider.
                        import { createContext, useState } from 'react';
                        // 1. Initialize the context
                        export const AppContext = createContext();
                        // 2. Create a Provider component
                        export const AppProvider = ({ children }) => {
                                const [user, setUser] = useState("Guest");
                                const logout = () => setUser(null);
                                return (
                                        < AppContext.Provider value={{ user, setUser, logout }}>
                                        {children}
                                        < /AppContext.Provider>
                                );
                        };
        2. Wrap your App
                Wrap your top-level component (usually index.js or App.js) so everything inside can access the data.
                        import { AppProvider } from './AppContext';
                        const App =()=> {
                        return (
                                < AppProvider>
                                        < Navbar />
                                        < Profile />
                                < /AppProvider>
                                );
                        }
        3. Consume the State
                Use the useContext hook in any child component to grab the data.
                        import { useContext } from 'react';
                        import { AppContext } from './AppContext';
                        const Profile = () => {
                                // Pull exactly what you need from the context
                                const { user, logout } = useContext(AppContext);
                                return (
                                        < div>
                                                < h1>Welcome, {user}!< /h1>
                                                < button onClick={logout}>Logout< /button>
                                        < /div>
                                        );
                        };
        
                `,
                notes: "--- When to use?: For global data like UI themes (Dark/Light), user authentication, or preferred language.---When to avoid?: For highly frequent state changes (like a fast-typing input field), as it triggers a re-render of all consumers. Use local state for that!",
                nextLesson: "l4_6"
        },
        l4_6: {
                title: "Custom Hooks",
                description: "A custom hook is a JavaScript function that starts with use and internally calls other hooks like useState, useEffect, or useContext. It allows developers to extract reusable logic, keeping components clean and modular.",
                code: `// React JS
        
1 . Custom Hook for Fetching Data

        import { useState, useEffect } from 'react';
        const useFetch=(url)=> {
                const [data, setData] = useState(null);
                const [loading, setLoading] = useState(true);
                useEffect(() => {
                        fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                                setData(data);
                                setLoading(false);
                        });
                }, [url]);
                return { data, loading };
        }
        const DataComponent =()=> {
                const { data, loading } = useFetch("https://jsonplaceholder.typicode.com/todos/1");
                return (
                        < div>
                        {loading ? < p>Loading...< /p> : < p>Data: {JSON.stringify(data)}< /p>}
                        < /div>
                );
        }
        export default DataComponent;

2. Custom Hook for the Save Button with Online/Offline Status
        
        import useOnlineStatus from './useOnlineStatus';
        export default const SaveButton =() => {
                         const isOnline = useOnlineStatus();
                        function handleSaveClick() {
                                console.log('✅ Progress saved');
                        }
                        return (
                                < button disabled={!isOnline} onClick={handleSaveClick}>
                                {isOnline ? 'Save progress' : 'Reconnecting...'}
                                < /button>
                        );
        }
        `,
                notes: " Custom Hooks must start with the prefix use (e.g., useFetch, useAuth) , They should only contain logic and state management, returning data or functions instead of JSX , Unlike a global store, every time you use a custom Hook, all state and effects inside it are completely isolated for that specific component , A custom Hook is essentially a function that calls other Hooks .",
                nextLesson: "l4_7"
        },
        l4_7: {
                title: "Project: Task UI",
                description: "A Task UI in React typically consists of a Header, an Input Form for new tasks, and a Task List that renders individual task items. ",
                objectives: ["State Management", "CRUD Operations", "Styling Options (Tailwind CSS ,Material UI (MUI))", "Advanced Features (Drag and Drop ,Local Storage ,Filtering)"],
                code: `// React JS

        import React, { useState } from 'react';

        const TaskApp =()=> {
                const [tasks, setTasks] = useState([]);
                const [input, setInput] = useState('');
                const addTask = () => {
                        if (input.trim()) {
                          setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
                          setInput('');
                        }
                };
                const toggleComplete = (id) => {
                        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
                };
                const deleteTask = (id) => {
                        setTasks(tasks.filter(t => t.id !== id));
                };
                return (
                        < div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
                                < h2>Task Manager< /h2>
                                < div style={{ marginBottom: '10px' }}>
                                        < input 
                                        value={input} 
                                        onChange={(e) => setInput(e.target.value)} 
                                        placeholder="New task..." 
                                        />
                                        < button onClick={addTask}>  Add  < /button>
                                < /div>
                                < ul style={{ listStyle: 'none', padding: 0 }}>
                                        {tasks.map(task => (
                                                < li key={task.id} style={{ display: 'flex', 
                                                                justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        < span  onClick={() => toggleComplete(task.id)}
                                                                style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }} >
                                                                {task.text}
                                                        < /span>
                                                        < button onClick={() => deleteTask(task.id)}>  Delete  < /button>
                                                < /li>
                                                ))
                                        }
                                < /ul>
                        < /div>
                );
        }
        export default TaskApp;
                `,
                nextLesson: "l5_1"
        },
        l5_1: {
                title: "Axios with Interceptors",
                description: "Axios interceptors are global functions that 'intercept' HTTP requests or responses before they reach their final destination. They are crucial for tasks like automatically attaching JWT (JSON Web Tokens) to requests or handling global errors like 401 Unauthorized.",
                objectives: ["Authentication", "Token Refreshing", "Global Error Handling"],
                code: `// Full-Stack

    axios.interceptors.request.use(
      request => {
        if (localResponse) {
              throw {
                        isLocal: true, data: { hello: 'world' 
               } 
                        }; // <- this will stop request and trigger response error. I want to trigger the actual response callback
        } else {
            return request;   // <- will perform full request
        }
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        return response; // <- I want to trigger this callback
      },
      error => { // <- so far i can only trigger a response error
        if (error?.isLocal) { 
          return Promise.resolve(error.data); 
        }
        
        return Promise.reject(error);
      }
    );
                `,
                notes: " Always use axios.create() so your interceptors don't affect third-party API calls you might make elsewhere in your app.If you need to stop an interceptor (e.g., during logout), use the eject method to prevent memory leaks or unintended behavior.",
                nextLesson: "l5_2"
        },
        l5_2: {
                title: "Auth Flow: Register → Login → JWT (Json Web Token)",
                description: "MongoDB, Express, React, and Node.js are the components of the MERN stack . The MERN stack enables programmers to create dependable web applications with strong capabilities. Yet, security should be a key concern with any web application. since it includes all of the technologies needed to create a cutting-edge, scalable online application.In a MERN stack, the authentication flow uses JSON Web Tokens (JWT) to maintain stateless user sessions. The process involves registering a user, verifying credentials during login, and then using a signed token for subsequent authorized requests.",
                objectives: ["JWT - based user authentication", "JWT - based user authorization"],
                code: `// Full-Stack
Authentication :
Verifying a user's or an entity's identity is the process called Authentication. It entails validating the user's credentials, 
such as a username and password, to ensure that the user is who they claim to be.

Authorization :
The process of authorizing or refusing access to particular resources or functions within an application is known as Authorization.
Once a user has been verified as authentic, the program checks their level of authorization to decide which areas of the application they can access.

Stage           Key TechnologyMain              Action
Register        bcrypt                          Hash password and store in MongoDB.
Login           jsonwebtoken                    Verify password and sign a new JWT.
Auth            Axios / Middleware              Client sends token in header; Server verifies it.

---- To Set Up the Project Environment -----

cd client  :    npx create-react-app
                npm install react-cookie react-router-dom react-toastify axios

cd server  :    npm init --yes
                npm install express cors bcrypt cookie-parser nodemon jsonwebtoken mongoose dotenv


server  ==> .env 
        MONGO_URL ="mongodb+srv://database_name:database_password@cluster0.fbx6x.mongodb.net/?retryWrites=true&w=majority";
        PORT = 4000;

server  ==>  .index.js
        const express = require("express");
        const mongoose = require("mongoose");
        const cors = require("cors");
        const app = express();
        require("dotenv").config();
        const cookieParser = require("cookie-parser");
        const authRoute = require("./Routes/AuthRoute");
        const { MONGO_URL, PORT } = process.env;
        mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB is  connected successfully"))
        .catch((err) => console.error(err));
        app.listen(PORT, () => {
        console.log(Server is listening on port \${PORT});
        });
        app.use(
        cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
        })
        );
        app.use(cookieParser());
        app.use(express.json());
        app.use("/", authRoute);

server  ==>  UserModel.js
        const mongoose = require("mongoose");
        const bcrypt = require("bcryptjs");
        const userSchema = new mongoose.Schema({
        email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
        },
        username: {
        type: String,
        required: [true, "Your username is required"],
        },
        password: {
        type: String,
        required: [true, "Your password is required"],
        },
        createdAt: {
        type: Date,
        default: new Date(),
        },
        });
        userSchema.pre("save", async function () {
        this.password = await bcrypt.hash(this.password, 12);
        });
        module.exports = mongoose.model("User", userSchema);

server  ==>  SecretToken.js
        require("dotenv").config();
        const jwt = require("jsonwebtoken");
        module.exports.createSecretToken = (id) => {
        return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
        });
        };

server ==>  AuthController.js
        const User = require("../Models/UserModel");
        const { createSecretToken } = require("../util/SecretToken");
        const bcrypt = require("bcryptjs");
        module.exports.Signup = async (req, res, next) => {
        try {
                const { email, password, username, createdAt } = req.body;
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                         return res.json({ message: "User already exists" });
                }
                const user = await User.create({ email, password, username, createdAt });
                const token = createSecretToken(user._id);
                         res.cookie("token", token, {
                         withCredentials: true,
                         httpOnly: false,
                });
                res.status(201).json({ message: "User signed in successfully", success: true, user });
                next();
        } catch (error) {
        console.error(error);
        }
        };
        module.exports.Login = async (req, res, next) => {
        try {
                const { email, password } = req.body;
                if(!email || !password ){
                        return res.json({message:'All fields are required'})
                }
                const user = await User.findOne({ email });
                if(!user){
                        return res.json({message:'Incorrect password or email' }) 
                }
                const auth = await bcrypt.compare(password,user.password)
                if (!auth) {
                        return res.json({message:'Incorrect password or email' }) 
                }
                   const token = createSecretToken(user._id);
                        res.cookie("token", token, {
                        withCredentials: true,
                        httpOnly: false,
                });
                       res.status(201).json({ message: "User logged in successfully", success: true });
                next()
        } catch (error) {
              console.error(error);
        }
        }

server ==>  AuthRoute.js
        const { Signup ,Login} = require("../Controllers/AuthController");
        const { userVerification} = require("../Middlewares/AuthMiddleware");
        const router = require("express").Router();
        router.post("/signup", Signup);
        router.post('/login', Login);
        router.post('/',userVerification);
        module.exports = router;

server ==>  AuthMiddleware.js
        const User = require("../Models/UserModel");
        require("dotenv").config();
        const jwt = require("jsonwebtoken");
        module.exports.userVerification = (req, res) => {
                const token = req.cookies.token
                if (!token) {
                          return res.json({ status: false })
                }
                jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
                if (err) {
                          return res.json({ status: false })
                } else {
                const user = await User.findById(data.id)
                if (user) return res.json({ status: true, user: user.username })
                else return res.json({ status: false })
                }
                })
        }

client ==> index.js
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import './index.css';
        import App from './App';
        import {BrowserRouter} from 'react-router-dom';
        import 'react-toastify/dist/ReactToastify.css';

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
                < React.StrictMode>
                < BrowserRouter>
                        < App/>
                < /BrowserRouter>
                < /React.StrictMode>
        );
     

client ==> App.js
        import { Route, Routes } from "react-router-dom";
        import { Login, Signup } from "./pages";
        import Home from "./pages/Home";
        function App() {
        return (
        < div className="App">
        < Routes>
                < Route path="/" element={<Home />} />
                < Route path="/login" element={<Login />} />
                < Route path="/signup" element={<Signup />} />
        < /Routes>
        < /div>
        );    
        }
        export default App;

client ==> Signup.js
        import React, { useState } from "react";
        import { Link, useNavigate } from "react-router-dom";
        import axios from "axios";
        import { ToastContainer, toast } from "react-toastify";

        const Signup = () => {
        const navigate = useNavigate();
        const [inputValue, setInputValue] = useState({email: "",password: "",username: ""});
        const { email, password, username } = inputValue;
        const handleOnChange = (e) => {
        const { name, value } = e.target;
                setInputValue({
                ...inputValue,
                [name]: value,
        });
        };
        const handleError = (err) =>
                 toast.error(err, {
                 position: "bottom-left",  });
        const handleSuccess = (msg) =>
                toast.success(msg, {
                position: "bottom-right",  });

        const handleSubmit = async (e) => {
          e.preventDefault();
                try {
                        const { data } = await axios.post("http://localhost:4000/signup",{...inputValue,},{ withCredentials: true });
                        const { success, message } = data;
                        if (success) {
                                handleSuccess(message);
                                setTimeout(() => {
                                navigate("/");
                                }, 1000);
                        } else {
                                handleError(message);
                        }
                } catch (error) {
                console.log(error); }
                setInputValue({...inputValue,email: "",password: "",username: "",});
        };

         return (
                < div className="form_container">
                < h2>Signup Account</h2>
                < form onSubmit={handleSubmit}>
                < div>
                        < label htmlFor="email">Email< /label>
                        < input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter your email"
                                onChange={handleOnChange}                       />
                < /div>
                < div>
                        < label htmlFor="email">Username< /label>
                        < input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Enter your username"
                                onChange={handleOnChange}                       />
                < /div>
                < div>
                        < label htmlFor="password">Password< /label>
                        < input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter your password"
                                onChange={handleOnChange}                        />
                < /div>
                < button type="submit">Submit< /button>
                        < span>
                        Already have an account? < Link to={"/login"}>Login< /Link>
                        < /span>
                < /form>
                < ToastContainer />
                < /div>
        );};
        export default Signup;  

client ==> Login.js
        import React, { useState } from "react";
        import { Link, useNavigate } from "react-router-dom";
        import axios from "axios";
        import { ToastContainer, toast } from "react-toastify";
        const Login = () => {
                const navigate = useNavigate();
                const [inputValue, setInputValue] = useState({email: "",password: "",});
                const { email, password } = inputValue;
                const handleOnChange = (e) => {
                        const { name, value } = e.target;
                        setInputValue({...inputValue,[name]: value,});
                };
                const handleError = (err) =>
                        toast.error(err, {
                        position: "bottom-left",
                });
                const handleSuccess = (msg) =>
                        toast.success(msg, {
                        position: "bottom-left",
                });
        const handleSubmit = async (e) => {
                 e.preventDefault();
                try {
                 const { data } = await axios.post("http://localhost:4000/login", {...inputValue,},{ withCredentials: true });
                        console.log(data);
                        const { success, message } = data;
                if (success) {
                        handleSuccess(message);
                        setTimeout(() => {
                        navigate("/");
                        }, 1000);
                } else {
                        handleError(message);
                }
                } catch (error) {
                console.log(error);
                }
                setInputValue({...inputValue,email: "",password: "",});
                };

        return (
                < div className="form_container">
                < h2>Login Account</h2>
                 < form onSubmit={handleSubmit}>
                < div>
                        < label htmlFor="email">Email< /label>
                        < input
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={handleOnChange}                />
                < /div>
                < div>
                        < label htmlFor="password">Password< /label>
                        < input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={handleOnChange}                />
                </div>
                < button type="submit">Submit< /button>
                        < span>
                        Already have an account? < Link to={"/signup"}>Signup< /Link>
                        < /span>
                < /form>
                < ToastContainer />
                < /div>
        );        };
        export default Login;

client ==> Home.js
        import { useEffect, useState } from "react";
        import { useNavigate } from "react-router-dom";
        import { useCookies } from "react-cookie";
        import axios from "axios";
        import { ToastContainer, toast } from "react-toastify";

        const Home = () => {
                const navigate = useNavigate();
                const [cookies, removeCookie] = useCookies([]);
                const [username, setUsername] = useState("");
                useEffect(() => {
                        const verifyCookie = async () => {
                        if (!cookies.token) {
                                navigate("/login");
                        }
                        const { data } = await axios.post("http://localhost:4000",{},{ withCredentials: true });
                        const { status, user } = data;
                        setUsername(user);
                        return status
                                ? toast(Hello \${user}, {
                                position: "top-right",
                                })
                                : (removeCookie("token"), navigate("/login"));
                };
                verifyCookie();
                }, [cookies, navigate, removeCookie]);
                const Logout = () => {
                      removeCookie("token");
                      navigate("/signup");
                };
        return (
        < >
                < div className="home_page">
                        < h4>
                        {" "}
                        Welcome < span>{username}< /span>
                        < /h4>
                        < button onClick={Logout}>LOGOUT< /button>
                < /div>
                < ToastContainer />
        </>  );};
        export default Home;
        
client ==> index.css
        *,
        ::before,
        ::after {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
        }
        label {
                font-size: 1.2rem;
                color: #656262;
        }
        html,
        body {
                height: 100%;
                width: 100%;
        }
        body {
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(
                90deg,
                rgba(2, 0, 36, 1) 0%,
                rgba(143, 187, 204, 1) 35%,
                rgba(0, 212, 255, 1) 100%
                );
                font-family: Verdana, Geneva, Tahoma, sans-serif;
                }
        .form_container {
                background-color: #fff;
                padding: 2rem 3rem;
                border-radius: 0.5rem;
                width: 100%;
                max-width: 400px;
                box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
        }
        .form_container > h2 {
                margin-block: 1rem;
                padding-block: 0.6rem;
                color: rgba(0, 212, 255, 1);
                }
        .form_container > form {
                display: flex;
                flex-direction: column;
                gap: 1.4rem;
        }
        .form_container div {
                display: flex;
                flex-direction: column;
                gap: 0.3rem;
        }
        .form_container input {
                border: none;
                padding: 0.5rem;
                border-bottom: 1px solid gray;
                font-size: 1.1rem;
                outline: none;
        }
        .form_container input::placeholder {
                font-size: 0.9rem;
                font-style: italic;
        }
        .form_container button {
                background-color: rgba(0, 212, 255, 1);
                color: #fff;
                border: none;
                padding: 0.6rem;
                font-size: 1rem;
                cursor: pointer;
                border-radius: 0.3rem;
        }
        span a {
                text-decoration: none;
                color: rgba(0, 212, 255, 1);
        }
        .home_page {
                height: 100vh;
                width: 100vw;
                background: #000;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                text-transform: uppercase;
                font-size: 3rem;
                flex-direction: column;
                gap: 1rem;
        }
        .home_page span {
                color: rgba(0, 212, 255, 1);
        }
        .home_page button {
                background-color: rgb(27, 73, 83);
                color: #fff;
                cursor: pointer;
                padding: 1rem 3rem;
                font-size: 2rem;
                border-radius: 2rem;
                transition: ease-in 0.3s;
                border: none;
        }
        .home_page button:hover {
                background-color: rgba(0, 212, 255, 1);
        }
        @media only screen and (max-width: 1200px){
        .home_page{
                font-size: 1.5rem;
        }
        .home_page button {
                padding: 0.6rem 1rem;
                font-size: 1.5rem;
        }
        }
        `,
                nextLesson: "l5_3"
        },
        l5_3: {
                title: "Protected Routes (PrivateRoute)",
                description: "In a MERN stack application, a PrivateRoute (or Protected Route) is a React component that prevents unauthenticated users from accessing specific pages.",
                objectives: ["Frontend: React PrivateRoute Component", "Backend: Express Middleware"],
                code: `// Full-Stack

                import { Navigate, Outlet } from 'react-router-dom';
                const PrivateRoute = () => {
                // Check for authentication (e.g., token in localStorage)
                         const isAuthenticated = localStorage.getItem('token'); 
                                // If authenticated, render the child components using <Outlet />
                                // If not, redirect to the login page
                        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
                        };
                export default PrivateRoute;


        App.js(Frontend)
                < Routes>
                        < Route path="/login" element={<Login />} />
                        {/* Protected Routes */}
                        < Route element={<PrivateRoute />}>
                        < Route path="/dashboard" element={<Dashboard />} />
                        < Route path="/profile" element={<Profile />} />
                        < /Route>
                < /Routes>

        auth.js(Backend)
                const jwt = require('jsonwebtoken');
                const authMiddleware = (req, res, next) => {
                const token = req.header('Authorization')?.split(' ')[1]; // Extracts Bearer token
                if (!token) return res.status(401).json({ message: "No token, authorization denied" });
                try {
                        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                        req.user = decoded; // Adds user info to the request object
                        next();
                } catch (err) {
                        res.status(401).json({ message: "Token is not valid" });
                }
                };
                module.exports = authMiddleware;
                `,
                notes: "You must handle protection on both the Frontend (React) for user experience and the Backend (Node/Express) for actual data security.",
                nextLesson: "l5_4"
        },
        l5_4: {
                title: "Full CRUD with React + Express",
                description: "To build a full CRUD (Create, Read, Update, Delete) application using the MERN stack, you need to coordinate four primary technologies: MongoDB for storage, Express for the server, React for the user interface, and Node.js as the runtime.",
                objectives: ["Frontend Setup (React)", "Backend Setup (Node.js & Express)", "Integration & Testing"],
                code: `// Full-Stack
        ---- To Set Up the Project Environment -----

        cd client  :    npx create-react-app
                        npm install react-cookie react-router-dom react-toastify axios

        cd server  :    npm init --yes
                        npm install express cors bcrypt cookie-parser nodemon jsonwebtoken mongoose dotenv

        server // index.js
                const express = require('express');
                const mongoose = require('mongoose');
                const bodyParser = require('body-parser');
                const cors = require('cors');
                const todoRoutes = require('./routes/todoRoutes');
                const app = express();
                const PORT = process.env.PORT || 5000;
                mongoose.connect('mongodb://localhost:27017/todoapp', {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                });
                const db = mongoose.connection;
                db.on('error', console.error.bind(console, 'connection error:'));
                db.once('open', () => {
                        console.log('Connected to MongoDB');
                });
                app.use(bodyParser.json());
                app.use(cors());
                app.listen(PORT, () => {
                        console.log(Server is running on port \${PORT});
                });
              app.use('/api/todos', todoRoutes);

        server // models/Todo.js
                const mongoose = require('mongoose');
                const todoSchema = new mongoose.Schema({
                        text: { type: String, required: true },
                        completed: { type: Boolean, default: false },
                        createdAt: { type: Date, default: Date.now },
                });
                const Todo = mongoose.model('Todo', todoSchema);
                module.exports = Todo;

        server // routes/todoRoutes.js
                const express = require('express');
                const Todo = require('../models/Todo');
                const router = express.Router();
                // Create a new todo
                        router.post('/', async (req, res) => {
                        try {
                                const todo = new Todo({
                                text: req.body.text,
                        });
                        await todo.save();
                        res.status(201).json(todo);
                        } catch (err) {
                                 res.status(400).json({ error: err.message });
                        }
                        });
                // Get all todos
                        router.get('/', async (req, res) => {
                        try {
                                  const todos = await Todo.find();
                        res.status(200).json(todos);
                        } catch (err) {
                                 res.status(400).json({ error: err.message });
                        }
                        });
                // Update a todo
                        router.put('/:id', async (req, res) => {
                        try {
                                const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
                                res.status(200).json(todo);
                        } catch (err) {
                                  res.status(400).json({ error: err.message });
                        }                        });
                // Delete a todo
                        router.delete('/:id', async (req, res) => {
                        try {
                                await Todo.findByIdAndDelete(req.params.id);
                                res.status(200).json({ message: 'Todo deleted successfully' });
                        } catch (err) {
                           res.status(400).json({ error: err.message });
                        }                        });
                module.exports = router;

        client // src/components/TodoList.js
                import React, { useEffect, useState } from 'react';
                import axios from 'axios';
                import TodoItem from './TodoItem';
                import TodoForm from './TodoForm';
                const TodoList = () => {
                        const [todos, setTodos] = useState([]);
                        useEffect(() => {
                                 fetchTodos();
                         }, []);
                        const fetchTodos = async () => {
                                const response = await axios.get('http://localhost:5000/api/todos');
                                setTodos(response.data);
                        };
                        const addTodo = async (text) => {
                                const response = await axios.post('http://localhost:5000/api/todos', { text });
                                setTodos([...todos, response.data]);
                        };
                        const updateTodo = async (id, updatedTodo) => {
                                const response = await axios.put(http://localhost:5000/api/todos/\${id}, updatedTodo);
                                setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
                        };
                        const deleteTodo = async (id) => {
                                await axios.delete(http://localhost:5000/api/todos/\${id});
                                setTodos(todos.filter(todo => todo._id !== id));
                        };
                return (
                        < div>
                        < h1>Todo List< /h1>
                        < TodoForm addTodo={addTodo} />
                        {todos.map(todo => (
                                < TodoItem
                                key={todo._id}
                                todo={todo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                />
                        ))}
                        < /div>
                );                };
                export default TodoList;
                
        client // src/components/TodoItem.js
                import React from 'react';
                const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
                        const toggleComplete = () => {
                                updateTodo(todo._id, { ...todo, completed: !todo.completed });
                        };
                return (
                        < div>
                        < input  type="checkbox"
                                checked={todo.completed}
                                onChange={toggleComplete}                       />
                        < span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                {todo.text}
                        < /span>
                        < button onClick={() => deleteTodo(todo._id)}>Delete< /button>
                        < /div>
                );                };
                export default TodoItem;

        client // src/components/TodoForm.js
                import React, { useState } from 'react';
                const TodoForm = ({ addTodo }) => {
                        const [text, setText] = useState('');
                        const handleSubmit = (e) => {
                                e.preventDefault();
                                addTodo(text);
                                setText('');
                        };
                return (
                        < form onSubmit={handleSubmit}>
                        < input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Add a new todo"
                        />
                        < button type="submit">Add< /button>
                        < /form>
                );                };
                export default TodoForm;

        client // src/App.js
                import React from 'react';
                import TodoList from './components/TodoList';
                function App() {
                        return (
                                < div className="App">
                                < TodoList />
                                < /div>
                          );
                }
                export default App;
                `,
                nextLesson: "l5_5"
        },
        l5_5: {
                title: "File Uploads with Multer",
                description: "Implementing file uploads in a MERN stack application requires using Multer as middleware on the backend to handle multipart/form-data and FormData on the React frontend to send the file.",
                code: `// Full-Stack

        npm install multer

        //destination folder
                const multer = require('multer');
                const path = require('path');
                const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                        cb(null, 'uploads/'); // Ensure this folder exists
                },
                filename: (req, file, cb) => {
                        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
                }
                });
                const upload = multer({ storage: storage });

        //Route handling
                app.post('/upload', upload.single('file'), (req, res) => {
                        if (!req.file) return res.status(400).send('No file uploaded.');
                        res.json({ message: 'Success', filePath: req.file.path });
                });

        //frontend
                const [file, setFile] = useState(null);
                const onFileChange = (e) => setFile(e.target.files[0]);
                const handleSubmit = async (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        formData.append('file', file); // 'file' must match the backend fieldname
                        try {
                                await axios.post('http://localhost:5000/upload', formData, {
                                headers: { 'Content-Type': 'multipart/form-data' }
                        });
                        alert('File uploaded!');
                        } catch (err) {
                                console.error(err);
                        }
                 };
                `,
                notes: " Use express.static('uploads') in your server file to make uploaded files accessible via URL.You can add a fileFilter in Multer options to restrict uploads to specific extensions like .jpg or .png.",
                nextLesson: "l5_6"
        },
        l5_6: {
                title: "Capstone Project",
                code: `// Full-Stack
        Real-Time Collaborative Whiteboard (Zoom + MiroType)
        required to build a full-stack real-time collaborative whiteboard application using theMERN Stack (MongoDB, Express.js, React.js, Node.js). 
        The application should allow multiple usersto join a shared room and draw simultaneously with real-time synchronization using WebSockets(Socket.io).
        
        Core Requirements (Mandatory Features)•User Authentication using JWT (Register / Login / Logout)
                •Create and Join Whiteboard Rooms via unique Room ID
                •Real-time drawing synchronization using Socket.io
                •Canvas tools: Pencil, Eraser, Clear Board
                •Color picker and brush size selection
                •Room-based multi-user collaboration
                •Chat feature inside whiteboard room
                •Persistent storage of whiteboard sessions in MongoDB
                •Responsive UI using React Hooks (useState, useEffect, useRef)

        Intermediate Features (For Good Grade)
                •Undo / Redo functionality
                •Save whiteboard snapshot as image
                •User presence indicator (who is online)
                •Protected routes in frontend
                •Role-based permissions (Host / Participant)
                •Proper error handling and validation
        
        Advanced Features (For Excellent Grade)
                •Screen sharing using WebRTC
                •File sharing inside room
                •Session recording
                •Dark/Light mode toggle
                •Full deployment (Frontend + Backend) with working live URL
        
        Technical Expectations•Clean and structured folder architecture (MVC pattern)
                •Environment variables usage (.env)
                •RESTful API design
                •Proper WebSocket event handling
                •Production-ready build
                •GitHub repository with proper README documentation
        
        Submission Guidelines
                •GitHub Repository Link
                •Deployed Application Live URL (Frontend + Backend)
                •Proper README with setup instructions
                
        `,
                nextLesson: "l6_1"
        },
        l6_1: {
                title: "JSX, Components & Props",
                description: " ",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB
                `,
                notes: "Take your time with each lesson. The most important thing is understanding, not speed.",
                nextLesson: "l6_2"
        },
        l6_2: {
                title: "JSX, Components & Props",
                description: " ",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB
                `,
                notes: "Take your time with each lesson. The most important thing is understanding, not speed.",
                nextLesson: "l6_3"
        },

        l6_3: {
                title: "JSX, Components & Props",
                description: " ",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB
                `,
                notes: "Take your time with each lesson. The most important thing is understanding, not speed.",
                nextLesson: "l6_4"
        },

        l6_4: {
                title: "JSX, Components & Props",
                description: " ",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB
                `,
                notes: "Take your time with each lesson. The most important thing is understanding, not speed.",
                nextLesson: "l6_5"
        },

        l6_5: {
                title: "JSX, Components & Props",
                description: " ",
                objectives: ["Pipeline Stages", "The aggregate Method", "Non-Destructive"],
                code: `// MongoDB
                `,
                notes: "Take your time with each lesson. The most important thing is understanding, not speed.",
                nextLesson: "l1_1"
        }
};
