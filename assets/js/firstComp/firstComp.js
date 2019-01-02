import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
    }
  }
  clickedBtn = () => {
  }
  render () {
    return (<div className='home'>
        
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
