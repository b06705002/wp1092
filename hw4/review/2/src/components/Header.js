import React from "react";
function Header(props){
    console.log('props', props)
    return(
        <>
            <div className="margin-horizontal">
                <div className="margin-horizontal_view_button">
                    <button onMouseDown={props.addCol}>+</button>
                    <button onMouseDown={props.deleteCol}>-</button>
                </div>
            </div>
            
        </>
    )
        
};
export default Header;
