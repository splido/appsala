import React from 'react'
import CategoryDropDown from './adminComponents/CategoryDropDown/CreateCategoryDropDown'

function CreateCategory() {
  return (
    <div className="container admin-create-category">
    <div className="create-category">
        <h2>Create Category</h2>
        <CategoryDropDown />
    </div>
    </div>

  )
}

export default CreateCategory