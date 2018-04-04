import styled from 'styled-components';

const DayContentGrid = styled.div`
  display: grid;
  grid-template-columns: [hour-labels] 30px [tasks] 1fr;
`;

export default DayContentGrid;
