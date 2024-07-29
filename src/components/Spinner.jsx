function Spinner({type}) {
  return (
    <div className="spinner-parent">
    <div className="spinner-container">
    <div className={`spinner ${type}`}></div>
  </div>
  </div>
  )
}

export default Spinner