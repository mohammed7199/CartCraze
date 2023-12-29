import styled from "styled-components"

const Container = styled.div`
    height: 37px;
    background-color: #008080;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 550;
`

const Deals = () => {
    return (
        <Container>
            Great Indian Sale! Free shipping for all orders!!!
        </Container>
    )
}

export default Deals
