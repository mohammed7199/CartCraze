import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalComp = (props) => {
    const { showVariant, handleShow, showText, show, handleClose, size, titleComponent, bodyComponent, hideVariant, hideText } = props

    return (
        <>
            <Button variant={ showVariant } onClick={ handleShow }>
                { showText }
            </Button>

            <Modal 
                show={ show } 
                onHide={ handleClose } 
                size={ size }
                aria-labelledby="contained-modal-title-vcenter" 
                centered  
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">{ titleComponent }</Modal.Title>
                </Modal.Header>

                <Modal.Body>    
                    { bodyComponent }
                </Modal.Body>

                {/* <Modal.Footer>
                    <Button variant={ hideVariant } onClick={ handleClose }>
                        { hideText }
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}

export default ModalComp