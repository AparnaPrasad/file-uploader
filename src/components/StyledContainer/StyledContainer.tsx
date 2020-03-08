import styled from "styled-components";
import palette from "../../utilities/palette";

export const StyledRemainingHeightContainer = styled.div`
    flex: 0 1 auto;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`
export const StyledButtonContainer = styled.div`
    border-top: 1px solid ${palette.borderColor};
    padding: 10px;
    display: flex;
    justify-content: center;
`