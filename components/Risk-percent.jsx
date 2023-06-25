import values from '../hardcodedValues.json';

function myFunction() {
    let risk = document.getElementById("risk-select").value;

    document.getElementById("risk-value").innerHTML = risk;

  }



export default function RiskPercent() {
    
    return (
        <div className="risk-el">
            <label className="dropdown-label" htmlFor="dropdown-label">Risk Type:</label>

            <select id="risk-select" onChange={myFunction}>

                <option id='image-el' value="">Select an option</option>
                <option value={` ${values.Centralization.stETH}%`}>Centralization</option>
                <option value={`${values.CrossLiquidation.wETH}%`}>Cross liquidation</option>

                <option
                    className='exposure'
                    value={`AAVE stETH: ${values.Exposure.AAVE.stETH} wETH: ${values.Exposure.AAVE.wETH} AAVE: ${values.Exposure.AAVE.AAVE}`}>
                    Exposure
                </option>
                
            </select>

            <div className="risk-text">
                <p><span>Risk Factor: </span></p>
                <p id="risk-value"></p>
            </div>
        </div>
    )
}


