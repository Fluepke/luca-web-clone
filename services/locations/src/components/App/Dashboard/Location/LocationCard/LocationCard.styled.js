import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  margin-top: 32px;
`;

export const StyledTitle = styled.div`
  display: flex;
  color: rgb(0, 0, 0);
  font-family: Montserrat-SemiBold, sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 24px 32px 32px;
  border-bottom: ${({ showBorder }) => (showBorder ? 1 : 0)}px solid
    rgb(151, 151, 151);
`;

export const StyledPlaceholder = styled.div`
  padding-bottom: 32px;
`;

export const CardSection = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 32px;
  flex-direction: column;
  align-items: ${({ direction }) =>
    direction === 'end' ? `flex-end` : `flex-start`};
  border-bottom: ${({ isLast }) => (isLast ? 0 : 1)}px solid rgb(151, 151, 151);
`;
export const CardSectionTitle = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  align-items: baseline;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  font-family: Montserrat-SemiBold, sans-serif;
`;

export const CardSectionSubTitle = styled(CardSectionTitle)`
  width: auto;
  font-weight: 400;
  font-family: Montserrat-Medium, sans-serif;
`;

export const CardSectionDescription = styled.div`
  width: 100%;
  font-size: 14px;
  margin: 16px 0;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  font-family: Montserrat-Medium, sans-serif;
`;
