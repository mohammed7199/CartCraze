import React from "react";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { startDeleteProduct } from "../../actions/productsAction";
import DeleteIcon from "@material-ui/icons/Delete";
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
    background-color: #fff;
  }
`;

const DeleteProduct = ({ _id }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await dispatch(startDeleteProduct(_id));
        Swal.fire('Deleted!', 'The product has been deleted.', 'success');
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'An error occurred while deleting the product.', 'error');
      }
    }
  };

  return (
    <div>
      <StyledIconButton style={{ border: '1px solid #fff', backgroundColor: '#fff' }} onClick={handleDelete}>
        <DeleteIcon fontSize="medium" />
      </StyledIconButton>
    </div>
  );
};

export default DeleteProduct;