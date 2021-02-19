import { React, useState, useEffect } from 'react'
import { Button, Col, Row, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import './ItemList.scss';
import { db } from "../../services/firebase";
import ItemForm from "../ItemForm/ItemForm";
import { onDeleteItem } from "../../services/ItemService";
import { Empty } from "antd";

const ItemList = () => {

    const [items, setItems] = useState([]);
    const [currentID, SetCurrentID] = useState('');

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

    useEffect(() => {
        getItems();
    }, []);


    const [modalShow, setModalShow] = useState(false);

    const openEdit = (id) => {
        SetCurrentID(id);
        console.log(id);
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
                    <ItemForm {...{currentID}} show={modalShow} onHide={() => setModalShow(false)} />
                </Modal.Body>
            </Modal>

            <div className="d-flex justify-content-between mb-4">
                <h5 className="d-inline-block pt-2 m-0 font-weight-bold">List of paths to be careful! ⚠️</h5>
                <Button className="defaultButton" onClick={() => openAdd()}>+ Add paths</Button>
            </div>

            <div className="shadow-sm">
                <Row className="listHead">
                    <Col className="p-0 pl-1" md={1}>Ticket URL</Col>
                    <Col className="pr-0" md={7}>Path(s)</Col>
                    <Col className="p-0" md={1}>Due date</Col>
                    <Col className="" md={2}>Developer</Col>
                    <Col className="p-0 text-center" md={1}>Actions</Col>
                </Row>

                {isEmpty(items)}

                {items.map((item) => (
                    tmpPaths = item.path.split(','),
                    <Row className="listItem" key={item.id}>
                        <Col className="p-0 pl-1" md={1}>
                            <a href={item.url} target="_blank" rel="noreferrer">{item.url.split('https://jira.solarwinds.com/browse/').pop()}</a>
                        </Col>
                        <Col className="pr-0" md={7}>
                            {listPaths()}
                        </Col>
                        <Col className="p-0" md={1}>{item.date}</Col>
                        <Col className="" md={2}>{item.dev}</Col>
                        <Col className="p-0 text-center" md={1}>
                            <DropdownButton id="dropdown-item-button" className="listDropdown" title="">
                                {/* <Dropdown.Item as="button" className="dropdownException" onClick={() => setModalShow(true)}>Edit</Dropdown.Item> */}
                                <Dropdown.Item as="button" className="dropdownException" onClick={() => openEdit(item.id)}>Edit</Dropdown.Item>
                                <Dropdown.Item as="button" className="dropdownException" onClick={() => onDeleteItem(item.id)}>Delete</Dropdown.Item>
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
