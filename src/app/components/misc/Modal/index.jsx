import * as m from "mithril";
import Portal from "components/misc/Portal";
import "./modal.scss";

const Modal = {
    view({ attrs, children }) {
        return (
            <Portal>
                <div className="modal">
                    <div onclick={attrs.onclose} className="modal__background" />
                    <div className="modal__container">
                        <div className={"modal__item " + attrs.className}>
                            <div className="modal__head">
                                <header className="modal__title">{attrs.title}</header>
                                <span onclick={attrs.onclose} className="modal__close">
                                    ✖
                                </span>
                            </div>
                            <div className="modal__body">{children}</div>
                        </div>
                    </div>
                </div>
            </Portal>
        );
    },
};

export default Modal;
