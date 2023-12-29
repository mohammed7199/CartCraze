import React, { useEffect, useRef } from 'react';
import { Link, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Badge } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import styled from 'styled-components';
import SideDrawerLogic from './components/SideDrawer';
import Home from './components/Home';
import Products from './components/products-module/Products';
import Cart from './components/cart-module/Cart';
import AddProduct from './components/products-module/AddProduct';
import SingleProduct from './components/products-module/SingleProductPage';
import NotFound from './components/NotFound';
import RegistrationForm from './components/authForm-module/RegistrationForm';
import LoginForm from './components/authForm-module/LoginForm';
import Account from './components/reusables/Account';
import { startGetUserAccountDetails, userLoggedIn, logoutUser, setLogoutTimer } from './actions/userAction';
import { startGetSupplierAccountDetails, supplierLoginedIn } from './actions/actionGenerator';
import { setCart, startGetCart } from './actions/cartActions';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuButton = styled.button`
  border: none;
  font-size: 17px;
  background-color: transparent;
  cursor: pointer;
  margin-left: 25px;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 8px;

  &:hover {
    background-color: #e0e0e0;
    color: #008080;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  const data = useSelector((state) => [
    state.customer.isLogin,
    state.supplierLogin.supplierLogin,
    state.cart.data,
    state.customer.data?._id,
  ]);

  const [isLogin, supplierLogin, cartData, userId] = data;

  const result = userId ? cartData.filter((item) => item?.userId === userId) : [];

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    navigateRef.current = navigate;

    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration) {
        const expirationTime = parseInt(tokenExpiration, 10);
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
          handleLogout();
        }
      }
    };

    if (token) {
      if (role === 'admin') {
        dispatch(supplierLoginedIn());
        dispatch(startGetSupplierAccountDetails(jwtDecode(token).userId));
      } else if (role === 'user') {
        dispatch(userLoggedIn());
        dispatch(startGetUserAccountDetails(jwtDecode(token).userId));
        dispatch(startGetCart());
        checkTokenExpiration();
        dispatch(setLogoutTimer());
      }
    }

    // Schedule a check for token expiration every second
    const expirationCheckTimer = setInterval(checkTokenExpiration, 1000);

    // Clear the timer and check when the component is unmounted
    return () => {
      clearInterval(expirationCheckTimer);
      checkTokenExpiration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigateRef]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('tokenExpiration');
        if (supplierLogin) {
          dispatch(supplierLoginedIn());
        } else {
          dispatch(setCart([]));
          dispatch(userLoggedIn());
          dispatch(logoutUser());
        }
        Swal.fire({
          title: 'Successfully logged out!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
          window.location.href = '/';
        });
      } else if (result.isDenied) {
        Swal.fire('Not logged out', '', 'info');
      }
    });
  };

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <SideDrawerLogic />
        </LeftSide>
        <Center>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>CART CRAZE</Logo>
          </Link>
        </Center>
        <RightSide>
          <Link className="nav-link" to="/">
            <MenuButton>HOME</MenuButton>
          </Link>
          <Link className="nav-link" to="/products">
            <MenuButton style={{ marginRight: '10px' }}>PRODUCTS</MenuButton>
          </Link>
          {(isLogin || supplierLogin) && (
            <>
              {!supplierLogin && (
                <Link to="/cart">
                  <MenuButton style={{ marginRight: '25px' }}>
                    <Badge badgeContent={result.length} color="primary">
                      <ShoppingCartOutlined />
                    </Badge>
                  </MenuButton>
                </Link>
              )}
            </>
          )}

          {isLogin || supplierLogin ? (
            <>
              <StyledLink
                className={`nav-link dropdown-toggle ${MenuButton}`}
                role="button"
                data-bs-toggle="dropdown"
                to="/user"
              >
                <MenuButton>
                  {isLogin ? 'USER' : 'ADMIN'}
                </MenuButton>
              </StyledLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/account">
                    ACCOUNT
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                to="/auth"
              >
                <MenuButton>REGISTER/LOG-IN</MenuButton>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/auth/register"
                  >
                    REGISTER
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/auth/login"
                  >
                    LOG IN
                  </Link>
                </li>
              </ul>
            </>
          )}

        </RightSide>
      </Wrapper>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/supplier/products/add" element={<AddProduct />} />
        <Route path="/singleProduct/:id" element={<SingleProduct />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth/register" element={<RegistrationForm />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Outlet />
    </Container>
  );
};

export default Navbar;