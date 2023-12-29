import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { startGetCart } from '../../actions/cartActions';
import CartList from "./CartList";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Text = styled.span`
  font-weight: normal;
  font-size: 24px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  color: #FF6347;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #3498db;
  margin-top: 10px;
  font-size: 18px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #1f618d;
  }

  svg {
    margin-right: 5px;
  }
`;

const Cart = (props) => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state.customer.data);
  const userId = customerData ? customerData?._id : null;

  useEffect(() => {
    if (userId) {
      dispatch(startGetCart(userId));
    }
  }, [dispatch, userId]);

  const cartData = useSelector((state) => state.cart.data);

  return (
    <Container>
      {cartData.length > 0 ? (
        <>
          <CartList />
        </>
      ) : (
        <Text>
          No Cart Items. Add Products to Cart.
          <StyledLink to="/products">
            <span role="img" aria-label="shopping-cart">🛒</span>
            Explore Products
          </StyledLink>
        </Text>
      )}
    </Container>
  );
}

export default Cart;