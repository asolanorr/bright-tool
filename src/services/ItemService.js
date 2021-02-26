import { db } from "./firebase";

export let data = [];

//Validate if the url value is a Jira ticket code to auto-complete the URL
const jiraValidation = (item) => {
    let newURL;
    if (item.url.length >= 7 && item.url.includes('WU-')) {
        newURL = 'https://jira.solarwinds.com/browse/' + item.url 
        item.url = newURL;
    }
    return item;
}

export const createItem = async (itemObject) => {
    let newObj;
    newObj = jiraValidation(itemObject);
    await db.collection('items').doc().set(newObj);
}

export const onDeleteItem = async (id) => {
    await db.collection('items').doc(id).delete();
}

export const onEditItem = async (itemObject, currentID) => {
    let newObj;
    newObj = jiraValidation(itemObject);
    await db.collection('items').doc(currentID).update(newObj);
}

export const getItemByID = async (id, setValues) => {
    const doc = await db.collection('items').doc(id).get();
    setValues({ ...doc.data() });
}

//Delete the items whose date already past
export const deleteOnDate = async (dateValue, id) => {
    let today = new Date();
    let dueDate = new Date(dateValue);
    if (today.setHours(23, 59, 0, 0) > dueDate.setHours(23, 59, 0, 0)) {
        await db.collection('items').doc(id).delete();
    }
}