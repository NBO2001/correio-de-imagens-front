import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = (tost,msg) => {
    switch(tost){
        case "Error":
            return toast.error(msg);
        case "Warn":
            return toast.warn(msg);
        case "Success":
            return toast.success(msg);
            
        default:
            return toast(msg);
    }
};

export default notify