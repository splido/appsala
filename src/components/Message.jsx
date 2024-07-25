const Message = ({children, variant}) => {
    return (
      <div className={`alert ${variant}`}>
          {children}
      </div>
    )
  }
  
  export default Message