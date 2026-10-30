import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.bgCard};
  box-shadow: ${props => props.theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 12px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.textMain};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const BookButton = styled.button`
  background: linear-gradient(135deg, #6E8ADC 0%, #1E40AF 100%);
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  padding: 10px 20px;
  border-radius: ${props => props.theme.radii.md};
  border: none;
  cursor: pointer;
  transition: filter 0.2s;
  white-space: nowrap;
  margin-left: 12px;

  &:hover {
    filter: brightness(0.75);
  }
`;

export const IconNavButton = styled.button`
  padding: 10px;
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid ${props => props.$isActive ? 'transparent' : props => props.theme.colors.border};
  background-color: ${props => props.$isActive ? '#CCDCFF' : props => props.theme.colors.white};
  color: ${props => props.$isActive ? '#333' : props => props.theme.colors.textMain};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isActive ? '#CCDCFF' : props => props.theme.colors.secondary};
  }
`;