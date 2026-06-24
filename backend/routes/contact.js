import express from 'express';
import { addContact, deleteContact, showContact, showContactById, updateContact,showContactByName,getContacts,paginationSearch} from '../controller/contactController.js';

const routerContact = express.Router();

routerContact
    .get("/", showContact)
    .get("/:id", showContactById)
    .post("/search", showContactByName)
    .get("/", getContacts)
    .get("/pagination/:pageno",paginationSearch)
    .post("/", addContact)
    .put("/:id",updateContact)
    .delete("/:id",deleteContact)

export default routerContact;