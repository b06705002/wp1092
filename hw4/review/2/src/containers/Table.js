import React, {useState, useEffect} from "react";
import Header from "../components/Header";

function Table(){
    // var ID_cnt = 0
    const [col_num, setColNum] = useState(26)
    const [row_num, setRowNum] = useState(100)
    const col_name = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ','AR']
    const row_name = Array.apply(null, Array(150)).map(function (_, i) {return i+1;});
    var textInput = []
    for (var c = 0; c < col_num; c++){
        var t = []
        for(var r = 0; r < row_num; r++){
            t.push(React.createRef())
        }
        textInput.push(t)
    }

    //Initialize state
    var tmp_col_highlight = []
    for(var c = 0; c < col_num; c++){
        tmp_col_highlight.push(false)
    }
    var tmp_row_highlight = []
    for(var c = 0; c < col_num; c++){
        tmp_row_highlight.push(false)
    }
    var cell_tmp = []
    for (var c = 0; c < col_num; c++){
        var tmp = []
        for(var r = 0; r < row_num; r++){
            tmp.push(false)
            // ID_cnt = ID_cnt+1
            //setIDCnt(ID_cnt=> ID_cnt+1);
        }
        cell_tmp.push(tmp)
    }
    var content_tmp = []
    for (var c = 0; c < col_num; c++){
        var tmp = []
        for(var r = 0; r < row_num; r++){
            tmp.push('')
            //setIDCnt(ID_cnt=> ID_cnt+1);
        }
        content_tmp.push(tmp)
    }
    const [col_highlight, setColHighlight] = useState(tmp_col_highlight)
    const [row_highlight, setRowHighlight] = useState(tmp_row_highlight)
    const [cell_focus , SetCellFocus] = useState(cell_tmp) //[c][r]
    const [content, setContent] = useState(content_tmp)
    const [ifFocus, setIfFocus] = useState(false)
    const [focusIdx, setFocusIdx] = useState([-1,-1])
    
    function get_col_row_by_ID(id){
        var col = 0
        var row = 0
        var tmp = id.split('-')
        col = parseInt(tmp[0], 10);
        row = parseInt(tmp[1], 10)
        return[col, row]
    }

    var timer = 0
    const[delay, setDelay] = useState(250)
    var prevent = false

    function SimpleClick(e, c,r){
        console.log('Single click')
        e.target.select()

        var new_cell = [...cell_focus]
        new_cell[c][r] = true

        var new_col = [...col_highlight]
        new_col[c] = true
        
        var new_row = [...row_highlight]
        new_row[r] = true
        setIfFocus(ifFocus=>true)
        setFocusIdx(focusIdx=>[c, r])
        SetCellFocus(cell_focus=>new_cell)
        setColHighlight(col_highlight=>new_col)
        setRowHighlight(row_highlight=>new_row)
    }

    function DoubleClick(e, c, r){
        console.log('Double click')
        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)

        var new_cell = [...cell_focus]
        new_cell[c][r] = true

        var new_col = [...col_highlight]
        new_col[c] = true
        
        var new_row = [...row_highlight]
        new_row[r] = true

        SetCellFocus(cell_focus=>new_cell)
        setColHighlight(col_highlight=>new_col)
        setRowHighlight(row_highlight=>new_row)
        setIfFocus(ifFocus=>true)
        setFocusIdx(focusIdx=>[c, r])
    }

    function handle_click(e) {
        console.log(e.target.id)
        timer = setTimeout(() => {
        if (!prevent) {
            var tmp = get_col_row_by_ID(e.target.id)
            const c = tmp[0]
            const r = tmp[1]
            SimpleClick(e, c, r)
        }
        prevent = false
        }, delay)
    }
    function handle_dbClicked(e){
        // Prevent click and double click to conflict
        clearTimeout(timer)
        prevent=true
        var tmp = get_col_row_by_ID(e.target.id)
        const c = tmp[0]
        const r = tmp[1]
        DoubleClick(e, c, r)
    }

    const unFocus = (e) => {
        const ID = e.target.id
        var tmp = get_col_row_by_ID(ID)
        const c = tmp[0]
        var r = tmp[1]

        var new_cell = [...[...cell_focus]]
        new_cell[c][r] = false
        SetCellFocus(cell_focus=>new_cell)
        setIfFocus(ifFocus=>false)

        var new_col = [...col_highlight]
        new_col[c] = false
        setColHighlight(col_highlight=>new_col)

        var new_row = [...row_highlight]
        new_row[r] = false
        if (r+1 < row_num){
            new_row[r+1] = false
        }
        setRowHighlight(row_highlight=>new_row)
    };

    function Keying(e)
    {
        const ID = e.target.id
        var tmp = get_col_row_by_ID(ID)
        const c = tmp[0]
        var r = tmp[1]
        var new_content = [...content]

        var str = e.target.value
        new_content[c][r] = str
        setContent(content=>new_content)

        if(e.key === 'Enter') {
            handleEnter(e)
        }
    }


    function handleEnter(e){
        if(e.key!=='Enter'){
            return
        }

        tmp = get_col_row_by_ID(e.target.id)
        c = tmp[0]
        r = tmp[1]

        console.log('Enter')
        var new_cell = [...[...cell_focus]]
        new_cell[c][r] = false

        var new_col = [...col_highlight]

        var new_row = [...row_highlight]
        new_row[r] = false

        if (r+1 < row_num){
            r = r+1
        }
        new_cell[c][r] = true
        SetCellFocus(cell_focus=>new_cell)
        setIfFocus(ifFocus=>true)
        setFocusIdx(focusIdx=>[c, r])

        
        console.log('highlight')
        document.getElementById(`${c}-${r}`).focus()
        new_col[c] = true
        setColHighlight(col_highlight=>new_col)

        new_row[r] = true
        setRowHighlight(row_highlight=>new_row)
    }

    function addRow(){
        console.log("ifFocus:", ifFocus)
        
        var row_idx = focusIdx[1]
        if(!ifFocus){
            row_idx = row_num
        }
        var new_content = []
        for (var c = 0; c < col_num; c++){
            var tmp = []
            for(var r = 0; r < (row_num+1); r++){
                if(r < row_idx){
                    tmp.push(content[c][r])
                }
                else if(r === row_idx){
                    tmp.push('')
                }
                else{
                    tmp.push(content[c][r-1])
                }
            }
            new_content.push(tmp)
        }

        setContent(content=>new_content)
        
        var new_cell = []
        for (var c = 0; c < col_num; c++){
            var tmp = []
            for(var r = 0; r < (row_num+1); r++){
                tmp.push(false)
            }
            new_cell.push(tmp)
        }
        SetCellFocus(cell_focus=>new_cell)
        setRowNum(row_num=>row_num+1)
        setIfFocus(ifFocus=>false)
    }

    function deleteRow(){
        if(!ifFocus || row_num < 1){
            return
        }
        var row_idx = focusIdx[1]
        var new_content = []
        for (var c = 0; c < col_num; c++){
            var tmp = []
            for(var r = 0; r < row_num; r++){
                if(r < row_idx){
                    tmp.push(content[c][r])
                }
                else if(r > row_idx){
                    tmp.push(content[c][r])
                }
            }
            new_content.push(tmp)
        }
        setContent(content=>new_content)
        
        var new_cell = []
        for (var c = 0; c < col_num; c++){
            var tmp = []
            for(var r = 0; r < (row_num-1); r++){
                tmp.push(false)
            }
            new_cell.push(tmp)
        }
        SetCellFocus(cell_focus=>new_cell)
        setRowNum(row_num=>row_num-1)
        setIfFocus(ifFocus=>false)
    }

    function addCol(){        
        var col_idx = focusIdx[0]
        if(!ifFocus){
            col_idx = col_num
        }
        var new_content = []
        for (var c = 0; c < (col_num+1); c++){
            var tmp = []
            if(c < col_idx){
                tmp = [...content[c]]
            }
            else if(c === col_idx){
                for (var r = 0; r < row_num; r++){
                    tmp.push('')
                }
            }
            else{
                tmp = [...content[c-1]]
            }
            new_content.push(tmp)
        }
        setContent(content=>new_content)

        var new_cell = []
        for (var c = 0; c < (col_num+1); c++){
            var tmp = []
            for(var r = 0; r < row_num; r++){
                tmp.push(false)
            }
            new_cell.push(tmp)
        }
        SetCellFocus(cell_focus=>new_cell)
        setColNum(col_num=>col_num+1)
        setIfFocus(ifFocus=>false)
    }

    function deleteCol(){
        if(!ifFocus || col_num < 1){
            return
        }
        var col_idx = focusIdx[0]
        var new_content = []
        for (var c = 0; c < col_num; c++){
            if(c < col_idx){
                var tmp = [...content[c]]
                new_content.push(tmp)
            }
            else if(c > col_idx){
                var tmp = [...content[c]]
                new_content.push(tmp)
            }
        }
        setContent(content=>new_content)
        
        var new_cell = []
        for (var c = 0; c < col_num-1; c++){
            var tmp = []
            for(var r = 0; r < row_num; r++){
                tmp.push(false)
            }
            new_cell.push(tmp)
        }
        SetCellFocus(cell_focus=>new_cell)
        setColNum(col_num=>col_num-1)
        setIfFocus(ifFocus=>false)
    }

    
    function row_index(){
        var row_idx = []
        row_idx.push(<input className='header_cell' disabled  />)
        for(let i = 0; i < row_num; i++){
            row_idx.push(<input className='header_cell' disabled value={row_name[i]} style={row_highlight[i]? {background:'rgb(119, 178, 212)'}:{background:'rgb(210, 234, 248)'}}/>)
        }
        return row_idx
    }
    

    function column(c){
        var tmp = []
        tmp.push(<input className='header_cell' disabled value={col_name[c] } style={col_highlight[c]? {background:'rgb(119, 178, 212)'}:{background:'rgb(210, 234, 248)'}}/>)
        for(let r = 0; r  < row_num; r++){
            tmp.push(<input className='cell' value={content[c][r]} onChange={Keying} id={`${c}-${r}`} style={cell_focus[c][r]?{outlineColor: 'rgb(26, 89, 182)'}:{}}  onClick={(e)=>{handle_click(e)}} onDoubleClick={(e)=>{handle_dbClicked(e)}} onKeyUp={(e)=>handleEnter(e)} onBlur={(e)=>{unFocus(e)}} />) //value={cell[c][r]['content']}
        } //onClick={()=>handleClick(cell[c][r]['ID'])
        return tmp
    }

    function table_content(){
        var tmp = []
        tmp.push(<div className='view-col'>{row_index()}</div>)
        for(let c = 0; c < col_num; c++){
            tmp.push(<div className='view-col'>{column(c)}</div>)
        }

        return tmp
    }
    console.log(ifFocus)
    return(
        <>
            <Header addCol={addCol} deleteCol={deleteCol}/>
            <div className='margin-vertical'>
                <div className='margin-vertical_view_button'>
                    <button onMouseDown={addRow}>+</button>
                    <button onMouseDown={deleteRow}>-</button>
                </div>
                {table_content()}                   
            </div>
        </>
    );
};

export default Table;