import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 32px;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  max-width: 768px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.textMain};
  margin-bottom: 24px;
`;

export const EmptyText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-style: italic;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AppointmentCard = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.lg};
  padding: 24px;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const CardHeader = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 8px;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textMain};

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #97D8F4 0%, #1E40AF 100%);
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  padding: 8px 16px;
  border-radius: ${props => props.theme.radii.md};
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.75);
  }
`;