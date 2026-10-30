import { StyledHeader, Container, LogoWrapper, Title, Subtitle, ActionsWrapper, BookButton, IconNavButton } from './Header.styles.js';
import logo from '../assets/logo.svg';

export const Header = ({ currentView, setCurrentView, onStartBooking }) => {
  return (
    <StyledHeader>
      <Container>
        <LogoWrapper onClick={() => setCurrentView('home')}>
          <img src={logo} alt="Логотип компанії" width="60" height="60" />
          <div>
            <Title>DentalClinic</Title>
            <Subtitle>Стоматологічна клініка</Subtitle>
          </div>
        </LogoWrapper>
        <ActionsWrapper>
          <BookButton onClick={onStartBooking}>
            Записатися на прийом
          </BookButton>
          <IconNavButton 
            onClick={() => setCurrentView('appointments')} 
            title="Мої записи на прийом"
            $isActive={currentView === 'appointments'}
          >
            <svg className="w-6 h-6" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </IconNavButton>
        </ActionsWrapper>
      </Container>
    </StyledHeader>
  );
};

