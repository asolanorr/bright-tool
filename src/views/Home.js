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
                <Container className="text-center p-4">
                    <h6 >Developed by <a href="https://asolanorr.github.io/" target="_blank">Alejandro Solano</a> 👨‍💻</h6>
                </Container>
            </footer>
        </ToastProvider>
    )
}

export default Home
