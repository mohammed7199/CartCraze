import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCart } from '../actions/cartActions';
import { userLoggedIn } from '../actions/userAction';
import { supplierLoginedIn } from '../actions/actionGenerator';
import AddProduct from "./products-module/AddProduct";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CategoryIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import styled from "styled-components";
import Swal from 'sweetalert2';

const UserIcon = styled(AccountCircleIcon)`
  margin-right: 5px;
`;

const MenuHeader = styled(Typography)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: teal;
  color: white;
  padding: 10px;
`;

const MenuFooter = styled("div")`
  position: absolute;
  bottom: 20px;
  width: 100%;
`;

const SideDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 220px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    transform: translateY(-50%);
    margin-top: 0;
  }
`;

const CloseButton = styled.div`
  position: fixed;
  top: 10px;
  left: 230px;
  z-index: 1000;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  padding: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #008080;
  }

  svg {
    font-size: 24px;
  }
`;

const FloatingDrawer = styled.div`
  margin-bottom: -30px;
  margin-left: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;

  &:hover {
    .MuiSvgIcon-root {
      transform: scale(1.3);
      color: #008080;
    }
  }

  .MuiSvgIcon-root {
    font-size: 30px;
    transition: all 0.3s ease;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledListItem = styled(ListItem)`
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
  &.Mui-selected {
    background-color: #f0f0f0 !important;
  }
`;

const StyledListItemText = styled(ListItemText)`
  font-weight: bold;
  cursor: default;
  text-transform: uppercase;
`;

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => (props.darkMode ? "#333" : "#f5fbfd")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    transition: background-color 0.3s, color 0.3s;
  }
`;

const CategoryDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 220px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    margin-top: 0;
    transform: translateY(-50%);
  }
`;

const CategoryList = styled(List)`
  padding: 0;
