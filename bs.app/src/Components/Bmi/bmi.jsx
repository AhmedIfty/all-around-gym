import "./bmi.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Bmicalc = () => {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const calculateBmi = () => {
        const bmiHeight = parseFloat(height) / 100;
        const bmiWeight = parseFloat(weight);

        if (!(bmiHeight > 0 && bmiWeight > 0)) {
            setBmi("");
            setMessage("");
            alert("Please enter valid height and weight");
            return;
        }

        const bmiValue = (bmiWeight / (bmiHeight * bmiHeight)).toFixed(2);
        setBmi(bmiValue);

        let text = "";
        if (weight > 150) {
            text = "No hope";
        } else if (bmiValue < 18.5) {
            text = "Patlu";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            text = "Basic Bitch";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            text = "Fluffy";
        } else {
            text = "Dmmm";
        }
        setMessage(text);
    };

    const handleButtonClick = () => {
        navigate("/diet-plans");
    };

    return (
        <div className="card1">
            <h2>BMI Calculator</h2>
            <label htmlFor="weight">Weight (kg):</label>
            <input
                type="number"
                id="weight"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <label htmlFor="height">Height (cm):</label>
            <input
                type="number"
                id="height"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <button onClick={calculateBmi}>Calculate</button>
            {bmi && message && (
                <div className="result1">
                    <p>Your BMI is: {bmi} - {message}</p>
                    <button className="navigateButton" onClick={handleButtonClick}>
                        Go to Recommendations
                    </button>
                </div>
            )}
        </div>
    );
};

export default Bmicalc;



// import "./bmi.scss";
// import { useState } from "react";

// const Bmicalc=()=>{
//     const [height, setHeight] = useState("");
//     const [weight,setWeight] = useState("");
//     const [bmi, setBmi] = useState("");
//     const [message, setMessage] = useState("");

//     const calculateBmi=()=>{
//         const bmiHeight=parseFloat(height)/100;
//         const bmiWeight=parseFloat(weight);

//         if (!(bmiHeight>0 && bmiWeight>0)){
//             setBmi("");
//             setMessage("");
//             alert("Please enter valid height and weight");
//             return;
//         }

//         const bmiValue=(bmiWeight/(bmiHeight*bmiHeight)).toFixed(2);
//         setBmi(bmiValue);

//         let text="";
//         if (weight> 150){
//             text="No hope";
//         }
//         else if (bmiValue<18.5){
//             text="Patlu";
//         } else if (bmiValue>18.5 && bmiValue<25){
//             text="Basic Bitch";
//         } else if (bmiValue>25 && bmiValue<30){
//             text="Fluffy";
//         } else{
//             text="Dmmm";
//         } 
//         setMessage(text);       


//     };
//     return (
//         <div className="card">
//         <h2>BMI Calculator</h2>
//         <label htmlFor="weight">Weight (kg):</label>
//         <input 
//             type="number" 
//             id="weight" 
//             placeholder="Enter your weight" 
//             value= {weight}
//             onChange={(e)=>setWeight(e.target.value)}
//         /> 
//         <label htmlFor="height">Height (cm):</label>
//         <input 
//             type="number" 
//             id="height" 
//             placeholder="Enter your height"
//             value={height}
//             onChange={(e)=>setHeight(e.target.value)} 
//         />
//         <button onClick={calculateBmi}>Calculate</button>
//         {bmi && message && (
//             <div className="result">
//                 Your BMI is: {bmi}-{message}
//             </div>
//         )}
//         </div>
//     );
// };

// export default Bmicalc;