import ProductCard from './adminComponents/ProductCard/ProductCard'


const AdminDashboard = ({selectedValue}) => {
    return (
      <div>
        <div className="container">
          <ProductCard selectedValue = {selectedValue}/>
          </div>
      </div>
    )
}

export default AdminDashboard


