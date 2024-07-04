import { useState } from "react"
import toast from "react-hot-toast";


const useCreateCategory = () => {

    const [loading, setLoading] = useState(false)

    const createCategory = async (form) => {
        setLoading(true)
        console.log(form)
        try {
            const res = await fetch("https://appsala-backend.netlify.app/.netlify/functions/index/create_category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            const data = await res.json();
            console.log(data)
           // console.warn(data)
            if (data.status === false) {
                toast.error('Error:',  data.data)
                
            }else{
                toast.success("Category Created")
                console.log('category created');
            }


            //  setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { loading, createCategory }
}

export default useCreateCategory