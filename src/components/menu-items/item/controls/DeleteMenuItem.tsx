import { useState } from "react";
import { remove } from "../../../../configs/firebase/actions";
import Modal from "../../../../lib/modal/Modal";

const DeleteMenuItem = (props: {
    onDelete: Function;
    id: string
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clickHandler = () => setIsModalOpen(true);
    const modalCloseHandler = () => setIsModalOpen(false);
    
    const deleteMenuItem = () => {
        remove("menu-items", props.id).then(() => {
            setIsModalOpen(false);
            props.onDelete(props.id);
        })
    }
    return(
        <div className="d-flex">
        <button className="btn-controls" onClick={clickHandler}>Delete</button>
        <Modal isOpen={isModalOpen} close={modalCloseHandler}>
          <h2>Delete Menu Item</h2>
          <p>Please Confirm</p>
          <button className="btn-controls" onClick={deleteMenuItem}>Delete</button>
        </Modal>
      </div>
    )
}

export default DeleteMenuItem;