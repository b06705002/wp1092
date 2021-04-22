import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";

function FakeSheet () {
    const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    //let cur_cell = []
    let value = ""
    let i_data = []
    let t=[]
    let u=[]
    let i_state=[]
    const inputRef = React.createRef();
    const mRef = React.createRef();
    
    for(var j=0; j<27; j++){
        t[j] = alpha[j]
        u[j] = "3"
    }
    i_data.push(t)
    i_state.push(u)
    for(var i=1; i<101; i++){
        t=[i]
        u=["3"]
        for(var j=1; j<27; j++){
            t.push("")
            u.push("0")
        }
        i_data.push(t)
        i_state.push(u)
        ////console.log(i_data[i])
    }

    const [ data, setdata ] = useState(i_data);
    const [ status, setstatus ] = useState(i_state);
    const [ cur_cell, setcur_cell ] = useState([1,1]);
    const [ row_num, setrow ] = useState(100);
    const [ col_num, setcol ] = useState(26);

    useEffect(() => {
        //console.log(cur_cell)
        if(cur_cell[0] !== 1){
            inputRef.current.focus();
            inputRef.current.value=data[cur_cell[0]][cur_cell[1]]
        }
    });
    ////console.log(i_data)
    
/*
    function datacells (){
        let s = ""
        for(var i=1; i<27; i++){
            s += <td className="cell" onClick={click} onDoubleClick={doubleclick}>{data}</td>
        }
    }

    function rows (j) {
        let s = <td className="cell0" >{j}</td>
        for(var i=1; i<27; i++){
            s += <td className="cell" onClick={click} onDoubleClick={doubleclick}>{data[i][j]}</td>
        }
        return(
            <tr>{s}</tr>
        )
    }
    
*/

    function sheet () {
        var rows = data.map(function (item, i){
            var cell = item.map(function (element, j) {
                if(status[i][j]==="0"){
                    return(
                        <td className="cell" id={i+","+j}  onClick={()=>click(i,j)} onDoubleClick={(event)=>doubleclick(event,i,j)}>
                            <input type="text" value={element} onChange={(e)=>key_up(e)}></input>
                        </td>
                    )
                }
                if(status[i][j]==="1"){
                    //console.log("1")
                    return(
                        <td className="cell1" id={i+","+j} onKeyDown={(event)=>key_in(event,i,j)}>
                            <input type="text" ref={inputRef} className="select" onDoubleClick={(event)=>doubleclick(event,i,j)} onChange={(event)=>key_up(event)}></input>
                        </td>
                    )
                }
                if(status[i][j]==="2"){
                    ////console.log("2")
                    return(
                        <td className="cell1" id={i+","+j} onKeyDown={(event)=>key_in(event,i,j)}>
                            <input type="text"  ref={inputRef} onChange={(event)=>key_up(event)}></input>
                        </td>
                    )
                }
                if(status[i][j]==="3"){
                    return(
                        <td className="cell3" id={i+","+j}> {element} </td>
                    )
                }
                if(status[i][j]==="4"){
                    return(
                        <td className="cell4" id={i+","+j}> {element} </td>
                    )
                }
            });
            ////console.log(cell)
            return (
                <tr id={i}> {cell} </tr>
            );
        });
        
        ////console.log(rows)
        return rows
    }

    const click = (i,j) => {
        ////console.log("click")
        store_data()
        let s = status
        s[cur_cell[0]][cur_cell[1]]="0"
        s[i][j]="1"
        s[cur_cell[0]][0]="3"
        s[0][cur_cell[1]]="3"
        s[i][0]="4"
        s[0][j]="4"
        setcur_cell([i, j])
        setstatus(s)
        
    }
    
    const doubleclick = (e,i,j) => {
        ////console.log("2")
        store_data()
        let s = status
        s[cur_cell[0]][cur_cell[1]]="0"
        s[i][j]="1"
        s[cur_cell[0]][0]="3"
        s[0][cur_cell[1]]="3"
        s[i][0]="4"
        s[0][j]="4"
        s[i][j]="2"
        setcur_cell([i, j])
        setstatus(s)
        ////console.log(s[i][j])
        //e.target.value = data[i][j]
        //e.target.focus()
    }

    const change_state = (e,i,j) => {
        let s = status
        s[cur_cell[0]][cur_cell[1]]="0"
        s[i][j]="2"
        setcur_cell([i, j])
        setstatus(s)
    }
    
    const key_in = (e,i,j) => {
        //console.log("in")
        let s = status
        //console.log("down",s[i][j])
        if(s[i][j]==="1"){
            e.target.value=""
            let m_data = data
            s[cur_cell[0]][cur_cell[1]]="0"
            s[cur_cell[0]][0]="3"
            s[0][cur_cell[1]]="3"
            s[i][j]="2"
            s[i][0]="4"
            s[0][j]="4"
            setcur_cell([i, j])
            setstatus(s)
            m_data[i][j] = ""
            setdata(m_data)
        }
        if(e.keyCode == 13 && i<row_num){
            let s = status
            s[i][j]="0"
            s[i+1][j]="1"
            s[i][0]="3"
            s[i+1][0]="4"
            store_data()
            setstatus(s)
            setcur_cell([i+1, j])
        }

    }

    const key_up = (e) => {
        //console.log(e.target.value)
        value = e.target.value
        
    }

    const store_data = () => {
        if(value !== ""){
            let m_data = data
            m_data[cur_cell[0]][cur_cell[1]] = value
            setdata(m_data)
            //console.log("data",data[cur_cell[0]][cur_cell[1]])
        }
        
    }
    
    const addrow = () =>{
        let m_data = data
        let s = status
        setcur_cell([cur_cell[0]+1,cur_cell[1]])
        setrow(row_num+1)
        t=[]
        u=[]
        for(let j=0; j<col_num+1; j++){
            t.push("")
            u.push("0")
        }
        m_data.splice(cur_cell[0], 0, t)
        s.splice(cur_cell[0], 0, u)
        s[cur_cell[0]][0] = "3"
        s[cur_cell[0]+1][cur_cell[1]] = "1"
        for(let i=1; i<row_num+2; i++){
            m_data[i][0] = i
        }
        setdata(m_data)
        setstatus(s)

    }

    const delrow = () =>{
        if(row_num<2){
            return
        }
        let m_data = data
        let s = status
        setrow(row_num-1)
        m_data.splice(cur_cell[0], 1)
        s.splice(cur_cell[0], 1)
        if(cur_cell[0]>=row_num){
            setcur_cell([cur_cell[0]-1,cur_cell[1]])
            s[cur_cell[0]-1][0] = "4"
            s[cur_cell[0]-1][cur_cell[1]] = "1"
        }
        else{
            s[cur_cell[0]][0] = "4"
            s[cur_cell[0]][cur_cell[1]] = "1"
        }
        for(let i=1; i<row_num; i++){
            m_data[i][0] = i
        }
        setdata(m_data)
        setstatus(s)

    }

    const addcol = () =>{
        let m_data = data
        let s = status
        setcur_cell([cur_cell[0],cur_cell[1]+1])
        setcol(col_num+1)
        t=[]
        u=[]
        
        for(let i=0; i<row_num+1; i++){
            m_data[i].splice(cur_cell[1], 0, "")
            s[i].splice(cur_cell[1], 0, "0")
        }
        s[0][cur_cell[1]] = "3"
        for(let i=0; i<col_num+2; i++){
            if(i>26){
                m_data[0][i] = "A"+ alpha[i-26]
            }
            else{
                m_data[0][i] = alpha[i]
            }
        }
        s[cur_cell[0]][cur_cell[1]+1] = "1"
        setdata(m_data)
        setstatus(s)
    }

    const delcol = () =>{
        if(col_num<2){
            return
        }
        let m_data = data
        let s = status
        setcol(col_num-1)
        for(let i=0; i<row_num+1; i++){
            m_data[i].splice(cur_cell[1], 1)
            s[i].splice(cur_cell[1], 1)
        }
        for(let i=0; i<col_num; i++){
            if(i>26){
                m_data[0][i] = "A"+ alpha[i-26]
            }
            else{
                m_data[0][i] = alpha[i]
            }
        }
        if(cur_cell[1]>=col_num){
            setcur_cell([cur_cell[0],cur_cell[1]-1])
            s[0][cur_cell[1]-1] = "4"
            s[cur_cell[0]][cur_cell[1]-1] = "1"
        }
        else{
            s[0][cur_cell[1]] = "4"
            s[cur_cell[0]][cur_cell[1]] = "1"
        }
        setdata(m_data)
        setstatus(s)
    }
    
    ////console.log(cur_cell)
    ////console.log(status[cur_cell[0]][cur_cell[1]])
    return (
        <>
            <Header text="FakeSheet"/>
            <button id="ar" class="block" onClick={() => addrow()}>+</button>
            <button id="dr" class="block" onClick={() => delrow()}>-</button>
            <button id="ac" class="block" onClick={() => addcol()}>+</button>
            <button id="dc" class="block" onClick={() => delcol()}>-</button>

            <table id="spreadsheet">
                <tbody>
                    {sheet()}
                </tbody>
            </table>
            
        </>
    );
    //<Header text="FakeSheet"/>
}

export default FakeSheet;

