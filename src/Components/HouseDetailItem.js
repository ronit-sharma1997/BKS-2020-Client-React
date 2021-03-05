import React from 'react'

const HouseDetailItem = ({header,value,firstRow}) => {
    
    return (
        <div className="col-12 col-md-6">
            <div className={firstRow ? "" :"pt-2 pb-2"} style={firstRow ? {} : {borderTop: "1px solid #ccc" }}>
                <span style={{ fontWeight: '600' }}>{header}:</span>
                {" " + value }
            </div>
        </div>
    )
}
export default HouseDetailItem