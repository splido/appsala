function Spinner({type}) {
  return (
    <div className="spinner-container">
    <div className={`spinner ${type}`}></div>
  </div>
  )
}

export default Spinner