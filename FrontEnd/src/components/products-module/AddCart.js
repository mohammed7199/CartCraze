import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddToCart } from '../../actions/cartActions';
import { ShoppingCartOutlined } from '@material-ui/icons';
import styled, { keyframes } from 'styled-components';

const rotateAndScale = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0.5;
  }
`;

const CartIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  svg {
    color: black;
    transition: color 0.5s ease;
  }

  &:hover {
    background-color: #008080;
    svg {
      color: #fff;
    }
  }

  &:active {
    animation: ${rotateAndScale} 0.3s ease-in-out;
  }
`;


const AddCart = (props) => {
  const { _id, name, price, image } = props;
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.customer.data?._id);

  const [quantity, setQuantity] = useState(1);

  const handleCart = () => {
    if (!userId) {
      console.error('User not logged in.');
      return;
    }

    const cartBody = {
      productId: _id,
      userId: userId,
      quantity: quantity,
      name: name,
      price: price,
      image: image
    };

    dispatch(startAddToCart(cartBody, _id));
  };

  return (
    <CartIcon
      onClick={userId ? handleCart : null}
      disabled={!userId}
    >
      <ShoppingCartOutlined fontSize="medium" />
    </CartIcon>
  );
};

export default AddCart;