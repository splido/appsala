import React, { useState ,useEffect} from 'react';

function YearDropDown({onYearChange,yearData}) {
   const [foundedYear, setFoundedYear] = useState(null);

    // Generate an array of years from 1900 to 2100
    const years = Array.from({ length: 2100 - 1900 + 1 }, (_, i) => 1900 + i);
    
    const handleYearChange = (event) => {
        setFoundedYear(event.target.value)
        onYearChange(event.target.value);
    };


   
    useEffect(()=>{
    if(yearData && yearData){
        setFoundedYear(yearData)
    }
    },[yearData])

    

    return (
        <div>
            <label htmlFor="year">
                Year
            </label>
            <select
                id="year"
                name="year"
                value={onYearChange.year}
                onChange={handleYearChange}
             required
            >
                <option value="">{foundedYear?foundedYear:"Select a year"}</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default YearDropDown;
