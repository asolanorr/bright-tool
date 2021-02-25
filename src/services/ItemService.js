import { db } from "./firebase";

export let data = [];

export const createItem = async (itemObject) => {
    await db.collection('items').doc().set(itemObject);
}

export const onDeleteItem = async (id) => {
    await db.collection('items').doc(id).delete();
}

export const onEditItem = async (itemObject, currentID) => {
    await db.collection('items').doc(currentID).update(itemObject);
}

export const getItemByID = async (id, setValues) => {
    const doc = await db.collection('items').doc(id).get();
    setValues({ ...doc.data() });
}

export const deleteOnDate = async (dateValue, id) => {
    let today = new Date();
    let dueDate = new Date(dateValue);
    if (today.setHours(23, 59, 0, 0) > dueDate.setHours(23, 59, 0, 0)) {
        await db.collection('items').doc(id).delete();
    }
}