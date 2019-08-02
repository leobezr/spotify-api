import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import logo from './img/spotify.png';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

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
                    <p className="text-white d-block mb-5">Antes de verificar, certifique-se de que você está escutando alguma coisa no spotfy.</p>
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
                            <Button onClick={values.getNowPlaying} color="success" className={`px-5 mt-3 ${values.step > 1 ? 'd-none' : 'default'}`}>Verificar</Button>
                            <Button className={`px-5 mt-3 ${values.step > 1 ? 'default' : 'd-none'}`} onClick={values.nextStep} color="success">Ótimo, agora vamos para as bibliotecas!</Button>
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
        const { loggedIn, nowPlaying, getNowPlaying, step, gotoStep, nextStep, search, library, list, findArtist, boolean, albums } = this.props;
        const values = { loggedIn, nowPlaying, getNowPlaying, step, gotoStep, nextStep, search, library, findArtist, list, boolean, albums }

        return (
            <div>
                {/* 
                    Primeiro acesso
                */}
                <Container className={`${values.step >= 3 ? 'd-none' : 'default'}`} counter={values.step} id="register">
                    <Row>
                        <Col sm={12} className="justify-content-center align-items-center d-flex">
                            <div className="justify-content-center align-items-center d-flex flex-column" style={styles.fix}>
                                <figure className="mb-5">
                                    <img src={logo} style={styles.img} />
                                </figure>
                                <this.HasAcces values={values} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                
                {/* 
                    Input de achar artista
                */}
                <div className={` ${values.step >= 3 ? 'show' : 'd-none'} `} id="library">
                    <div className={`sidebar ${ values.list.name ? 'swipe' : 'showing' }`}>
                        <h3>Escolha um artista</h3>
                        <Container>
                            <Row>
                                <Col sm={12} xl={10} className={'pl-xl-0'}>
                                    <InputGroup className='mt-3'>
                                        <Input placeholder="Digite aqui seu artista favorito." onChange={values.search}/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row style={ values.boolean ? styles.visible : styles.hidden }>
                                <Col sm={12} xl={10} className="pl-0">
                                    <div className='wrapper'>
                                        <figure>
                                            <img style={styles.thumbnail} src={values.library.artist.selfy}/>
                                        </figure>
                                        <h3 className='text-center'>{values.library.artist.name}</h3>
                                        <Button className="px-5 d-flex mt-3 mx-auto" color="success" onClick={findArtist}>{values.library.artist.group}</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>

                {/* 
                    Resposta de artista
                */}
                <Container className={`${ values.list.name ? 'show' : 'not-show' } mb-5`} id="artista">
                    <Row>
                        <Col xl={7}>
                            <figure>
                                <img src={values.list.pic}/>
                            </figure>
                        </Col>
                        <Col xl={5}>
                            <h3 className="text-white">{values.list.name}</h3>
                            <p className="text-white">Genero: {values.list.type}</p>
                            <p className="text-white">Popularidade: {values.list.pop}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xl={12}>
                            <div className="box-container">
                                <h3 className="text-white mt-5">Feito para você<br/> <small><strong>Quanto mais você escutar, melhores recomendações vai receber</strong></small></h3>
                                <ul className="p-0 m-0">
                                    {
                                        values.albums.map((li, index) => {
                                            return (
                                                <li className="box">
                                                    <figure>
                                                        <img src={values.albums[index].img}/>
                                                    </figure>
                                                    <h4 className="text-white">{values.albums[index].name}</h4>
                                                    <label className="text-white">{setDate(values.albums[index].date)}</label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function setDate(string){
    let a = string.split('-')
    a = a[1] + '/' + a[2] + '/' + a[0];
    return a
}

const styles = {
    fix: {
        height: '100vh'
    },
    img: {
        width: 'auto',
        height: 130,
        pointerEvents: 'none'
    },
    thumbnail: {
        width: 'auto',
        height: 300,
        display: 'block',
        margin: '40px auto 0'
    },
    visible: {
        display: 'block'
    },
    hidden: {
        display: 'none'
    }
}

const levels = {
    currentLevel: 'default'
}

export default Main
