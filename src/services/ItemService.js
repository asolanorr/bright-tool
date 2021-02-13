import { db } from "./firebase";

export let data = [];

export const createItem = async (itemObject) => {

    await db.collection('items').doc().set(itemObject);
    console.log('The item has been created succesfully: ' + itemObject);
}

export const onDeleteItem = async (id) => {
    await db.collection('items').doc(id).delete();
    // if (window.confirm('Are you sure that you want to delete the selected item?') === true) {

    //     // toast('Item deleted', {
    //     //     type: 'error'
    //     // })
    // }
}

export const onEditItem = async (itemObject, currentID) => {
    await db.collection('items').doc(currentID).update(itemObject);

    // setter('');
}

// export const getItemByID = async (id) => {
//     await db.collection('items').doc(id).get()
// }