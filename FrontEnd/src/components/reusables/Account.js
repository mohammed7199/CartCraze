import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditAccount from './EditAccount';
import styled from 'styled-components';

const MainContainer = styled.div`
  background-image: url('/pics/user-reg.jpg'); /* Set the path to your image */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* This ensures that the background image doesn't scroll with the content */
  min-height: 100vh; /* Set minimum height to cover the entire viewport */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccountContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  background-color: #fff;
`;

const AccountHeader = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const AccountDetail = styled.div`
  margin-bottom: 15px;
`;

const AccountLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const AccountValue = styled.span`
  color: #555;
  text-transform: uppercase;
`;

const Account = (props) => {
  const [account, setAccount] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const accountData = useSelector((state) => ({
    supplier: state.supplierLogin.data,
    customer: state.customer.data,
  }));

  const { supplier, customer } = accountData;

  useEffect(() => {
    if (supplier && supplier.role === 'admin') {
      setAccount(supplier);
      setIsAdmin(true);
    } else if (customer && customer.role === 'user') {
      setAccount(customer);
      setIsAdmin(false);
    }
  }, [supplier, customer]);

  return (
    <MainContainer>
      <AccountContainer>
        <AccountHeader>ACCOUNT DETAILS:</AccountHeader>
        <AccountDetail>
          <AccountLabel>USERNAME:</AccountLabel>
          <AccountValue>{account.username}</AccountValue>
        </AccountDetail>
        <AccountDetail>
          <AccountLabel>EMAIL:</AccountLabel>
          <AccountValue>{account.email}</AccountValue>
        </AccountDetail>
        <AccountDetail>
          <AccountLabel>ACCOUNT CREATED ON:</AccountLabel>
          <AccountValue>{new Date(account.createdAt).toDateString()}</AccountValue>
        </AccountDetail>
      </AccountContainer>
    </MainContainer>
  );
};

export default Account;