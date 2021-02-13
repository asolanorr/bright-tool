import { React, useState } from 'react'
import './ItemForm.scss';
import 'antd/dist/antd.css';
import { Form, Input, Select, DatePicker } from 'antd';
import { Button, Col, Row, Modal, Container } from 'react-bootstrap';
import moment from 'moment';
import { createItem, onEditItem } from "../../services/ItemService";

const ItemForm = (props) => {

    const [currentID, SetCurrentID] = useState('');

    const dateFormat = 'DD/MM/YYYY';

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const onFinish = (values) => {
        const item = {
            url: values.url,
            path: values.path,
            dev: values.dev,
            date: values.date.format("MM-DD-YYYY")
        }

        createItem(item);

        // if (props.currentID === '') {
        //     createItem(item);
        //     SetCurrentID('');
        // } else {
        //     onEditItem(item, currentID);
        //     SetCurrentID('');
        // }
        

        handleClose();
    };

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <Container className="p-0">
                    <Row>
                        <Col md={12}>
                            <div>
                                <h5 className="font-weight-light modalBodyHeader text-center">Please fill in the item details below to add the path to our DB.</h5>
                            </div>
                        </Col>
                    </Row>

                    <Form
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onValuesChange={() => console.log('submitted')}
                        size='large'
                        onFinish={onFinish}
                    >

                        <Form.Item
                            label="Ticket URL"
                            name="url"
                            rules={[{ required: true, message: 'Please input the ticket URL!' }]}
                        >
                            <Input placeholder="Insert the Jira ticket URL or just the ticket ID" />
                        </Form.Item>

                        <Form.Item 
                        label="Path(s)" 
                        name="path"
                        rules={[{ required: true, message: 'Please input the path(s) of your items!' }]}
                        >
                            <Input placeholder="SC Item path(s)" />
                            
                        </Form.Item>
                        <p className="text-muted  font-italic">If you want to add one more path to the item just separate them with a ","</p>

                        <Row>
                            <Col md={8}>
                                <Form.Item 
                                    label="Developer" 
                                    name="dev"
                                    rules={[{ required: true, message: 'Please select a developer!' }]}
                                >
                                    <Select placeholder="Select developer">
                                        <Select.Option value="Abraham Oviedo">Abraham Oviedo</Select.Option>
                                        <Select.Option value="Alejandro Jerez">Alejandro Jerez</Select.Option>
                                        <Select.Option value="Alejandro Solano">Alejandro Solano (Luwi)</Select.Option>
                                        <Select.Option value="Cesar Peralta">César Peralta</Select.Option>
                                        <Select.Option value="Daniel Mora">Daniel Mora</Select.Option>
                                        <Select.Option value="Esteban Fonseca">Esteban Fonseca</Select.Option>
                                        <Select.Option value="Fabricio Cordero">Fabricio Cordero</Select.Option>
                                        <Select.Option value="Hillary Cordero">Hillary Cordero</Select.Option>
                                        <Select.Option value="Kendall Calderon">Kendall Calderon</Select.Option>
                                        <Select.Option value="Josue Somarribas">Josue Somarribas</Select.Option>
                                        <Select.Option value="Juan Jose Coto">Juan Jose Coto</Select.Option>
                                        <Select.Option value="Rachel Morrill">Rachel Morrill</Select.Option>
                                    </Select>
                                </Form.Item>

                            </Col>
                            <Col md={4} className="pl-0">
                                <Form.Item 
                                    label="Due date" 
                                    name="date"
                                    rules={[{ required: true, message: 'Please input the due date of your ticket!' }]}
                                >
                                    <DatePicker format={dateFormat} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col className="d-flex justify-content-end mt-3">
                                <Button variant="link" className="mr-2" onClick={handleClose}>Close</Button>
                                <Button type="submit" className="defaultButton">Save</Button>
                            </Col>
                        </Row>
                    </Form>

                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ItemForm
