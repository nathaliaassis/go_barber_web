import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;

  > img {  /* only first img */
    height: 80px
  }

  button {
    background: transparent;
    border: 0;
    margin-left: auto;
    transition: all .2s;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }

    &:hover {
      svg {
        color: #BCBCBC;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }
    a {
      text-decoration: none;
      color: #ff9000;
      transition: all .5s;

      &:hover{
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  max-width: 1120px;
  margin: 64px auto;
`;
export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    display: flex;
    margin-top: 8px;
    font-weight: 500;
    color: #FF9000;


    span {
      display: flex;
      align-items: center;
    }
    span + span::before{
      content: '';
      width: 1px;
      height: 12px;
      background: #FF9000;
      margin: 0 8px;
    }
  }
`;
export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    font-weight: 400;
    color: #999591;
  }

  div {
    position: relative;
    display: flex;
    align-items: center;

    background-color: #3e3b47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: #FF9000;
    }

    img {
      height: 80px;
      width: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #FFF;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #999591;

      svg {
        margin-right: 8px;
        color: #FF9000;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > p {
    color: #999591;
  }
  > strong {
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 26px;
    color: #999591;
    border-bottom: 1px solid #3e3b47;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  >span {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #F4EDE8;
    width: 70px;

    svg {
      margin-right: 8px;
      color: #FF9000;
    }
  }
  div {
    display: flex;
    align-items: center;
    flex: 1;

    background-color: #3e3b47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      height: 56px;
      width: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #FFF;
      font-size: 20px;
    }
  }


`;
export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

