import styled from "styled-components";

export const AuthWrapper = styled.div`
  position: relative;
  top: 30px;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  .error {
    position: absolute;
    padding: 0 10px;
    top: 55px;
    left: 180px;
    font-size: 1.3rem;
    color: red;
    background-color: #ffe6e6;
    height: 20px;
    border-radius: 10px;
  }
  form {
    padding: 20px 0;
    label {
      display: block;
      width: 100%;
      padding: 0 20px;
      position: relative;
      margin: 20px auto 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-content: center;
      span {
        white-space: nowrap;
      }

      input {
        width: 220px;
        height: 50px;
        border-radius: 25px;
        padding-left: 15px;
        border: 2px solid #24a0ed;
        transition: border-color ease-in-out 0.2s;
        &:hover,
        &:focus {
          border-color: #0079d3;
        }
      }
    }
    button {
      width: 150px;
      height: 40px;
      background-color: #24a0ed;
      color: white;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      transition: background-color ease-in-out 0.2s;
      &:hover {
        background-color: #0079d3;
      }
    }
  }
`;

export const NavWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 10;
  height: min-content;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid aliceblue;
  width: 100%;
  background-color: white;
  .logo {
    width: 150px;
    height: 50px;
    margin-left: 10px;
  }

  nav {
    ul {
      display: inline-flex;
      justify-content: flex-end;
      li {
        list-style-type: none;
        margin: 0 10px;
      }
    }
  }

  a {
    text-decoration: none;
    color: gray;
  }

  .active {
    color: blue;
  }
`;

export const DashboardWrapper = styled.div`
  position: relative;
  top: 30px;
  max-width: 80%;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  form {
    padding: 20px 0;
    label {
      width: 100%;
      padding: 0 20px;
      position: relative;
      margin: 20px auto 30px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      align-items: flex-start;
      align-content: flex-start;
      span {
        white-space: nowrap;
      }
      .error {
        position: absolute;
        padding: 0 10px;
        top: 55px;
        left: 180px;
        font-size: 1.3rem;
        color: red;
        background-color: #ffe6e6;
        height: 20px;
        border-radius: 10px;
      }
      textarea {
        width: 100%;
        /* height: 50px; */
        border-radius: 10px;
        padding-left: 15px;
        border: 2px solid #24a0ed;
        transition: border-color ease-in-out 0.2s;
        &:hover,
        &:focus {
          border-color: #0079d3;
        }
      }
    }
    button {
      width: 150px;
      height: 40px;
      background-color: #24a0ed;
      color: white;
      border-radius: 20px;
      border: none;
      cursor: pointer;
      transition: background-color ease-in-out 0.2s;
      &:hover {
        background-color: #0079d3;
      }
    }
  }
`;

export const PostCardWrapper = styled.div`
  width: 70%;
  margin: 10px auto;
  position: relative;
  .button-container {
    position: absolute;
    width: 200px;
    display: flex;
    justify-content: space-between;
    top: 20px;
    right: 20px;
    button {
      width: 90px;
      height: 30px;
      background-color: #24a0ed;
      color: white;
      border-radius: 15px;
      border: none;
      cursor: pointer;
      transition: background-color ease-in-out 0.2s;
      &:hover {
        background-color: #0079d3;
      }
    }
  }
  a {
    display: block;
    text-decoration: none;
    color: black;
  }
  .box {
    position: relative;
    background: #fff;
    box-shadow: 10px 10px 10px 0 rgba(86, 91, 119, 0.04);
    padding: 50px;
    width: 100%;
    border-radius: 9px;
    cursor: pointer;
  }

  .box-header {
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .box-header img {
    border-radius: 50%;
    margin-right: 20px;
  }

  .box-body {
    font-size: 1.5rem;
    line-height: 30px;
  }

  .box:hover {
    background-image: linear-gradient(
      109.6deg,
      rgba(245, 95, 152, 1) 11.2%,
      rgba(254, 148, 136, 1) 100.2%
    );
    transition-timing-function: cubic-bezier(0.5, 0, 0.15, 1);
    transition: background 0.4s;
  }

  .box:hover .box-header,
  .box:hover .box-body {
    color: #fff;
    transition-timing-function: cubic-bezier(0.5, 0, 0.15, 1);
    transition: color 0.4s;
  }

  .box:hover:before {
    transform: scale(1);
  }

  .box:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: #fff;
    background-image: url(https://image.flaticon.com/icons/svg/56/56809.svg);
    background-size: 25px;
    background-repeat: no-repeat;
    width: 60px;
    height: 60px;
    top: 50%;
    margin-top: -25px;
    right: -30px;
    transform: scale(0);
    transition: transform 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position-x: 21px;
    background-position-y: 18px;
  }
`;

export const ButtonReddit = styled.button`
  width: 180px;
  height: 40px;
  background-color: #24a0ed;
  color: white;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: background-color ease-in-out 0.2s;
  text-decoration: none;
  font-size: 1.6rem;
  &:hover {
    background-color: #0079d3;
  }
`;
