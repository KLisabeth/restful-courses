
const fs = require('fs');

// declare constants
const ENTRIES_PATH = `${__dirname}/courses.json`;
const DOC_STRING = `
COMMANDS:
  all
    print all entries to the console
  read <id>
    print a single id/name pair to the console
  delete <id>
    remove the entry with this key
  write <id> <name>
    set the given id/name pair
FLAGS:
  -h
    print this helpful message
`;

if (process.argv.includes('-h')) {
	console.log(DOC_STRING);
    process.exit(0);
}

const entriesControle = (entries, command, id, name) => {
  if (command == undefined) {
		console.log(`A command is cequired  \nSee "node app.js -h"`);
		process.exit(0);
	}

	if (command !== 'read' && command !== 'write' && command !== 'delete' && command !== 'all') {
		console.log(`${command} Is not a valid command  \nSee "node app.js -h"`);
		process.exit(0);
	}

	if (command == 'all') {
		console.log(entries);
		process.exit(0);
	}

	if (id === undefined) {
		console.log(`a ID number is requiered, cannot ${command}  \nSee "node app.js -h"`);
		process.exit(0);
	}

	if (command === 'read') {
	
		if (!(id in entries)) {
			console.log(`Course with the given "${id}" was not found.`);
			process.exit(0);
		}
        console.log(`${id}: ${entries[id]}`);
        process.exit(0);
        
	} else if (command === 'delete') {
	
		if (!(id in entries)) {
			console.log(`'Course "${id}" does not exist.' \nCannot delete`);
			process.exit(0);
		} else {
			delete entries[id];
		}

	} else if (command === 'write') {
	
		if (name.length < 3) {
			console.log(`'Name is requered and should be minimum 3 characters.' \nCannot write "${name}"`);
			process.exit(0);
       } else {
			entries[id] = name;
		}

	}

	const entriesString = JSON.stringify(entries, null, ' ');

	const writeFileCallback = (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Changes were saved');
			console.log(`(${command}) ${id}`);
		}
	};

	fs.writeFile(ENTRIES_PATH, entriesString, writeFileCallback);
};

const readFileCb = (err, entriesToString) => {
	if (err) {
		console.log(err);
		return;
	}

	const parsedEntries = JSON.parse(entriesToString);
	entriesControle(parsedEntries, process.argv[2], process.argv[3], process.argv[4]);
};

fs.readFile(ENTRIES_PATH, 'utf-8', readFileCb);