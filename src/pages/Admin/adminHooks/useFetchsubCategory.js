import { useEffect, useState } from "react"



const useFetchsubCategory = () => {

    const [loading, setLoading] = useState(false)
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const getsubCategoriesList = async () => {
            setLoading(true)

            try {
                const res = await fetch("https://appsala-backend.netlify.app/.netlify/functions/index/subcategory");
                const result = await res.json()

                setSubCategories(result.data)
                console.warn(result.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getsubCategoriesList()
    }, [])


    return { subCategories, loading }

}


export default useFetchsubCategory;