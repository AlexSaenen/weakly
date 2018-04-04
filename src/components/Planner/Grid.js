import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 10px;
`;

export default Grid;
