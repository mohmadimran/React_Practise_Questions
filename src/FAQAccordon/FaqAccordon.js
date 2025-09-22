
export default function FaqAccordion() {

    const faqs = [
        { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
        { question: "What is an Accordion?", answer: "An accordion is a UI component that shows or hides content when you click a header." },
        { question: "Can I open multiple items?", answer: "In this version, only one panel can be open at a time." },
    ];

   

    return (
        <div className="faq-container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
                {
                    faqs.map((list,index)=>(
                        <details key={index}>
                        <summary>{list.question}</summary>
                        <p>{list.answer}</p>
                        </details>
                    ))
                    }
             </div>
        </div>
    );
}

// import { useState } from "react";

// export default function FaqAccordon() {
//     const [open, setOpen] = useState(null)
//     const faqs = [
//         { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
//         { question: "What is an Accordion?", answer: "An accordion is a UI component that shows or hides content when you click a header." },
//         { question: "Can I open multiple items?", answer: "In this version, only one panel can be open at a time." },
//     ];

//     const handleClick = (index) => {
//         setOpen(prev => prev === index ? null : index)
//     }
//     return (
//         <>

//             <button></button>
//             <div>{
//                 faqs.map((list, index) => (
//                     <div key={index}>
//                         <button
//                             style={{ display: "block" }}
//                             key={index}
//                             onClick={() => handleClick(index)}
//                         >{list.question}
//                             <span>{open === index ? "-" : "+"}</span>
//                         </button>
//                         <div>{open === index && <>{list.answer}</>}</div>
//                     </div>

//                 ))
//             }</div>
//         </>
//     )
// }