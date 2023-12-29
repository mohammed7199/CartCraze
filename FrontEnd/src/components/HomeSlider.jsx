import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { sliderData } from '../data'

const Container = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    position: relative;
    overflow: hidden;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${props => props.position === 'left' && '10px'};
    right: ${props => props.position === 'right' && '10px'};
    margin: auto;
    cursor: pointer;
    opacity: 0.6;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -100}vw);
`

const Slider = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg}
`

const ImgContainer = styled.div`
    height: 95%;
    flex: 1;
        .hide-bg {
        mix-blend-mode: multiply;
    }
`

const Images = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`

const Description = styled.p`
    margin: 50px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const HomeSlider = () => {

    const [slideIndex, setSlideIndex] = useState(0)
    const data = useSelector((state) => {
        return [state.customer.isLogin, state.supplierLogin.supplierLogin]
    });

    const [isLogin, supplierLogin] = data;

    const handleClick = (position) => {
        if (position === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow position='left' onClick={() => handleClick('left')} >
                < ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideIndex={slideIndex} >
                {sliderData.map(data => (
                    <Slider bg={data.bg} key={data.id} >
                        <ImgContainer>
                            <Images src={data.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title> {data.title} </Title>
                            <Description> {data.description} </Description>
                            {!isLogin && !supplierLogin && (
                                <Link to='/auth/login'>
                                    <Button>LOG IN TO SHOP NOW</Button>
                                </Link>
                            )}
                            {isLogin && (
                                <Link to='/products'>
                                    <Button>EXPLORE PRODUCTS</Button>
                                </Link>
                            )}
                            {supplierLogin && (
                                <Link to='/products'>
                                    <Button>ADD/REMOVE PRODUCTS</Button>
                                </Link>
                            )}
                        </InfoContainer>
                    </Slider>
                ))}
            </Wrapper>
            <Arrow position='right' onClick={() => handleClick('right')} >
                < ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default HomeSlider