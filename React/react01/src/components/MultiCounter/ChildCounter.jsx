import { forwardRef } from 'react'

function ChildCounter(props, ref) {
  return (
    <div>
      <input type='text' ref={ref} />
    </div>
  )
}

// higher order component HOC

export default forwardRef(ChildCounter)

/** forwardRef
 * là 1 hàm HOC nhận 1 tham số là callback - component
 */
