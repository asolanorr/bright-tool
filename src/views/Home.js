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
                    Made by Alejandro Solano
                </Container>
            </footer>
        </>
    )
}

export default Home
