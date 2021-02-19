import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import ItemList from "../components/ItemList/ItemList";

const Home = () => {
    return (
        <>
            <Navbar className="logoHeader">
                <Navbar.Brand>💡 Bright Tool</Navbar.Brand>
            </Navbar>

            {/* All content goes here. */}
            <Container className="containerTweaks">
                <ItemList></ItemList>
            </Container>
            <footer>
                <Container>
                    <h6 className="text-center p-4">Made by Alejandro Solano</h6>
                </Container>
            </footer>
        </>
    )
}

export default Home
