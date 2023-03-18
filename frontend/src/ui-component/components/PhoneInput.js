import React from "react";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
const PhoneInput = (props) => {

  return (
    <div>
      <ReactPhoneInput
        inputExtraProps={{
          name: "phone",
          required: true,
          autoFocus: true
        }}
        defaultCountry={"us"}
        value={props.mobile}
        onChange={(value, country) => props.Changemobile(value, country)}

      />
    </div>
  );

}
export default PhoneInput;