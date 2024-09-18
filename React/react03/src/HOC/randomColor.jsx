export default function randomColor(WrappedComponent) {
  const RandomColor = (props) => {
    const randomColor = '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
    return (
      <div style={{ color: randomColor }}>
        <WrappedComponent {...props} />
      </div>
    )
  }

  return RandomColor
}
