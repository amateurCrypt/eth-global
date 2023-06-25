

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
                <option value="10%">Chain liquidation</option>
                <option value="7.9%">Centralization</option>
                <option value="4.9%">Platform risk</option>
            </select>

            <div className="risk-text">
                <p><span>Risk Factor: </span></p>
                <p id="risk-value"></p>
            </div>
        </div>
    )
}


