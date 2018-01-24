import * as React from "react";
import Portal from "components/misc/Portal";
import "./modal.scss";

interface IModalProps {
    onclose: () => any;
    title: string;
    className?: string;
    children?: any;
}

const Modal = (props: IModalProps) => (
    <Portal>
        <div className="modal">
            <div onClick={props.onclose} className="modal__background" />
            <div className="modal__container">
                <div className={"modal__item " + props.className}>
                    <div className="modal__head">
                        <header className="modal__title">{props.title}</header>
                        <span onClick={props.onclose} className="modal__close">
                            ✖
                        </span>
                    </div>
                    <div className="modal__body">{props.children}</div>
                </div>
            </div>
        </div>
    </Portal>
);

export default Modal;
