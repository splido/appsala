import { useEffect, useState } from "react"



const useFetchCategory = () => {

    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategoriesList = async () => {
            setLoading(true)

            try {
                const res = await fetch("https://appsala-backend.netlify.app/.netlify/functions/index/getcategories");
                const result = await res.json()

                console.log(result.message)
                setCategories(result.message)
                //console.warn(result.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getCategoriesList()
    }, [])


    return { loading , categories}

}


export default useFetchCategory;