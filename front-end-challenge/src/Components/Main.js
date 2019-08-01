import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import logo from './img/spotify.png';

export class Main extends Component {

    handleClick = () => {
        window.location = 'http://boilerplate.local.plurall.net:8888/'
    }

    HasAcces = values => {
        values = this.props
        if (values.loggedIn) {
            return (
                <div className="justify-content-center align-items-center d-flex flex-column">
                    <h1 className="text-white text-center mb-3">Você está logado!!</h1>
                    <Row>
                        <Col sm={12}>
                            <figure>
                                <img src={values.nowPlaying.image} style={styles.img}></img>
                            </figure>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h3 className="text-white">Tocando:</h3>
                            <p className="text-white">{values.nowPlaying.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Button onClick={values.getNowPlaying} color="success" className="px-5 mt-3">Verificar</Button>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div className="justify-content-center align-items-center d-flex flex-column">
                    <h1 className="text-white text-center mb-3">Autentique sua conta ao Spotify</h1>
                    <Button onClick={this.handleClick} className="px-5 mt-3" color="success">Continuar</Button>
                </div>
            )
        }
    }

    render() {
        const { loggedIn, nowPlaying, getNowPlaying } = this.props;
        const values = { loggedIn, nowPlaying, getNowPlaying }

        return (
            <div>
                <Container>
                    <Row>
                        <Col sm={12} className="justify-content-center align-items-center d-flex">
                            <div className="justify-content-center align-items-center d-flex flex-column" style={styles.fix}>
                                <figure className="mb-5">
                                    <img src={logo} style={styles.img} />
                                </figure>
                                <this.HasAcces values={values}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const styles = {
    fix: {
        height: '100vh'
    },
    img: {
        width: 'auto',
        height: 130,
        pointerEvents: 'none'
    }
}

export default Main
