import React from 'react'
import PropTypes from 'prop-types'
import MerchantList from "./MerchantList";

const Home: React.FC<{name: string}> = (props) => (
  <div>
      <h1>
        Welcome, {props.name}!
      </h1>
    <MerchantList/>
  </div>
)

Home.propTypes = {
  name: PropTypes.string
}

export default Home;