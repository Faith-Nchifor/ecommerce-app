function RemoveFromCartBtn({action}) {
    return ( 
        <button 
        className="btn d-block mx-auto btn-dark"
        onClick={action}>Remove From Cart</button>
     );
}

export default RemoveFromCartBtn
;