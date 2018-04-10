import styled from 'styled-components';

const DayContentGrid = styled.div`
  display: grid;
  grid-template-columns: [hour-labels] 40px [tasks] 1fr;
  grid-column-gap: 4px;
  height: 500px;
`;

export default DayContentGrid;
