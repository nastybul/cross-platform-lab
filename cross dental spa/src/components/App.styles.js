import styled from 'styled-components';

export const BookingCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 32px;
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  max-width: 670px;
  margin: 0 auto;
`;

export const StepsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 16px;
  
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  color: ${props => props.$isActive ? props.theme.colors.primary : props => props.theme.colors.textMuted};
  span:last-child {
`;

export const StepNumber = styled.span`
  width: 28px;
  height: 28px;
  border-radius: ${props => props.theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid ${props => props.theme.colors.primary};
  background: ${props => props.$isActive ? 'linear-gradient(180deg, #F9FAFF 0%, #4163D2 100%)' : 'transparent'};
  color: ${props => props.$isActive ? props.theme.colors.white : props.theme.colors.textMuted};
`;

export const StepLabel = styled.span`
  @media (max-width: 540px) {
    display: none;
  }
`;

export const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${props => props.theme.colors.textMain};
`;

export const StepDescription = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 24px;
`;

export const OptionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: ${props => props.theme.radii.md};
  border: ${props => props.$isSelected ? `2px solid ${props.theme.colors.primary}` : `2px solid ${props.theme.colors.border}`};
  background-color: ${props => props.$isSelected ? props.theme.colors.bgCard : props.theme.colors.white};
  color: ${props => props.$isSelected ? props.theme.colors.primary : props => props.theme.colors.textMain};
  font-weight: ${props => props.$isSelected ? 'bold' : 'normal'};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;


  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const SecondaryButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.textMain};
  font-weight: 600;
  padding: 10px 20px;
  border-radius: ${props => props.theme.radii.md};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e1;
  }
`;

export const PrimaryButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  padding: 10px 20px;
  border-radius: ${props => props.theme.radii.md};
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  transition: filter 0.2s;

  &:hover {
    filter: ${props => props.$disabled ? 'none' : 'brightness(0.9)'};
  }
`;

export const SelectBox = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  background-color: ${props => props.theme.colors.white};
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.colors.textMain};
  transition: border-color 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 4px;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  z-index: 20;
  max-height: 192px;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.$isSelected ? props.theme.colors.bgCard : 'transparent'};
  font-weight: ${props => props.$isSelected ? 'bold' : 'normal'};
  color: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.textMain};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.bgCard};
    color: ${props => props.theme.colors.primary};
  }
`;

export const PillButton = styled.button`
  padding: 8px 16px;
  border-radius: ${props => props.theme.radii.md};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.$isSelected ? '#6E8ADC' : props.theme.colors.white};
  color: ${props => props.$isSelected ? props.theme.colors.white : props.theme.colors.textMain};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.4 : 1};
  text-decoration: ${props => props.$isStrikethrough ? 'line-through' : 'none'};
  transition: background 0.2s;
  font-size: 14px;


  &:hover {
    background-color: ${props => props.$disabled ? '#f3f4f6' : props.theme.colors.secondary};
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  font-size: 14px;
  outline: none;
  color: ${props => props.theme.colors.textMain};
  background-color: ${props => props.theme.colors.white};
`;

export const ErrorText = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;

export const SummaryBox = styled.div`
  background-color: ${props => props.theme.colors.bgCard};
  padding: 16px;
  border-radius: ${props => props.theme.radii.md};
  border: 1px dashed ${props => props.theme.colors.border};
  font-size: 14px;
  margin-bottom: 24px;
  color: ${props => props.theme.colors.textMain};
`;
export const ToastContainer = styled.div`
  position: fixed;
    top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  pointer-events: none;
    @media (min-width: 640px) {
        left: auto;
        right: 20px;
        top: 14px;
        max-width: 380px;
    }
`;

export const ToastItem = styled.div`
  pointer-events: auto;
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.sm};
  border-radius: ${props => props.theme.radii.md};
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.colors.textMain};
`;

export const FooterWrapper = styled.footer`
  background-color: rgba(255, 255, 255, 0.3);
  color: ${props => props.theme.colors.textMuted};
  padding: 24px 0;
  text-align: center;
  font-size: 12px;
  margin-top: auto;
`;

export const FooterContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;