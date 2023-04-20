

function Popup(props){



    return(props.trigger) ? (
        <div className='popup' style={{postion: 'fixed', top: "0px", left: "0px", width: "100%", height: "100vh", backgroundColor: "rgba(0,0,0,0.2)", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className='popup-inner' style={{position: "relative", padding: "32px", width: "100%", maxWidth:"640px", border: "5px solid #ec84a1", color: "#ec84a1", backgroundColor: "#fff1eb"}}>
                <button className='close-btn' onClick={() => props.setTrigger(false)} style={{position: "absolute", top: "16px", right: "16px"}}>x</button>
                {props.children}
            </div>
        </div>
    ) : "";

}

export default Popup