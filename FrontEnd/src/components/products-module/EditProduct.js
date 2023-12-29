import React, { useState, useEffect } from "react";
import AddProduct from "./AddProduct";
import ModalComp from "../reusables/ModalComp";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: background-color 0.5s ease, color 0.5s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    background-color: #fff; /* Brighter background color on hover */
  }
`;

const EditProduct = (props) => {
  const { name, price, _id, description, categories } = props;
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    _id: "",
    description: '',
    categories: '',
  });

  useEffect(() => {
    setFormData({
      name,
      price,
      description,
      _id,
      categories
    });
  }, [_id, categories, description, name, price]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <StyledIconButton style={{ border: '1px solid #fff', backgroundColor: '#fff', marginLeft: '-20px' }}>
        <ModalComp
          showVariant=""
          handleShow={handleShow}
          showText={<EditIcon fontSize="medium" />}
          show={show}
          handleClose={handleClose}
          size="md"
          titleComponent={<h4 className="ms-3"> Edit Product </h4>}
          bodyComponent={
            <AddProduct
              formData={formData}
              productId={_id}
              handleClose={handleClose}
            />
          }
          hideVariant="outline-secondary"
          hideText="close"
        />
      </StyledIconButton>
    </>
  );
};

export default EditProduct;