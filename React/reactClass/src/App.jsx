import { Component } from 'react'
import Counter from './components/Counter'

export default class AppClass extends Component {
  constructor(props) {
    super(props) // kế thừa lại các thuộc tính và method của class Component
    this.state = {
      showCount: true
    }
  }

  handleShowCount = () => {
    this.setState({ showCount: !this.state.showCount })
  }

  render() {
    return (
      <>
        {this.state.showCount && <Counter initCount={0} />}
        <hr />
        <button onClick={this.handleShowCount}>Toggle</button>
      </>
    )
  }
}
