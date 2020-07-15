import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  
  const pip=()=>{
    fetch('/api').then(res=>console.log(res)).then(data=>console.log(data));
  }
function Home(props) {
    pip();
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                        </CardBody>
                        <img width="100%" src="/logo512.png" alt="Card image cap" />
                        <CardBody>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <CardLink href="#">Card Link</CardLink>
                            <CardLink href="#">Another Link</CardLink>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                        </CardBody>
                        <img width="100%" src="/logo512.png" alt="Card image cap" />
                        <CardBody>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <CardLink href="#">Card Link</CardLink>
                            <CardLink href="#">Another Link</CardLink>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md m-1">
                    <Card>
                        <CardBody>
                            <CardTitle>Card title</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                        </CardBody>
                        <img width="100%" src="/logo512.png" alt="Card image cap" />
                        <CardBody>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <CardLink href="#">Card Link</CardLink>
                            <CardLink href="#">Another Link</CardLink>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;