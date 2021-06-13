import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MerchantList from "./MerchantList/MerchantList";
import CollectionList from "./CollectionList/CollectionList";
import Collection from "./CollectionList/Collection";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";

const App: React.FC<{name: string}> = (props) => (
  <Container>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <MerchantList/>}/>
        <Route exact path='/collections' render={() => <CollectionList/>}/>
        <Route path='/collections/:id' render={() => <Collection/>}/>
      </Switch>
    </BrowserRouter>
  </Container>
)

App.propTypes = {
  name: PropTypes.string
}

export default App;