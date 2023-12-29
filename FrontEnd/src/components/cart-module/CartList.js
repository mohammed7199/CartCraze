import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteCart from "./DeleteCart";
import CartTotal from "./CartTotal";
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 30%
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  color: #777;
`;

const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Quantity = styled.span`
  font-size: 20px;
  margin: 0 10px;
`;

const IconButton = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0px 5px;
`;


const DeleteButton = styled(IconButton)`
  background-color: #354edc;
  color: #fff;
`;

const CartList = () => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  const cartData = useSelector((state) => state.cart.data);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>YOUR SHOPPING BAG - ({cartData.length})</Title>
          {cartData.map((item) => (
            <CartItem key={item.productId}>
              <ProductInfo>
                <Image
                  src={`http://localhost:4040/BackEnd/Uploads/${item.image}`}
                  alt={item.name}
                  onError={handleImageError}
                />
                {!imageError && <ProductDetails {...item} />}
                <ProductDetails>
                  <ProductName>{item.name}</ProductName>
                  <ProductPrice>₹ {item.price}</ProductPrice>
                </ProductDetails>
              </ProductInfo>
              <ProductQuantity>
                <Quantity>{item.quantity}</Quantity>
              </ProductQuantity>
              <DeleteButton>
                <DeleteCart {...item} />
              </DeleteButton>
            </CartItem>
          ))}
        </Wrapper>
      </Container>
      <CartTotal />
    </>
  );
};

export default CartList;