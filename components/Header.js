import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: orange;
  width: 100%;
`

const Title = styled.h1`
  text-align: center;
`
 
const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        BG Catalogue
      </Title>
    </HeaderContainer>
  )
}

export default Header;