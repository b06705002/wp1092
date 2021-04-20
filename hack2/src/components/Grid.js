import { Component } from "react";

class Grid extends Component {
    render(){
        const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
        // let grid_id = `grid-0-0`;
        // let value_id = `value-0-0`;
        let temp_class_name = 'grid';
        // console.log(this.props.content)
        // #########################
        // # 1 #2 Modify everything here (including the above one) yourself
        // #########################
        var res = [];
        for (let i=0; i<this.props.content.length; i++){
            let grid_id = "grid-"+String(this.props.RowID)+"-"+String(i)
            let value_id = "value-"+String(this.props.RowID)+"-"+String(i)
            let value = this.props.content[i]
            let class_name = temp_class_name + " level-" + String(value)
            if (value === 0) {
                value=''
            }
            value = mapping[value]
            res.push(<td>
                <div className={class_name} id={grid_id}>
                    <div className="school-name" id={value_id}>{value}</div>
                </div>
            </td>)
        }
        return(res)
    }   
}

export default Grid;