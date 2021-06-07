import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Home = props => (
  <div>Hello {props.name}!</div>
)

Home.defaultProps = {
  name: 'David'
}

Home.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
