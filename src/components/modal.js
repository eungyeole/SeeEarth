function Modal({state, setState,src, trans, setTrans}){
    return(
        <>
            {
                state ?
                    <div className="modal">
                        <div className="modal-contents">
                            <img src={src}></img>
                        </div>
                        <div onClick={()=>setState(false)} className="modal-overlay"></div>
                    </div>
                : trans ?
                    <div className="modal">
                        <div className="modal-contents">
                            <img src={src}></img>
                            <p>{trans.title}</p>
                            <p>{trans.description}</p>
                        </div>
                        <div onClick={()=>setTrans(null)} className="modal-overlay"></div>
                    </div>
                :null
            }
        </>
    )
}
export default Modal;