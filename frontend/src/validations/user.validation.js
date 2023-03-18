import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const UpdateProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(6, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("First name is required"),
  last_name: Yup.string()
    .min(6, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email Address Required"),
  address: Yup.string().required("address is required"),
  country_code: Yup.string().required("country is required"),
  state: Yup.string().required("state is required"),
  city: Yup.string().required("city is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("This field is required"),
  confirmPassword: Yup.string()
    .required("This field is required")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "password need to be the same"
      ),
    }),
});

export const ProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Last name is required"),
});

export const Howschema =Yup.object().shape({
  first_name: Yup.string().trim().max(255).required("Firstname is required"),
  last_name: Yup.string().trim().max(255).required("Lastname is required"),
  email: Yup.string()
    .email("Must be a valid email").trim()
    .max(255)
    .required("Email is required"),
  password: Yup.string().max(255).required("Password is required"),
  mobile: Yup.string("Enter your Mobile number")
    .matches(phoneRegExp, "Mobile number is not valid")
    .required("Mobile number is required")
    .min(10, "Number Must be 10 digit only!")
    .max(10, "Number Must be 10 digit only!"),
  image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
  how_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("House name is required"),

  // userId: Yup.string().required("How admin is required"),

  address: Yup.string()
    .min(12, "Minimum character is 12")
    .required("Address is required"),

  how_desc: Yup.string()
    .min(15, "Minimum character is 15")
    .required("Description is required"),

  country_code: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  city: Yup.string().required("City is required"),

  zipcode: Yup.string()
    .required("Zip code is required")
    .min(5, "Minimum character is 5"),

  how_image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),

  backimage: Yup.mixed()
  .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
  }),

});

export const HowUpdateschema =Yup.object().shape({
  first_name: Yup.string().trim().max(255).required("Firstname is required"),
  last_name: Yup.string().trim().max(255).required("Lastname is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  mobile: Yup.string("Enter your Mobile number")
    .matches(phoneRegExp, "Mobile number is not valid")
    .required("Mobile number is required")
    .min(10, "Mobile Must be 10 digit only!")
    .max(10, "Mobile Must be 10 digit only!"),
  image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
  how_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("House name is required"),

  address: Yup.string()
    .min(2, "Minimum character is 2")
    .required("Address is required"),

  how_desc: Yup.string()
    .min(15, "Minimum character is 15")
    .required("Description is required"),

  country_code: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  city: Yup.string().required("City is required"),

  zipcode: Yup.string()
    .required("Zip Code is required")
    .min(5, "Minimum character is 5"),

  how_image: Yup.mixed()
  .optional()
  .test("fileType", "Unsupported File Format", function (value) {
    return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
  })
  .test("fileSize", "File Size is too large", (value) => {
    const sizeInBytes = 5000000; //0.5MB
    return value?.size ? value?.size <= sizeInBytes : true;
  }),

  backimage: Yup.mixed()
  .optional()
  .test("fileType", "Unsupported File Format", function (value) {
    return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
  })
  .test("fileSize", "File Size is too large", (value) => {
    const sizeInBytes = 5000000; //0.5MB
    return value?.size ? value?.size <= sizeInBytes : true;
  }),

});

export const ChildHowschema =Yup.object().shape({
  first_name: Yup.string().trim()
  .min(2, "Minimum character is 2")
  .max(50, "Maximum character is 50.")
  .required("Firstname is required"),
  last_name: Yup.string().trim()
  .min(2, "Minimum character is 2")
  .max(50, "Maximum character is 50.")
  .required("Lastname is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  mobile: Yup.string("Enter your Mobile number")
    .matches(phoneRegExp, "Mobile number is not valid")
    .required("Mobile number is required")
    .min(10, "Mobile Must be 10 digit only!")
    .max(10, "Mobile Must be 10 digit only!"),
    password: Yup.string().max(255).required("Password is required"),
  image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
   
  how_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Child House name is required"),
  parent_id: Yup.string()
    .required("HoW name is required"),

  address: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Address is required"),

  how_desc: Yup.string()
    .min(15, "Minimum character is 15")
    .required("Description is required"),

  country_code: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  city: Yup.string().required("City is required"),

  zipcode: Yup.string()
    .required("Zip Code is required")
    .min(5, "Minimum character is 5"),

  how_image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
  
  backimage: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),

});

export const UpdateChildHowschema =Yup.object().shape({
  first_name: Yup.string().trim()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Firstname is required"),
  last_name: Yup.string().trim()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Lastname is required"),
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  mobile: Yup.string("Enter your Mobile number")
    .matches(phoneRegExp, "Mobile number is not valid")
    .required("Mobile number is required")
    .min(10, "Mobile Must be 10 digit only!")
    .max(10, "Mobile Must be 10 digit only!"),
  image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
  
  how_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Child House name is required"),
  parent_id: Yup.string()
    .required("HoW name is required"),

  address: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Address is required"),

  how_desc: Yup.string()
    .min(15, "Minimum character is 15")
    .required("Description is required"),

  country_code: Yup.string().required("Country is required"),

  state: Yup.string().required("State is required"),

  city: Yup.string().required("City is required"),

  zipcode: Yup.string()
    .required("Zip Code is required")
    .min(5, "Minimum character is 5"),

  how_image: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),

  backimage: Yup.mixed()
    .optional()
    .test("fileType", "Unsupported File Format", function (value) {
      return value?.type ? SUPPORTED_FORMATS.includes(value?.type) : true;
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size ? value?.size <= sizeInBytes : true;
    }),
});


export const HowListchema =Yup.object().shape({
  how_name: Yup.string()
    .min(2, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("House name is required"),

  // userId: Yup.string().required("How admin is required"),

  address: Yup.string()
    .min(2, "Minimum character is 2")
    .required("address is required"),

  how_desc: Yup.string()
    .min(15, "Minimum character is 2")
    .max(50, "Maximum character is 50.")
    .required("Description is required"),

  country_code: Yup.string().required("country is required"),

  state: Yup.string().required("state is required"),

  city: Yup.string().required("city is required"),

  zipcode: Yup.string()
    .required("zip code is required")
    .min(6, "Minimum character is 6"),

  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported File Format", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size <= sizeInBytes;
    }),

  backimage: Yup.mixed()
    .required("Background Image is required")
    .test("fileType", "Unsupported File Format", function (value) {
      return SUPPORTED_FORMATS.includes(value?.type);
    })
    .test("fileSize", "File Size is too large", (value) => {
      const sizeInBytes = 5000000; //0.5MB
      return value?.size <= sizeInBytes;
    }),

});
