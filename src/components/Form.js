import React from "react";
import styled from "styled-components";

const InputStyle = styled.input`
  width: 85%;
  padding: 10px;
  border-radius: 5px;
  border: lightgrey 1px solid;
`;

const BtnStyle = styled.button`
  width: 10%;
  padding: 11px;
  border: none;
  border-radius: 5px;
`;

const InputWrapper = styled.div`
  height: 45px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Form({ handleSubmit, value, setValue }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputStyle
            type="text"
            name="value"
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <BtnStyle type="submit">입력</BtnStyle>
        </InputWrapper>
      </form>
    </div>
  );
}
