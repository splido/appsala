import { useState ,useEffect} from "react"
import toast from "react-hot-toast";



//this  hook is create and update document.

const useCreateApplication = (applicationId) => {

    const [loading, setLoading] = useState(false)
    const [applicationData, setApplicationData] = useState({})


    const fetchProduct = async () => {
        setLoading(true)

        try {
            const res = await fetch(`https://appsala-backend.netlify.app/.netlify/functions/index/product/${applicationId}`)
            const data = await res.json()

            if (data.status === false) {
                toast.error("error");
            } else {
                setApplicationData(data.data)
            }
        } catch (err) {
            toast.error("error 2")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (applicationId) { fetchProduct(applicationId) }
    }, [applicationId])



    const updateProductData = async (updatedData) => {
        if(!applicationId) return
        setLoading(true);
        try {
            const res = await fetch(`https://appsala-backend.netlify.app/.netlify/functions/index/api/admin/update/product/${applicationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            

            const result = await res.json();

            if (result.status === false) {
                toast.error(result.data)
            }else{
                toast.success("Data Updated Successfully")
            }
             // Update the state with the new data
        } catch (err) {
            toast.error(err.message)
           
        } finally {
            setLoading(false);
        }
    };




    const createApplication = async (formData) => {
        setLoading(true)
        console.log(formData)
        try {
            const res = await fetch("https://appsala-backend.netlify.app/.netlify/functions/index/create_products", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })

            const data = await res.json()
            console.log(data)
            if (data.status === false) {
                toast.error(data.message)
                
            } else {
                toast.success("Application Created")
            }

        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }

    }
    return {applicationData, loading, createApplication , updateProductData }


}





export default useCreateApplication