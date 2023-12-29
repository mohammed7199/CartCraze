import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Remove, Star, StarBorder } from '@material-ui/icons';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { startAddToCart } from '../../actions/cartActions';
import Swal from 'sweetalert2';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

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

const AddToCartButton = styled.button`
  background-color: #008080;
  color: #fff;
  padding: 10px 40px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 50px;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #005757;
  }

  &:active {
    animation: ${rotateAndScale} 0.3s ease-in-out;
  }
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const ReviewContainer = styled.div`
  margin-top: 70px;
`;

const ReviewTitle = styled.h3`
  font-weight: 280;
  margin-bottom: 10px;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StarIcon = styled.div`
  cursor: pointer;
  margin-right: 5px;
`;

const ReviewDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 400px;
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-weight: 100;
  text-transform: uppercase;
  word-wrap: break-word;
  max-width: 300px;
`;

const SingleProduct = (props) => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [isReviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState([])
  const dispatch = useDispatch();

  const data = useSelector((state) => ({
    isLogin: state.customer.isLogin,
    product: state.products.data.find((product) => product._id === id),
  }));

  const userId = useSelector((state) => state.customer.data?._id);
  const userName = useSelector((state) => state.customer.data?.username);

  const navigate = useNavigate();

  useEffect(() => {
    setProduct(data.product || {});
  }, [id, data.product]);

  const handleQuantityChange = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleClick = () => {
    if (userId) {
      const cartBody = {
        productId: data.product._id,
        userId: userId,
        quantity: quantity,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image
      };

      dispatch(startAddToCart(cartBody, data.product._id));
    } else {
      Swal.fire({
        title: 'Not Logged In!',
        text: 'You need to log in to add items to your cart.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Go to Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/auth/login');
        }
      });
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleReviewDialogOpen = () => {
    setReviewDialogOpen(true);
  };

  const handleReviewDialogClose = () => {
    setReviewDialogOpen(false);
  };

  const handleReviewSubmit = () => {
    const newReview = {
      userId: userId,
      userName: userName,
      rating,
      comment: reviewComment,
    };
    setReviews([...reviews, newReview]);
    setReviewDialogOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={`http://localhost:4040/BackEnd/Uploads/${product.image}`} alt={product.name} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.description}</Desc>
          <Price>₹ {product.price}</Price>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantityChange('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantityChange('inc')} />
            </AmountContainer>
          </AddContainer>
          <AddToCartButton onClick={userId ? handleClick : null} disabled={!userId} >ADD TO CART</AddToCartButton>
          <ReviewContainer>
            <ReviewTitle>PRODUCT REVIEWS</ReviewTitle>
            <StyledTableContainer>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell>Rating</StyledTableCell>
                    <StyledTableCell>Review</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews.map((review, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{review.userName}</StyledTableCell>
                      <StyledTableCell>{review.rating} <Star style={{ fontSize: 'medium', marginTop: '-4px' }} /></StyledTableCell>
                      <StyledTableCell>{review.comment}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
            </StyledTableContainer>
            {userId && (
              <>
                <Button variant="outlined" color="primary" onClick={handleReviewDialogOpen} style={{ marginTop: '17px' }}>
                  Give a Rating
                </Button>
                <ReviewDialog open={isReviewDialogOpen} onClose={handleReviewDialogClose}>
                  <DialogTitle>PRODUCT REVIEW</DialogTitle>
                  <DialogContent>
                    <StarContainer>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <StarIcon key={value} onClick={() => handleStarClick(value)}>
                          {value <= rating ? <Star /> : <StarBorder />}
                        </StarIcon>
                      ))}
                    </StarContainer>
                    <TextField
                      label="Review Comment"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleReviewDialogClose} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleReviewSubmit} color="primary">
                      Post
                    </Button>
                  </DialogActions>
                </ReviewDialog>
              </>
            )}
          </ReviewContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default SingleProduct;