

function Btn({onClick,children}) {
    return ( 
            <button className="add-button" onClick={onClick}>{children}</button>
     );
}

export default Btn;