`;

const CategoryListItem = styled(ListItem)`
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SideDrawerLogic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const data = useSelector((state) => {
    return [state.customer.isLogin, state.supplierLogin.supplierLogin, state.products.data];
  });

  const [isLogin, supplierLogin, productsData] = data;

  const showCategoriesInDrawer = location.pathname === '/products';

  const [isFloatingDrawerOpen, setFloatingDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isCategoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleCategoryDrawer = () => {
    setCategoryDrawerOpen(!isCategoryDrawerOpen);
  };

  const toggleFloatingDrawer = () => {
    setFloatingDrawerOpen(!isFloatingDrawerOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCategoryClick = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((selectedCategory) => selectedCategory !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);
    const categoryQuery = updatedSelectedCategories.join(',');
    navigate(`/products?categories=${categoryQuery}`);
  };

  const updateFilteredProducts = useCallback((selectedCategories) => {
    if (selectedCategories.length === 0) {
      setFilteredProducts(productsData);
    } else {
      const updatedFilteredProducts = productsData.filter((product) =>
        product.categories.some((category) => selectedCategories.includes(category))
      );
      setFilteredProducts(updatedFilteredProducts);
    }
  }, [productsData]);

  useEffect(() => {
    if (showCategoriesInDrawer) {
      const allCategories = productsData.reduce(
        (categories, product) => [...categories, ...product.categories],
        []
      );
      setCategories([...new Set(allCategories)]);
    }
    updateFilteredProducts(selectedCategories);
  }, [showCategoriesInDrawer, productsData, selectedCategories, updateFilteredProducts]);

  const handleLoginClick = () => {
    if (!isLogin && !supplierLogin) {
      navigate('/auth/login');
    } else {
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
          }
          Swal.fire({
            title: 'Successfully logged out!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            window.location.reload();
            navigate('/');
          });
        } else if (result.isDenied) {
          Swal.fire('Not logged out', '', 'info');
        }
      });
    }
    setFloatingDrawerOpen(false);
  };

  const handleAccountClick = () => {
    if (!isLogin && !supplierLogin) {
      Swal.fire({
        title: 'LOGIN REQUIRED',
        text: 'Please log in first to access your account.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    } else {
      navigate('/account');
      setFloatingDrawerOpen(false);
    }
  };

  const handleAllProductsClick = () => {
    setSelectedCategories([]);
    navigate('/products');
  };

  const handleAddProductClick = () => {
    navigate('/supplier/products/add');
    setFloatingDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={{ darkMode }}>
      <GlobalStyles darkMode={darkMode} />

      <CategoryDrawer
        anchor="left"
        open={isCategoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
      >
        <CloseButton onClick={() => setCategoryDrawerOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <MenuHeader variant="h6">CATEGORIES</MenuHeader>
        <CategoryList>
          <CategoryListItem onClick={handleAllProductsClick}>
            <StyledListItemText primary="ALL PRODUCTS" style={{ padding: '5px' }} />
          </CategoryListItem>
          {categories.map((category) => (
            <CategoryListItem
              key={category}
              onClick={() => handleCategoryClick(category)}
              selected={selectedCategories.includes(category)}
            >
              <StyledListItemText primary={category} style={{ padding: '5px' }} />
            </CategoryListItem>
          ))}
        </CategoryList>
      </CategoryDrawer>

      <FloatingDrawer>
        <IconButton onClick={toggleFloatingDrawer}>
          <MenuIcon />
        </IconButton>
      </FloatingDrawer>

      <SideDrawer
        anchor="left"
        open={isFloatingDrawerOpen}
        onClose={() => setFloatingDrawerOpen(false)}
      >
        <CloseButton onClick={() => setFloatingDrawerOpen(false)}>
          <CloseIcon />
        </CloseButton>
        <MenuHeader variant="h6">HEY, SHOPAHOLIC!</MenuHeader>
        <ImageContainer>
          <img src="/pics/cart.png" alt="Side Drawer" style={{ width: '100%' }} />
        </ImageContainer>
        <List>
          <StyledListItem onClick={handleAccountClick}>
            <UserIcon />
            <StyledListItemText primary="ACCOUNT" style={{ padding: '5px' }} />
          </StyledListItem>
          {showCategoriesInDrawer && (
            <StyledListItem onClick={toggleCategoryDrawer}>
              <CategoryIcon style={{ marginRight: '5px' }} />
              <StyledListItemText primary="CATEGORIES" style={{ padding: '5px' }} />
              <ArrowRightIcon />
            </StyledListItem>
          )}
          {supplierLogin && showCategoriesInDrawer && (
            <>
              <StyledListItem onClick={handleAddProductClick}>
                <AddCircleIcon />
                <StyledListItemText primary="ADD PRODUCT" style={{ padding: '5px' }} />
              </StyledListItem>
              {location.pathname === '/supplier/products/add' && (
                <AddProduct handleClose={() => setFloatingDrawerOpen(false)} />
              )}
            </>
          )}
          <StyledListItem onClick={handleLoginClick}>
            <LoginIcon style={{ marginRight: '5px' }} />
            <StyledListItemText primary={isLogin || supplierLogin ? "LOG OUT" : "LOG IN"} style={{ padding: '5px' }} />
          </StyledListItem>
          <StyledListItem onClick={toggleDarkMode} style={{
            backgroundColor: darkMode ? "#444" : "#fff",
            color: darkMode ? "#fff" : "#000", cursor: 'default'
          }}>
            <Brightness4Icon style={{ marginRight: '5px' }} />
            <StyledListItemText primary={`${darkMode ? '  LIGHT' : 'DARK'} MODE`} style={{ padding: '5px' }} />
          </StyledListItem>
        </List>
        <MenuFooter>
          <Typography variant="caption" color="textSecondary" align="center">
            Elevate your style, one click at a time. Shop smarter, shop better.
          </Typography>
        </MenuFooter>
      </SideDrawer>
    </ThemeProvider>
  );
};

export default SideDrawerLogic;