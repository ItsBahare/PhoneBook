
import './popup.css';
import { AiOutlineClose } from 'react-icons/ai';

function PopUp(props){

return(props.trigger)?(
    <div className="popup">
        <div className="popup-inner">
            <AiOutlineClose className="close-btn"onClick={()=>props.setTrigger(false)}>close</AiOutlineClose>
            {props.children}
        </div>
    </div>
):""
}

export default PopUp;