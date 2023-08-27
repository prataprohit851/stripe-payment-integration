import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom"


let planExport = {
    "duration": "",
    "code": "",
    "price": 0
}

function Plan(){
    const navigate = useNavigate();

    const [planDuration, setPlanDuration] = useState("Yearly");
    const [planCode, setPlanCode] = useState("Premium");
    
    const submitPlan = async(e) =>{
        e.preventDefault();
        let planDetails = {
            "duration": planDuration,
            "code": planCode
        }

        planExport.duration = planDuration;
        planExport.code = planCode;

        const result = await fetch( '/plan', {
            method: 'post',
            body: JSON.stringify(planDetails),
            headers:{
                'Content-Type': 'application/json'
            }
        });

        const returnData = await result.json();
        console.log(returnData);
        planExport.price = returnData.price;
        navigate("/payment");

    }

    function handleClicks(){

    }


    return(
        <div className="plan-table">
            <form method="POST">
                <h1 className="table-heading">Choose the right plan for you</h1>
                <table id="table1" cellPadding="50px">
                    <tr>
                        <th backgroundColor="white">
                            <div id="Monthly-Yearly">
                                <input id="Monthly" type="radio" name="plan-duration" onClick={(e) => setPlanDuration('Monthly')}></input>
                                <label htmlFor="Monthly">Monthly</label>
                                <input id="Yearly" type="radio" name="plan-duration" onClick={(e) => setPlanDuration('Yearly')} defaultChecked={true}></input>
                                <label htmlFor="Yearly">Yearly</label>
                            </div>
                        </th>
                        <th>
                            <input className="plan" id="Mobile" type="radio" name="plan-code" onClick={(e) => setPlanCode('Mobile')}></input>
                            <label className="plan" htmlFor="Mobile">Mobile</label>
                            <span className="triangle" style={{visibility:(planCode==="Mobile" ? "visible" : "hidden" )}}></span>
                        </th>

                        <th>
                            <input className="plan" id="Basic" type="radio" name="plan-code" onClick={(e) => setPlanCode('Basic')}></input>
                            <label className="plan" htmlFor="Basic">Basic</label>
                            <span className="triangle" style={{visibility:(planCode==="Basic" ? "visible" : "hidden" )}}></span>
                        </th>

                        <th>
                            <input className="plan" id="Standard" type="radio" name="plan-code" onClick={(e) => setPlanCode('Standard')}></input>
                            <label className="plan" htmlFor="Standard">Standard</label>
                            <span className="triangle" style={{visibility:(planCode==="Standard" ? "visible" : "hidden" )}}></span>
                        </th>

                        <th>
                            <input className="plan" id="Premium" type="radio" name="plan-code" onClick={(e) => setPlanCode('Premium')} defaultChecked={true}></input>
                            <label className="plan" htmlFor="Premium">Premium</label>
                            <span className="triangle" style={{visibility:(planCode==="Premium" ? "visible" : "hidden" )}}></span>
                        </th>
                        
                    </tr>
                    <tr className="bottom-border">
                        <td>Monthly price</td>
                        <td><span className={(planCode === 'Mobile' ? "selected" : "")}>&#8377; {planDuration === 'Monthly' ? "100" : "1000"}</span></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>&#8377; {planDuration === 'Monthly' ? "200" : "2000"}</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>&#8377; {planDuration === 'Monthly' ? "500" : "5000"}</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>&#8377; {planDuration === 'Monthly' ? "700" : "7000"}</span></td>
                    </tr>
                    <tr className="bottom-border">
                        <td>Video quality</td>
                        <td><span className={(planCode === 'Mobile' ? "selected" : "")}>Good</span></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>Good</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>Better</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>Best</span></td>
                    </tr>
                    <tr className="bottom-border">
                        <td>Resolution</td>
                        <td><span className={(planCode === 'Mobile' ? "selected" : "")}>480p</span></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>480p</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>1080p</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>4K+HDR</span></td>
                    </tr>
                    <tr>
                        <td>Devices you can use to watch</td>
                        <td><span className={(planCode === 'Mobile' ? "selected" : "")}>Phone</span></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>Phone</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>Phone</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>Phone</span></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><span className={(planCode === 'Mobile' ? "selected" : "")}>Tablet</span></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>Tablet</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>Tablet</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>Tablet</span></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>Computer</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>Computer</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>Computer</span></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><span className={(planCode === 'Basic' ? "selected" : "")}>TV</span></td>
                        <td><span className={(planCode === 'Standard' ? "selected" : "")}>TV</span></td>
                        <td><span className={(planCode === 'Premium' ? "selected" : "")}>TV</span></td>
                    </tr>
                </table>
                <span className="btn-centre"><button type="submit" onClick={submitPlan} className="pay-btn btn btn-primary">Next</button></span>
            </form>
        </div>
    );
}

export {planExport};
export default Plan;