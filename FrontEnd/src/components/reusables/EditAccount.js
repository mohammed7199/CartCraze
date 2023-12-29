import React, { useState } from "react"
import ModalComp from '../reusables/ModalComp'
import RegistrationForm from '../authForm-module/RegistrationForm'
import UserRegister from '../user-module/UserRegister'
import { MdEdit } from "react-icons/md"

const EditAccount = (props) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    return (
        <>
            <ModalComp
                showVariant=""
                handleShow={handleShow}
                showText={<MdEdit size="1.5rem" />}
                show={show}
                handleClose={handleClose}
                size="md"
                titleComponent={<h4 className="ms-3"> Edit Account </h4>}
                bodyComponent={
                    props.role === 'admin' ? (
                        <RegistrationForm {...props} handleClose={handleClose} />
                    ) : (
                        <UserRegister {...props} handleClose={handleClose} />
                    )
                }
                hideVariant="outline-secondary"
                hideText="close"
            />
        </>
    )
}

export default EditAccount