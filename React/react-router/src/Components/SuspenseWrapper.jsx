import { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
export default function SuspenseWrapper({ path }) {
  const LazyComponent = lazy(() => import(path))
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <LazyComponent />
    </Suspense>
  )
}

SuspenseWrapper.propTypes = {
  path: PropTypes.string.isRequired
}

/*
lazy
Suspense
import dynamic
*/
