import { React, useState, useEffect } from 'react';
import { Button, Col, Row, Dropdown, DropdownButton, Modal, FormControl } from 'react-bootstrap';
import './ItemList.scss';
import { db } from '../../services/firebase';
import ItemForm from '../ItemForm/ItemForm';
import { onDeleteItem, deleteOnDate } from '../../services/ItemService';
import { Empty } from 'antd';
import { useToasts } from 'react-toast-notifications';

const ItemList = () => {
    //This hook is responsible for storage the list of items
    const [items, setItems] = useState([]);

    //This hook is for save the current ID of the item which is being modified
    const [currentID, SetCurrentID] = useState('');

    //This hook is responsible for storage the word that is being written in the search bar
    const [searchTerm, setSearchTerm] = useState('');

    const initialStateValues = {
        url: '',
        path: '',
        date: '',
        dev: ''
    };
    //This hook is responsible for storage the values of the form
    const [values, setValues] = useState(initialStateValues);

    //Custom library hook for the toasts notifications
    const { addToast } = useToasts();

    //This variable saves the paths of the current item, it's just a temporary variable
    let tmpPaths;

    //This function get Items from the DB and save them into the array of the state called "items"
    const getItems = async () => {
        db.collection('items').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            setItems(docs)
        });
    }

    //This function inserts the paths of each element and separates them into different lines
    const listPaths = () => {
        let itemPaths = [];

        for (let i = 0; i < tmpPaths.length; i++) {
            itemPaths[i] = <span className='d-block'>{tmpPaths[i]}</span>
        }

        return itemPaths;
    }

    //As its name says this function verifies if the list of items is empty and return a component
    const isEmpty = (items) => {
        if (items.length === 0) {
            return (
                <div className="m-4">
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>There are no items to show, if you want to add an item just click on the "Add Paths" button.</span>
                        }
                    >
                    </Empty>
                </div>
            )
        }
    }

    const onDelete = (id) => {
        onDeleteItem(id);
        addToast('Careful! The item was removed successfully.', {
            appearance: 'error',
            autoDismiss: true
        });
    }

    useEffect(() => {
        getItems();
    }, []);

    //Modal state hook
    const [modalShow, setModalShow] = useState(false);

    const openEdit = (id) => {
        SetCurrentID(id);
        setModalShow(true);
    }

    const openAdd = () => {
        SetCurrentID('');
        setModalShow(true);
    }

    return (
        <div className="mt-5">
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <ItemForm {...{ currentID, values, setValues }} show={modalShow} onHide={() => setModalShow(false)} />
                </Modal.Body>
            </Modal>

            <Row className="mb-3">
                <Col md={12}>
                    <h5 className="d-inline-block pt-2 m-0 font-weight-bold">List of paths to be careful! ⚠️</h5>
                </Col>
            </Row>

            <Row className="d-flex justify-content-between pl-3 pr-3 mb-3">
                <FormControl className="searchInput" as="input" placeholder="🔍 Search..." onChange={(event) => { setSearchTerm(event.target.value) }} name="searchTerm" />
                <Button className="defaultButton" onClick={() => openAdd()}>+ Add paths</Button>
            </Row>

            <div className="shadow-sm">
                <Row className="listHead">
                    <Col className="p-0 pl-1" md={1}>Ticket URL</Col>
                    <Col className="pr-0" md={7}>Path(s)</Col>
                    <Col className="p-0" md={1}>Due date</Col>
                    <Col className="" md={2}>Developer</Col>
                    <Col className="p-0 text-center" md={1}>Actions</Col>
                </Row>

                {isEmpty(items)}

                {/* The .filter is responsible for filter the array of items by any of the attributes */}
                {items.filter((val) => {
                    if (searchTerm === '') {
                        return val;
                    } else if (
                        val.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.dev.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.date.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                    // Then we iterate on the array and start to fill the component
                }).map((item) => (
                    deleteOnDate(item.date, item.id),
                    tmpPaths = item.path.split(','),
                    <Row className="listItem" key={item.id}>
                        <Col className="p-0 pl-1" md={1}>
                            <a href={item.url} target="_blank" rel="noreferrer">{item.url.split('https://jira.solarwinds.com/browse/').pop()}</a>
                        </Col>
                        <Col className="pr-0" md={7}>
                            {listPaths()}
                        </Col>
                        <Col className="p-0" md={1}>{new Date(item.date).toUTCString().split(' ').slice(0, 3).join(' ')}</Col>
                        <Col className="" md={2}>{item.dev}</Col>
                        <Col className="p-0 text-center" md={1}>
                            <DropdownButton id="dropdown-item-button" className="listDropdown" title="">
                                <Dropdown.Item as="button" className="dropdownException" onClick={() => openEdit(item.id)}>Edit</Dropdown.Item>
                                <Dropdown.Item as="button" className="dropdownException" onClick={() => onDelete(item.id)}>Delete</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                ))}
                <Row className="listFooter"></Row>
            </div>
        </div>
    )
}

export default ItemList