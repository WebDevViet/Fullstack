import { Component } from 'react'
import Counter from './components/Counter'

export default class AppClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true
    }
  }
  render() {
    return (
      <>
        <button onClick={() => this.setState({ show: !this.state.show })}>Toggle</button>
        {this.state.show && <Counter initCount={0} />}
      </>
    )
  }
}
