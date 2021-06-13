import React from 'react'
import PropTypes from 'prop-types'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MerchantList from "./MerchantList/MerchantList";
import CollectionList from "./CollectionList/CollectionList";
import Collection from "./CollectionList/Collection";

const App: React.FC<{name: string}> = (props) => (
  <div>
    <h1>
      Welcome, {props.name}!
    </h1>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={() => <MerchantList/>}/>
        <Route exact path='/collections' render={() => <CollectionList/>}/>
        <Route path='/collections/:id' render={() => <Collection/>}/>
      </Switch>
    </BrowserRouter>
  </div>
)

App.propTypes = {
  name: PropTypes.string
}

export default App;