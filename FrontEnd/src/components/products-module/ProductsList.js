import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  border-radius: 15px;
  backdrop-filter: blur(0.3px);
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 7px;
  min-width: 280px;
  height: 400px;
  margin-top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Design = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  transition: all 0.5s ease;
  transform: scale(1);
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  background-color: transparent;
  z-index: 2;
  transition: transform 0.5s ease;
  text-transform: uppercase;

  ${Container}:hover & {
    transform: scale(1.2);
  }
`;

const CardBody = styled.div`
  text-align: center;
`;

const Price = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 350;
  margin-bottom: 5px;
  text-transform: uppercase;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Sort = styled.div`
  position: relative;
  top: -30px;
  font-size: 15px;
  font-weight: 400;
  text-transform: uppercase;
  z-index: 1;
`;

const SortText = styled.span`
  font-size: 15px;
  font-weight: 400;
  padding: 5px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 15px;
    background-color: white;
    cursor: pointer;
`

const PaginationContainer = styled.div`
  margin-top: 20px;
`;

const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;

  .page-item {
    margin: 0 5px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #90E4C1;
    }
  }

  .active {
    background-color: #008080;
    color: #fff;
  }

  .page-link {
    color: black;
    text-decoration: none;
  }

  .break-me {
    cursor: default;
  }

  .previous, .next {
    margin: 0 10px;
    cursor: pointer;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    transition: background-color 0.3s ease;
    text-transform: uppercase;
    color: #333;

    &:hover {
      background-color: #90E4C1;
    }

    &.disabled {
      cursor: not-allowed;
      color: #D3D3D3;
      background-color: #fff;
    }
  }
`;

const PAGE_SIZE = 8;

const ProductsList = () => {
  const location = useLocation();
  const { categories } = useParams();
  const navigate = useNavigate();

  const data = useSelector((state) => {
    return [state.customer.isLogin, state.supplierLogin.supplierLogin, state.products.data]
  });

  const [isLogin, supplierLogin, productsData] = data;
  const [filteredProducts, setFilteredProducts] = useState([...productsData]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedCategories = queryParams.get('categories') || categories;

    let updatedFilteredProducts = [...productsData];

    if (selectedCategories) {
      const categoriesArray = selectedCategories.split(',');
      updatedFilteredProducts = productsData.filter((product) =>
        product.categories.some((category) => categoriesArray.includes(category))
      );
    }

    // Sorting logic
    if (sort === "newest") {
      updatedFilteredProducts = updatedFilteredProducts.sort((a, b) => a.createdAt - b.createdAt);
    } else if (sort === "asc") {
      updatedFilteredProducts = updatedFilteredProducts.sort((a, b) => a.price - b.price);
    } else {
      updatedFilteredProducts = updatedFilteredProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedFilteredProducts);
  }, [location.search, categories, sort, productsData]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleClick = (productId) => {
    if (isLogin) {
      navigate(`/singleProduct/${productId}`);
    } else {
      navigate('/auth/login');
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedProducts = filteredProducts.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <>
      <div className="row py-5">
        {/* Sorting dropdown (conditionally rendered) */}
        {(isLogin || supplierLogin) && (
          <Sort>
            <SortText>Sort By:</SortText>
            <Select onChange={handleSortChange} value={sort}>
              <option value="newest">NEWEST</option>
              <option value="asc">PRICE (LOW TO HIGH)</option>
              <option value="desc">PRICE (HIGH TO LOW)</option>
            </Select>
          </Sort>
        )}

        {/* Product cards */}
        {paginatedProducts.map((product, i) => (
          <div className="col-lg-3 my-3 py-3 py-sm-0" key={i}>
            <Container>
              <Design />
              <Image
                src={`http://localhost:4040/BackEnd/Uploads/${product.image}`}
                alt={product.name}
              />
              <Info>
                <div className="d-flex justify-content-center">
                  {/* {isLogin ? (
                    <AddCart {...product} />
                  ) : null} */}
                  {supplierLogin && (
                    <>
                      <div className="d-flex justify-content-center">
                        <EditProduct {...product} />
                      </div>
                      <div className="d-flex justify-content-center">
                        <DeleteProduct {...product} />
                      </div>
                    </>
                  )}
                </div>
                {/* <Description>{product.description}</Description> */}
                {(isLogin && !supplierLogin) || !supplierLogin ? (
                  <Button onClick={() => handleClick(product._id)}>
                    {isLogin ? 'VIEW DETAILS' : 'LOGIN TO VIEW'}
                  </Button>
                ) : null}
              </Info>
            </Container>

            <CardBody>
              <ProductName>{product.name}</ProductName>
              <Price>₹ {`${product.price} `}</Price>
            </CardBody>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {filteredProducts.length > PAGE_SIZE && (
        <PaginationContainer className="d-flex justify-content-center mt-5">
          <Pagination
            pageCount={Math.ceil(filteredProducts.length / PAGE_SIZE)}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousLabel="Previous"
            nextLabel="Next"
            breakClassName="page-item"
            breakLinkClassName="page-link"
          />
        </PaginationContainer>
      )}
    </>
  );
};

export default ProductsList;
