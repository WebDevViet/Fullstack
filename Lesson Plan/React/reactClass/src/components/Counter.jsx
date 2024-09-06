/* eslint-disable react/prop-types */
import { Component } from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: props.initCount
    }
  }

  handleIncrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <>
        <p>Counter: {this.state.count}</p>
        <button>+</button>
      </>
    )
  }
}

/** State: thể hiện trạng thái dữ liệu của 1 component
 * Khi state thay đổi ==> component sẽ tự động re-render (gọi lại)
 * Trong class component => state có sẵn và thể hiện là 1 thuộc tính của class dạng object
 * không được thay đổi trực tiếp state mà phải thông qua hàm có sẫn của class component: setState
 * Lý do dùng setState: là vì mặc dù chúng ta có thể thay đổi trực tiếp this.state nhưng component sẽ ko tự re-render mà nó phải thông qua hàm setState
 * Re-render ko phải là re-paint (cập nhật lại dom thật - vẽ lại dom thật)
 * Không được setState trong constructor, render
 */

/** Giai đoạn component được đưa vào DOM - Mounted
 * 1. constructor: khởi tạo state mặc định, props mặc định - Khởi tạo giá trị mặc định
 * 2. render: thực ra thì sẽ có 1 hàm là willMount chạy trước nhưng ít khi được sử dụng
 * 3. componentDidMount: sẽ chỉ chạy 1 lần duy nhất ngay sau khi component được đưa vào DOM (method render chạy lần thứ nhất)
 */

/** Giai đoạn cập nhật chỉnh sửa dữ liệu trong component - Update
 * 1. state thay đổi trước
 * 2. render
 * 3. componentDidUpdate: sẽ gọi sau khi method render chạy lần thứ nhất
 */

/** Giai đoạn component loại bỏ khỏi DOM - Unmounted
 * componentWillUnmount
 */
