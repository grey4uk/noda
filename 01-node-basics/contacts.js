const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  // ...твой код
  try {
    const contactsContent = await fsPromises.readFile(contactsPath, "utf-8");
    console.table( JSON.parse(contactsContent));
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");
    const contactById = await JSON.parse(contacts).find((contact) => contact.id === contactId);
    console.log('contactById', contactById);
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  // ...твой код
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");
    const delContactById = await JSON.parse(contacts).filter((contact) => contact.id !== contactId);
    await fsPromises.writeFile(contactsPath, JSON.stringify(delContactById));
    console.log('contacts', delContactById);
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  try {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");
    const parsedContacts=await JSON.parse(contacts);
    const newContact = {id:Number(parsedContacts[parsedContacts.length-1].id)+1,name,email,phone};
    await fsPromises.writeFile(contactsPath, JSON.stringify([...parsedContacts,newContact]));
    console.log('newContact', newContact);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
