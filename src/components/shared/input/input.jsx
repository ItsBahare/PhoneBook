import "./input.css"
function Input({id,onChange,value}) {
    return (  
        <div >
            <input id={id} onChange={onChange} value={value} />
            
        </div>
    );
}

export default Input;