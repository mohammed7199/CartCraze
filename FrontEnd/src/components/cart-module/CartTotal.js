import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from '../reusables/Button';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert';
import { startDeleteAllProductsFromCart } from "../../actions/cartActions";

const API_KEY = 'pk_test_51OCfCcSFQ0U4zFlQpHXhdX07rJmNSg4ucpNSbOFNfA7CO0E83D1tK0E4lJuouMOkYQTNP9yVEytn3ra5hgiKKPnK00en37eKtu';

const Summary = styled.div`
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const ButtonStyled = styled(Button).attrs({
  as: 'button',
})`
  width: 100%;
  padding: 30px;
  background-color: black;
  color: white;
  font-weight: 300;
  font-size: 18px;
`;

const CartTotal = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((state) => state.customer.data);
  const userId = customerData ? customerData._id : null;
  const cartData = useSelector((state) => state.cart.data);

  const price = useMemo(() => {
    let sum = 0;
    cartData.forEach((product) => {
      sum += Number(product.price) * product.quantity;
    });
    return sum;
  }, [cartData]);

  const totalPrice = useMemo(() => {
    return Math.max(0, price);
  }, [price]);

  const navigate = useNavigate();

  const onToken = async (token) => {
    try {
      await dispatch(startDeleteAllProductsFromCart(userId));
      swal('Order Confirmed!', 'Your order has been confirmed successfully.', 'success')
        .then(() => {
          navigate('/products');
        });
    } catch (error) {
      swal('Error Processing Payment, Try Again!');
    }
  };

  return (
    <Summary>
      <SummaryTitle>ORDER SUMMARY</SummaryTitle>
      <SummaryItem>
        <SummaryItemText>SUBTOTAL</SummaryItemText>
        <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>ESTIMATED SHIPPING</SummaryItemText>
        <SummaryItemPrice>₹ 300</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem>
        <SummaryItemText>SHIPPING DISCOUNT</SummaryItemText>
        <SummaryItemPrice>₹ -300</SummaryItemPrice>
      </SummaryItem>
      <SummaryItem type="total">
        <SummaryItemText>TOTAL</SummaryItemText>
        <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
      </SummaryItem>
      <StripeCheckout
        name="cart craze"
        billingAddress
        shippingAddress
        description={`Your total is ₹${totalPrice}`}
        amount={totalPrice * 100}
        token={onToken}
        stripeKey={API_KEY}
      >
        <ButtonStyled>CHECKOUT NOW</ButtonStyled>
      </StripeCheckout>
    </Summary>
  );
};

export default CartTotal;