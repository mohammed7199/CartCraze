import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from './ProductsList';
import Heading from '../reusables/Heading';
import { startGetProducts } from '../../actions/productsAction';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const rotateIn = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

const AnimatedHeading = styled(Heading)`
  font-family: 'Helvetica', serif;
  font-size: 1.5rem;
  color:  #2d4234;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${rotateIn} 3s linear infinite, ${pulse} 1s alternate infinite;
  margin: 0; /* Remove default margin */
`;

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetProducts());
  }, []);

  const productsData = useSelector((state) => state.products.data);

  return (
    <Container>
      <Row>
        <div className="col-12 pt-5">
          <AnimatedHeading
            type="h4"
            title={`DISCOVER A WORLD OF CHOICES: EXPLORE OUR COLLECTION OF ${productsData.length} EXCLUSIVE ITEMS!`}
          />
          <ProductsList />
        </div>
      </Row>
      <Outlet />
    </Container>
  );
}

export default Products;