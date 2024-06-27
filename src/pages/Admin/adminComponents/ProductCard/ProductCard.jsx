import React from 'react';
import useFetchApplication from '../../adminHooks/useFetchApplication';
import shortDescription from "../../adminUtils/shortDescription"
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import {filterData} from "../../adminUtils/filterSearchInput"
import Spinner from '../../../../components/Spinner';


function ProductCard({selectedValue}) {
    const { loading, data } = useFetchApplication();

    const filteredData = filterData(data,selectedValue)
    
    

    return (
        <div className="admin-cards">
            {!loading ? (filteredData.map((product) => (
                <div key={product._id} className='admin-card'>
                    
                        <figure>
                            <img
                                src={product.logo}
                                alt=""
                                style={{ width: '100px', height: '100px' }}
                            />
                        </figure>
                        <div className='admin-card-heading-para'>
                            <h2>{product.shortname}</h2>
                            <p>{shortDescription(product.shortDescription)}</p>
                            </div>
                            <div className="flex card-button-div">
                                <button className="button"><MdDelete />Delete</button>
                                <div></div> {/* Adjust the margin as needed */}
                                <Link to={`/admin/update-application/${product._id}`}>  <button className="button"><MdModeEdit />Edit</button></Link>
                            </div>
                </div>
            ))) :
                (<div>
                    <Spinner/>
                </div>)
            }
        </div>
    );
}

export default ProductCard;
