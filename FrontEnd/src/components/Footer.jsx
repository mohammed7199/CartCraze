import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
`

const Logo = styled.h1`

`

const Description = styled.p`
    margin: 20px 0px;
`

const SMContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const Title = styled.h1`
    margin-bottom: 30px;

`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`



const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo> CART CRAZE </Logo>
                <Description>
                    Ecommerce is the buying and selling of goods and services over the Internet.
                    It is conducted over computers, tablets, smartphones, and other smart devices.
                    Almost anything can be purchased through ecommerce today.
                </Description>
                <SMContainer>
                    <SocialIcon color="3B5999" >
                        <Facebook />
                    </SocialIcon>
                    <SocialIcon color="E4405F" >
                        <Instagram />
                    </SocialIcon>
                    <SocialIcon color="55ACEE" >
                        <Twitter />
                    </SocialIcon>
                    <SocialIcon color="E60023" >
                        <Pinterest />
                    </SocialIcon>
                </SMContainer>
            </Left>
            <Center>
                <Title> USEFUL LINKS </Title>
                <List>
                    <ListItem> Home </ListItem>
                    <ListItem> Cart </ListItem>
                    <ListItem> Trend </ListItem>
                    <ListItem> Electronics </ListItem>
                    <ListItem> My Account </ListItem>
                    <ListItem> Track Order </ListItem>
                    <ListItem> Wishlist </ListItem>
                    <ListItem> Terms </ListItem>
                </List>
            </Center>
            <Right>
                <Title> CONTACT INFO. </Title>
                <ContactItem> <Room style={{ marginRight: '10px' }} />  15 Yemen Road, Yemen </ContactItem>
                <ContactItem> <Phone style={{ marginRight: '10px' }} /> +1 234 56 789 </ContactItem>
                <ContactItem> <MailOutline style={{ marginRight: '10px' }} /> chandlerbing@janice.com </ContactItem>
            </Right>
        </Container>
    )
}

export default Footer