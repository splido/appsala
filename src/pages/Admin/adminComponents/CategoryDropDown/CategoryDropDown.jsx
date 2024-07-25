import React, { useState } from 'react';
import useCreateCategory from '../../adminHooks/useCreateCategory';
import Spinner from '../../../../components/Spinner'
const CategoryDropDown = () => {

  const {loading , createCategory } = useCreateCategory()

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        subCategory_ids: [],
        description: '',
        image: { url: '', public_id: '' }
    });

    const [subCategoryFormData, setSubCategoryFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: { url: '', public_id: '' }
    });

    const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
    const [subCategoryButton, setsubCategoryButton] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubCategoryChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryFormData({
            ...subCategoryFormData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
         await  createCategory(formData)
        // Handle form submission, e.g., send data to an API
    };

    const handleAddSubCategory = () => {
        setShowSubCategoryForm(true);
    };

    const handleSubCategorySubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        setFormData({
            ...formData,
            subCategory_ids: [...formData.subCategory_ids, subCategoryFormData]
        });
        setsubCategoryButton(false)

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="slug">Slug:</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="Enter category slug"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter category description"
                       required
                    />
                </div>

                {showSubCategoryForm && (
                    <div>
                        <form >
                            <div>
                                <button
                                    type="button"
                                    onClick={() => { setShowSubCategoryForm(false) }}
                                    className="button"
                                >
                                    &#x2716;
                                </button>
                                <h3 >Add Subcategory</h3>

                                <label htmlFor="subName">SubCategory name</label>
                                <input
                                    type="text"
                                    id="subName"
                                    name="name"
                                    value={subCategoryFormData.name}
                                    onChange={handleSubCategoryChange}
                                    placeholder="Enter subcategory name"
                                    required
                                />

                                <div className="mb-4">
                                    <label htmlFor="subSlug">Slug:</label>
                                    <input
                                        type="text"
                                        id="subSlug"
                                        name="slug"
                                        value={subCategoryFormData.slug}
                                        onChange={handleSubCategoryChange}
                                        placeholder="Enter category slug"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="subDescription">Subcategory Description:</label>
                                    <textarea
                                        id="subDescription"
                                        name="description"
                                        value={subCategoryFormData.description}
                                        onChange={handleSubCategoryChange}
                                        placeholder="Enter subcategory description"
                                        required
                                    />
                                </div>
                            </div>


                            {
                                subCategoryButton ? (<button
                                    type="submit"
                                    onClick={handleSubCategorySubmit}
                                    className="button"
                                >
                                    {!showSubCategoryForm ? "Add Subcategory" : "Create Subcategory"}
                                </button>)
                                    :
                                    (
                                        <div>
                                            Created!  now you can submit Category
                                        </div>
                                    )
                            }
                        </form>
                    </div>
                )}

                <div className="button-div">
                    <button
                        type="submit"
                        className="btn btn-light"
                        style={{marginRight: '10px'}}
                    >
                    {loading ? <Spinner/> : "Submit"}
                    </button>

                    {!showSubCategoryForm && <button
                        type="button"
                        onClick={handleAddSubCategory}
                        className="btn btn-light"
                    >
                        Add Subcategory
                    </button>}
                </div>
            </form>
        </div>
    );
};

export default CategoryDropDown;
