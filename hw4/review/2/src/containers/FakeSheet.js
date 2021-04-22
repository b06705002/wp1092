import React, {useState} from "react";
import Table from "./Table"

function FakeSheet (){
    
    return (
            <div className='view-all'>
                
                {/* <div className='margin-vertical'>
                    <div className='margin-vertical_view_button'>
                        <button>+</button>
                        <button>-</button>
                    </div>
                    <Table />                    
                </div> */}
                <Table />
            </div>
    );
}

export default FakeSheet;

