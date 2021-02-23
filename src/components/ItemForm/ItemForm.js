import { React, useEffect } from 'react'
import './ItemForm.scss';
import { useForm } from "react-hook-form";
import { Button, Col, Row, Form } from 'react-bootstrap';
import { createItem, onEditItem, getItemByID } from "../../services/ItemService";
import { useToasts } from 'react-toast-notifications';

const ItemForm = (props) => {

    const initialStateValues = {
        url: '',
        path: '',
        date: '',
        dev: ''
    };

    const { register, handleSubmit, errors } = useForm();

    const { addToast } = useToasts();

    const handleInputChange = e => {
        const { name, value } = e.target;
        props.setValues({ ...props.values, [name]: value });
    }

    const onSubmit = e => {

        if (props.currentID === '') {
            createItem(props.values);

            addToast('Wooohooo! 🤓 \nThe item was created successfully.', { 
                appearance: 'success',
                autoDismiss: true
            });

        } else {
            onEditItem(props.values, props.currentID);

            addToast('Oooh yeah! 😎 \nThe item was edited successfully.', { 
                appearance: 'success',
                autoDismiss: true
            });
        }

        props.setValues({ ...initialStateValues })
        props.onHide()
    }

    useEffect(() => {
        if (props.currentID === '') {
            props.setValues({ ...initialStateValues });
        } else {
            getItemByID(props.currentID, props.setValues);
            console.log(props.values)
        }

    }, [props.currentID])

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={12}>
                    <div>
                        <h5 className="font-weight-light modalBodyHeader text-center mb-3">Please fill in the item details below to add the path to our DB.</h5>
                    </div>
                </Col>
            </Row>

            <Form.Group controlId="url">
                <Form.Label>Ticket URL</Form.Label>
                <Form.Control ref={register({ required: true })} placeholder="Please insert a valid Jira ticket URL." onChange={handleInputChange} name="url" defaultValue={props.values.url} />
                {errors.url && <p className="text-danger">Please insert a valid Jira ticket URL.</p>}
            </Form.Group>

            <Form.Group controlId="path">
                <Form.Label>Path (s)</Form.Label>
                <Form.Control ref={register({ required: true })} name="path" as="textarea" rows={1} placeholder="Insert the path(s) that cannot be edited." onChange={handleInputChange} defaultValue={props.values.path} />
                <p className="text-muted  font-italic m-0">If you want to add one more path to the item just separate them with a ","</p>
                {errors.path && <p className="text-danger">Please insert a valid path(s).</p>}
            </Form.Group>

            <Row>
                <Col md={7}>
                    <Form.Group controlId="dev">
                        <Form.Label>Developer</Form.Label>
                        <Form.Control ref={register({ required: true })} name="dev" as="select" onChange={handleInputChange} value={props.values.dev}>
                            <option value="">Select a developer</option>
                            <option value="Abraham Oviedo 🤔">Abraham Oviedo 🤔</option>
                            <option value="Alejandro Jerez 🙃">Alejandro Jerez 🙃</option>
                            <option value="Alejandro Solano 🔥">Alejandro Solano 🔥</option>
                            <option value="Cesar Peralta 😜">César Peralta 😜</option>
                            <option value="Daniel Mora 🥤">Daniel Mora 🥤</option>
                            <option value="Esteban Fonseca 😴">Esteban Fonseca 😴</option>
                            <option value="Fabricio Cordero 💩">Fabricio Cordero 💩</option>
                            <option value="Hillary Cordero 😌">Hillary Cordero 😌</option>
                            <option value="Kendall Calderon 😏">Kendall Calderon 😏</option>
                            <option value="Juan Jose Coto 😶">Juan Jose Coto 😶</option>
                            <option value="Nela Sánchez 😈">Nela Sánchez 😈</option>
                            <option value="Rachel Morrill">Rachel Morrill </option>
                            <option value="Vivian Chollete 🥳">Vivian Chollete 🥳</option>
                        </Form.Control>
                        {errors.dev && <p className="text-danger">Please select a developer.</p>}
                    </Form.Group>
                </Col>

                <Col md={5} className="pl-0">
                    <Form.Group controlId="date">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control ref={register({ required: true })} name="date" type="date" placeholder="Due date" onChange={handleInputChange} defaultValue={props.values.date} />
                        {errors.date && <p className="text-danger">Please select a valid date.</p>}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-end mt-3">
                    <Button variant="link" className="mr-2" onClick={() => props.onHide()}>Close</Button>
                    <Button type="submit" className="defaultButton">{props.currentID === '' ? 'Save' : 'Update'}</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default ItemForm;