require = require("esm")(module);

const contactsFunctions = require("./contacts");


// contactsFunctions.listContacts();
// contactsFunctions.getContactById(1);

const argv = require('yargs').argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        contactsFunctions.listContacts();
      break;

    case 'get':
      // ... id
      contactsFunctions.getContactById(id);
      break;

    case 'add':
      // ... name email phone
      contactsFunctions.addContact(name, email, phone);
      break;

    case 'remove':
      // ... id
      contactsFunctions.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);