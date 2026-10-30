import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${props => props.theme.colors.white};
  padding: 32px;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.$mb ? props.$mb : '0'};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.textMain};
  margin-bottom: 12px;
`;

export const SectionText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: ${props => props.$mb ? props.$mb : '0'};
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

export const FilterButton = styled.button`
  background: ${props => props.$isActive 
    ? 'linear-gradient(180deg, #D7E3FF 0%, #8EAAE7 100%)' 
    : props.theme.colors.white};
  color: ${props => props.$isActive ? props.theme.colors.white : props.theme.colors.textMain};
  border: 1px solid ${props => props.$isActive ? props.theme.colors.primary : '#A8B4D1'};
  padding: 8px 16px;
  border-radius: ${props => props.theme.radii.full};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ServiceCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.lg};
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.white};
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }
`;

export const ServiceName = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => props.theme.colors.textMain};
  margin-bottom: 8px;
`;

export const ServicePrice = styled.div`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 12px;
`;

export const ServiceDesc = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 16px;
`;

export const SelectServiceButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.textMain};
  font-weight: 600;
  padding: 10px;
  border-radius: ${props => props.theme.radii.md};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;

  &:hover {
    background-color: #cbd5e1;
  }
`;