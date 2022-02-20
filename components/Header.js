import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Logo src='/cards.svg' />
        <Title>
          Yeo's BGs
        </Title>
      </TitleContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #ff9924;
  width: 100%;
  box-shadow: 5px 5px 9px -6px rgba(0,0,0,0.35);
  display: flex;
  justify-content: center;
  height: 100px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  margin-left: 8px;
  text-align: center;
`;

const Logo = styled.img`
  max-height: 50px;
`;

export default Header;
