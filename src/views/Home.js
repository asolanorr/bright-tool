import React from 'react'
import { Container, Navbar } from 'react-bootstrap';
import ItemList from "../components/ItemList/ItemList";
import { ToastProvider } from 'react-toast-notifications';

const Home = () => {
    return (
        <ToastProvider>
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
        </ToastProvider>
    )
}

export default Home
