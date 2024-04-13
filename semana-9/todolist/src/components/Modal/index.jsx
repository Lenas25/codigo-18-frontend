export default function Modal(props) {
  return (
    <>
      <div id="modal" className={`relative z-50 ${props.open ? "" : "hidden"}`}>
        <div className="inset-0 fixed bg-black/30"></div>
        <div className="border fixed inset-0 w-screen p-6 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md mx-auto w-full max-w-md">
            <div
              className="text-right cursor-pointer"
              onClick={props.handleClose}>
              ❌
            </div>
            <div id="modal-title">
              <h2 className="text-center text-lg font-semibold">
                {props.title}
              </h2>
            </div>
            <div id="modal-content">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
