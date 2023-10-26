import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import gender_female from "../../assets/gender-female.png";
import gender_male from "../../assets/gender-male.png";
import profile from "../../assets/profile.png";
import eye from "../../assets/eye.svg";
import user1 from "../../assets/user1.png";
import "./EditorManagemenet.css";
import camera from "../../assets/camera-plus.svg";
import cross from "../../assets/Group 81.svg";
import upload from "../../assets/upload.svg";
import { BiSolidCrown } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Dropdownmodal } from "../Dropdownmodal";
import selectedRadio from "../../assets/Group 316.svg";
import Radio from "../../assets/Group 314.svg";
import leftArrow from "../../assets/Group 271.svg";
import circle_check from "../../assets/circle-check-1.png";
import { CustomDropdown } from "../CustomDropdown/CustomDropdown";
import VerificationRequestsBtns from "../VerificationRequestsBtns/VerificationRequestsBtns";
import DeactivationRequestsBtns from "../DeactivationRequestsBtns/DeactivationRequestsBtns";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import initialProfile from "../../assets/profile.png";
import { CustomDropdownHome } from "../CustomDropdownHome/CustomDropdownHome";
import { CustomDropdownEditor } from "../CustomDropdownEditor";
import { useCookies } from "react-cookie";

const EditorManagemenet = (props) => {
  // const [addUser, setAddUser] = useState({});
  const addUser = props?.addUser && props?.addUser
  const setAddUser = props?.setAddUser && props?.setAddUser
  
  // console.log(addUser.country);
  // const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  const preveiwProfilePic = props?.preveiwProfilePic && props?.preveiwProfilePic
  const setPreveiwProfilePic = props?.setPreveiwProfilePic && props?.setPreveiwProfilePic

  // const [partialData, setPartialData] = useState([]);
  const partialData = props?.partialData && props?.partialData
  const setPartialData = props?.setPartialData && props?.setPartialData

  const [cities, setCities] = useState([]);

  const [validName, setValidName] = useState(null);
  const [validUsername, setValidUsername] = useState(null);
  const [validPhone, setValidPhone] = useState(null);
  const [validPassword, setValidPassword] = useState(null);
  const [validExp, setValidExp] = useState(null);
  const [validCity, setValidCity] = useState(null);
  const [validCategory, setValidCategory] = useState(null);
  const [validGender, setValidGender] = useState(null);
  const [validAge, setValidAge] = useState(null);
  const [validAbout, setValidAbout] = useState(null);
  const [validLevel, setValidLevel] = useState(null);

  const [levelRadio, setLevelRadio] = useState("Select");
  const clearError = () => {
    setValidName(null);
    setValidUsername(null);
    setValidPhone(null);
    setValidPassword(null);
    setValidExp(null);
    setValidCity(null);
    setValidCategory(null);
    setValidGender(null);
    setValidAge(null);
    setValidAbout(null);
    setValidLevel(null);
  };

  const clearEditorData = () => {
    setSelectedAge("Select");
    setSelectedCategory("Select");
    setSelectedCity("Select");
    setSelectedDeneyim("Select");
    setSelectedGender("Select");
  };
  const [cookies, setCookie, removeCookie] = useCookies();
  // const [isLoadingDeactive, setIsLoadingDeactive] = useState(false);
  const admin_id = localStorage.getItem("admin-user-id");

  const handleDeactive = async (id, action) => {
    try {
      // setIsLoadingDeactive(true);
      const res = await axios.delete(
        `${config?.apiUrl}/editor-management/${id}/?action=${action}&admin=${admin_id}`
      );
      if (res.status === 200) {
        props?.editorManagementApiData();
        const confirm = await Swal.fire({
          title: "Success",
          text: res?.data?.data,
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const closeButton = modalElement.querySelector(
            "[data-bs-dismiss='modal']"
          );
          if (closeButton) {
            closeButton.click();
          }
        }
        if (confirm.value === true) {
          window.location.reload();
        }
      }
      if (res.status == 204) {
        localStorage.clear();
        removeCookie("admin-user-id");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status === 500) {
        Swal.fire({
          title: "Success",
          text: error?.response?.data?.error,
          icon: "success",
          backdrop: false,
          customClass: "dark-mode-alert",
        });
      }
    }
  };

  const cityApiData1 = async () => {
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
    };
    try {
      const res = await axios.get(
        "https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=1",
        { headers }
      );
      const cityData = res?.data.data.map((item) => item.country);
      return cityData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const cityApiData2 = async () => {
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_NOISYAPIKEY}`,
    };
    try {
      const res = await axios.get(
        "https://www.nosyapi.com/apiv2/bets/getMatchesCountryList?type=2",
        { headers }
      );
      const cityData = res?.data.data.map((item) => item.country);
      return cityData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data1 = await cityApiData1();
      const data2 = await cityApiData2();
      const combinedCities = [...data1, ...data2];
      setCities(combinedCities);
    };

    fetchData();
  }, []);

  const submitEditorData = (e, val) => {
    let name, value;
    name = e.target.name;
    value = val ? val : e.target.value;
    setAddUser({ ...addUser, [name]: value });

    if (name == "name") {
      if (value?.length <= 4 || value?.length >= 20) {
        setValidName("Name must be 5 to 20 characters.");
      } else {
        setValidName(null);
      }
    } else if (name == "username") {
      if (value?.length <= 4 || value?.length >= 15) {
        setValidUsername("UserName must be 5 to 15 characters.");
      } else {
        setValidUsername(null);
      }
    } else if (name == "phone") {
      if (value?.match(/^5\d*$/) == null || value?.length != 10) {
        setValidPhone("Phone must start with '5' and must be 10 digits.");
      } else {
        setValidPhone(null);
      }
    } else if (name == "password") {
      if (value?.length < 8) {
        setValidPassword("Password must be at least 8 characters.");
      } else {
        setValidPassword(null);
      }
    } else if (name == "about") {
      if (value?.length > 250) {
        setValidAbout("About must be less then 250 characters.");
      } else {
        setValidAbout(null);
      }
    }
  };

  const [displayUser, setDisplayUser] = useState([]);
  const [allFilterData, setAllFilterData] = useState([]);

  // useEffect(() => {
  //   setDisplayUser(props.users);
  //   setAllFilterData(props.users);
  // }, [props.users]);

  // useEffect(() => {
  // console.log("displayUser::::::::::::::::::", displayUser);
  // }, [displayUser]);

  useEffect(() => {
    if (props?.deactiveRqst) {
      setDisplayUser(props?.deactivateUser);
      setAllFilterData(props?.deactivateUser);
    } else {
      setDisplayUser(props?.users);
      setAllFilterData(props?.users);
    }
    // setDisplayUser(props?.users==undefined?[]:props?.users)
  }, [props.users, props?.deactiveRqst]);

  const [displaySelectedImg, setdisplaySelectedImg] = useState(false);
  // const [preveiwProfilePic, setPreveiwProfilePic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);

  const [kategoriDropdown, setKategoriDropdown] = useState(false);
  const [experienceError, setExperienceError] = useState("");
  const deneyimOptions = ["1-2 years", "3-4 years", "5+ years", "10+ years"];
  const [selectedDeneyim, setSelectedDeneyim] = useState("Select");
  const [deneyimDropdown, setDeneyimDropdown] = useState(false);

  const handleDeneyimSelection = (name, value) => {
    setSelectedDeneyim(value);
    setAddUser({ ...addUser, [name]: value });
    // setExperienceError("");
  };

  const toggleDeneyimDropdown = () => {
    // setKategoriDropdown(false);
    // setDeneyimDropdown(!deneyimDropdown);
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setDeneyimDropdown(!deneyimDropdown);
  };

  function handleAddProfile(e) {
    const imageFile = e.target.files[0];
    setPreveiwProfilePic(URL.createObjectURL(imageFile));
    setSelectedImage(imageFile);
  }

  const handleNewEditor = async () => {
    if (addUser.name == "" || addUser.name == undefined) {
      setValidName("Name must be 5 to 20 characters.");
    }
    if (addUser.username == "" || addUser.username == undefined) {
      setValidUsername("UserName must be 5 to 15 characters.");
    }
    if (addUser.phone == "" || addUser.phone == undefined) {
      setValidPhone("Phone must start with '5' and must be 10 digits.");
    }
    if (addUser.password == "" || addUser.password == undefined) {
      setValidPassword("Password must be at least 8 characters.");
    }

    if (selectedDeneyim == "Select") {
      setValidExp("Please select Experience.");
    } else {
      setValidExp(null);
    }

    if (selectedCity == "Select") {
      setValidCity("Please select city.");
    } else {
      setValidCity(null);
    }

    if (selectedCategory == "Select") {
      setValidCategory("Please select age.");
    } else {
      setValidCategory(null);
    }

    if (selectedGender == "Select") {
      setValidGender("Please select gender.");
    } else {
      setValidGender(null);
    }

    if (selectedAge == "Select") {
      setValidAge("Please select age.");
    } else {
      setValidAge(null);
    }

    if (levelRadio == "Select") {
      setValidLevel("Please select Editor's level.");
    } else {
      setValidLevel(null);
    }

    if (
      Object.keys(addUser).length >= 10 &&
      validName == null &&
      validUsername == null &&
      validPhone == null &&
      validPassword == null &&
      validExp == null &&
      validCity == null &&
      validCategory == null &&
      validAge == null &&
      validGender == null &&
      validLevel == null
    ) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("name", addUser.name);
      formData.append("username", (addUser.username).toLowerCase());
      formData.append("phone", addUser.phone);
      formData.append("password", addUser.password);
      formData.append("about", addUser.about);
      formData.append("experience", addUser.experience);
      formData.append("city", addUser.city);
      formData.append(
        "category",
        `{"${addUser.category?.split(", ")?.join('","')}"}`
      );
      formData.append("gender", addUser.gender);
      formData.append("age", addUser.age);
      formData.append("level", addUser.level);
      formData.append("membership_date", addUser.membership_date);
      const id = 1; // temp
      try {
        const response = await axios.post(
          `${config?.apiUrl}/editor-management/?admin=${admin_id}`,
          formData
        );
        if (response.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const closeButton = modalElement.querySelector(
            "[data-bs-dismiss='modal']"
          );
          if (closeButton) {
            closeButton.click();
          }
        }
        if (response.status === 200) {
          clearEditorData();
          clearError();
          const confirm = await Swal.fire({
            title: "Success",
            text: "Editor Created!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          setAddUser({
            name: "",
            username: "",
            phone: "",
            password: "",
            experience: "",
            city: "",
            category: "",
            gender: "",
            age: "",
            about: "",
            membership_date: "",
          });
          if (confirm.value === true) {
            window.location.reload();
          }
        }
        // setDisplayUser(response.data);
      } catch (error) {
        if (error?.response?.data?.error) {
          Swal.fire({
            title: "Error",
            text: `${error?.response?.data?.error}`,
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
        console.error("Error making POST request:", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: `Please fill all fields.`,
        icon: "error",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };

  const [updateEditor, setUpdateEditor] = useState({});
  const submitUpadteEditorData = (e, val) => {
    let name, value;
    name = e.target.name;
    value = val ? val : e.target.value;
    setUpdateEditor({ ...updateEditor, [name]: value });
  };
  const handleUpdateEditor = async (id, editor_id) => {
    if (addUser.experience == "" || addUser.experience == "Select") {
      setValidExp("Please select Experience.");
    } else {
      setValidExp(null);
    }

    if (addUser.city == "" || addUser.city == "Select") {
      setValidCity("Please select City.");
    } else {
      setValidCity(null);
    }

    if (
      addUser.category.length <= 0 ||
      addUser.category[0] == "Select" ||
      addUser.category[0] == ""
    ) {
      setValidCategory("Please select Category.");
    } else {
      setValidCategory(null);
    }

    if (addUser.gender == "" || addUser.gender == "Select") {
      setValidGender("Please select gender.");
    } else {
      setValidGender(null);
    }

    if (addUser.age == "" || addUser.age == "Select") {
      setValidAge("Please select age.");
    } else {
      setValidAge(null);
    }

    if (
      Object.keys(addUser).length >= 9 &&
      validName == null &&
      validUsername == null &&
      validPhone == null &&
      validPassword == null &&
      validExp == null &&
      validCity == null &&
      validCategory == null &&
      validAge == null &&
      validGender == null
    ) {
      const formData = new FormData();
      selectedImage != false && formData.append("profile_pic", selectedImage);
      formData.append("name", addUser.name);
      formData.append("username", (addUser.username).toLowerCase());
      formData.append("phone", addUser.phone);
      formData.append("password", addUser.password);
      formData.append("about", addUser.about);
      formData.append("experience", addUser.experience);
      formData.append("city", addUser.city);
      formData.append(
        "category",
        `${
          Array.isArray(addUser?.category)
            ? addUser?.category?.join(",")
            : addUser?.category?.split(", ")?.join(",")
        }`
      );
      formData.append("gender", addUser.gender);
      formData.append("age", addUser.age);
      formData.append("editor_id", editor_id);
      formData.append("membership_date", addUser.membership_date);
      try {
        const response = await axios.patch(
          `${config?.apiUrl}/editor-management/${id}/?admin=${admin_id}`,
          formData
        );
        if (response.status == 204) {
          localStorage.clear();
          removeCookie("admin-user-id");
          window.location.reload();
        }
        if (response.status === 200) {
          clearError();
          props.setupdateProfile(1);
          setAddUser({
            name: "",
            username: "",
            phone: "",
            password: "",
            experience: "",
            city: "",
            category: "",
            gender: "",
            age: "",
            about: "",
            membership_date: "",
          });
          const confirm = await Swal.fire({
            title: "Success",
            text: "Editor Updated!",
            icon: "success",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
          if (confirm.value === true) {
            window.location.reload();
          }
        }
        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const closeButton = modalElement.querySelector(
            "[data-bs-dismiss='modal']"
          );
          if (closeButton) {
            closeButton.click();
          }
        }
        // setDisplayUser(response.data);
        // console.log('API Response:', response.data);
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.error) {
          Swal.fire({
            title: "Error",
            text: `${error?.response?.data?.error}`,
            icon: "error",
            backdrop: false,
            customClass: "dark-mode-alert",
          });
        }
        console.error("Error making POST request:", error);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: `Please fill all fields.`,
        icon: "error",
        backdrop: false,
        customClass: "dark-mode-alert",
      });
    }
  };

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const handleEditorFiltor = async () => {
    setIsFilterLoading(true);
    try {
      const response = await axios.post(`${config?.apiUrl}/filter-editors/`, {
        lavel: selectedLevelFilter,
        success_rate: selectedSuccessRateFilter,
        score_point: selectedScorePointFilter,
        city: selectedCityFilter,
        age: selectedAgeFilter,
        gender: selectedGenderFilter,
      });
      setDisplayUser(response.data);
      setAllFilterData(response.data);
      response.data && setIsFilterLoading(false);
    } catch (error) {
      setIsFilterLoading(false);
      console.error("Error making POST request:", error);
    }
  };

  const [isJourneymanSelected, setIsJourneymanSelected] = useState(false);
  const [isExpertSelected, setIsExpertSelected] = useState(false);
  const [isGrandmasterSelected, setIsGrandmasterSelected] = useState(false);

  const filteredData = (e) => {
    const val = e.target.value.toLowerCase();

    const filteredArray = props?.users?.filter(
      (obj) =>
        obj?.editor_data?.username?.toLowerCase().startsWith(val) ||
        obj?.editor_data?.name?.toLowerCase().includes(val)
    );
    setAllFilterData(filteredArray);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Türkiye");
  const [cityDropDown, setCityDropDown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Select");
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select");
  const [ageDropDown, setAgeDropDown] = useState(false);
  const [selectedAge, setSelectedAge] = useState("Select");
  const [selectedCategory, setSelectedCategory] = useState("Select");
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  const [showHistory, setshowHistory] = useState(false);

  const handleCountrySelection = (name, value) => {
    setSelectedCountry(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleCountryDropdown = () => {
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setCountryDropDown(!countryDropDown);
  };

  const handleCitySelection = (name, value) => {
    setSelectedCity(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleCityDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setCityDropDown(!cityDropDown);
  };

  const handleGenderSelection = (name, value) => {
    setSelectedGender(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleGenderDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    setGenderDropDown(!genderDropDown);
  };

  const handleAgeSelection = (name, value) => {
    setSelectedAge(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleAgeDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (categoryDropdown) {
      setCategoryDropdown(false);
    }
    setAgeDropDown(!ageDropDown);
  };

  const handleCategorySelection = (name, value) => {
    setSelectedCategory(value);
    setAddUser({ ...addUser, [name]: value });
  };

  const toggleCategoryDropdown = () => {
    if (countryDropDown) {
      setCountryDropDown(false);
    }
    if (genderDropDown) {
      setGenderDropDown(false);
    }
    if (cityDropDown) {
      setCityDropDown(false);
    }
    if (ageDropDown) {
      setAgeDropDown(false);
    }
    setCategoryDropdown(!categoryDropdown);
  };

  const countryOptions = cities;
  const cityOptions = [
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Antalya",
    "Adana",
    "Gaziantep",
    "Konya",
    "Mersin",
    "Diyarbakır",
    "Kayseri",
    "Eskişehir",
    "Trabzon",
    "Samsun",
    "Denizli",
  ];
  const genderOptions = ["Male", "Female", "I don't want to specify"];
  const ageOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];
  const categoryOptions = ["Futbol", "Basketbol", "Futbol, Basketbol"];

  const [selectedHisory, setselectedHisory] = useState("subscriber");
  const [subscriberIncome, setSubscriberIncome] = useState([]);
  const [withdrawal, setWithdrawal] = useState([]);
  const [payment, setPayment] = useState([]);

  const handleTransectionHistory = async (id) => {
    // console.log("IDDD: ", id)
    try {
      // setIsLoadingDeactive(true);
      const res = await axios.get(
        `${config?.apiUrl}/transaction-history/${id}/`
      );
      if (res.status === 200) {
        // console.log("-->: ", res);
        const data = res.data.subscriber_income;
        data.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());
        setSubscriberIncome(data);
        setWithdrawal(res.data.withdrawal);
        const data2 = res.data.payment
        data2.sort((a, b) => moment(b.created).unix() - moment(a.created).unix());
        setPayment(data2);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const subscriberArray = [
    { id: "#0001", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0002", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0003", profile: user1, name: "johndoe", month: "6 Months" },
    { id: "#0004", profile: user1, name: "johndoe", month: "3 Months" },
    { id: "#0005", profile: user1, name: "johndoe", month: "3 Months" },
  ];
  const withdrawalArray = [
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
    { id: "#0001", account: "TR00 0009 9012 3456 7800 1000 01" },
  ];
  const paymentArray = [
    { id: "#0001", plan: "Expert Membership Plan" },
    { id: "#0002", plan: "Highlight Plan 2 Week" },
    { id: "#0003", plan: "Expert Membership Plan" },
    { id: "#0004", plan: "Highlight Plan 2 Week" },
  ];

  const GenderFilterOptions = ["Male", "Female", "I don't want to specify"];
  const LevelOptions = ["Apprentice", "Journeyman", "Expert", "Grandmaster"];
  const CityFilterOptions = [
    "Istanbul",
    "Ankara",
    "Izmir",
    "Bursa",
    "Antalya",
    "Adana",
    "Gaziantep",
    "Konya",
    "Mersin",
    "Diyarbakır",
    "Kayseri",
    "Eskişehir",
    "Trabzon",
    "Samsun",
    "Denizli",
  ];
  const ageFilterOptions = ["18 - 24", "25 - 34", "35 - 44", "44+"];
  const SuccessRateFilterOptions = ["0 - 40", "40 - 60", "60 - 80", "80 - 100"];
  const ScorePointFilterOptions = ["0 - 400", "400 - 600", "600 - 800", "800+"];

  const [selectedSuccessRateFilter, setSelectedSuccessRateFilter] =
    useState("Select");
  const [successRateFilterDropDown, setSuccessRateFilterDropDown] =
    useState(false);

  const [selectedScorePointFilter, setSelectedScorePointFilter] =
    useState("Select");
  const [scorePointFilterDropDown, setScorePointFilterDropDown] =
    useState(false);

  const [selectedGenderFilter, setSelectedGenderFilter] = useState("Select");
  const [genderFilterDropDown, setGenderFilterDropDown] = useState(false);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState("Select");
  const [levelFilterDropDown, setLevelFilterDropDown] = useState(false);

  const [selectedCityFilter, setSelectedCityFilter] = useState("Select");
  const [cityFilterDropDown, setCityFilterDropDown] = useState(false);

  const [selectedAgeFilter, setSelectedAgeFilter] = useState("Select");
  const [ageFilterDropDown, setAgeFilterDropDown] = useState(false);

  const handleCityFilterSelection = (gender) => {
    setSelectedCityFilter(gender);
  };
  const toggleCityFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setCityFilterDropDown(!cityFilterDropDown);
  };
  const handleGenderFilterSelection = (gender) => {
    setSelectedGenderFilter(gender);
  };
  const toggleGenderFilterDropdown = () => {
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setGenderFilterDropDown(!genderFilterDropDown);
  };
  const handleAgeFilterSelection = (gender) => {
    setSelectedAgeFilter(gender);
  };
  const toggleAgeFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setAgeFilterDropDown(!ageFilterDropDown);
  };
  const toggleLevelFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setLevelFilterDropDown(!levelFilterDropDown);
  };
  const handleLevelFilterSelection = (gender) => {
    setSelectedLevelFilter(gender);
  };
  const handleSuccessRateFilterSelection = (rate) => {
    setSelectedSuccessRateFilter(rate);
  };

  const handleScorePointFilterSelection = (point) => {
    setSelectedScorePointFilter(point);
  };

  const toggleSuccessRateFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (scorePointFilterDropDown) {
      setScorePointFilterDropDown(false);
    }
    setSuccessRateFilterDropDown(!successRateFilterDropDown);
  };

  const toggleScorePointFilterDropdown = () => {
    if (genderFilterDropDown) {
      setGenderFilterDropDown(false);
    }
    if (ageFilterDropDown) {
      setAgeFilterDropDown(false);
    }
    if (cityFilterDropDown) {
      setCityFilterDropDown(false);
    }
    if (levelFilterDropDown) {
      setLevelFilterDropDown(false);
    }
    if (successRateFilterDropDown) {
      setSuccessRateFilterDropDown(false);
    }
    setScorePointFilterDropDown(!scorePointFilterDropDown);
  };
  const server_url = `${config?.apiUrl}`;

  const editorsArray = props?.verifyRqst
    ? props?.verificationRequests
    : props?.deactiveRqst
    ? props?.deactivationonRequests
    : allFilterData;

  return (
    <>
      <div className="dark-mode p-2 m-2 mb-0 home-height">
        <div className="d-flex p-2">
          <div className="p-2 flex-grow-1">
            <div class="input-group w-50">
              <span class="input-group-text search-icon-dark" id="basic-addon1">
                <GoSearch style={{ color: "#FFFFFF" }} />
              </span>
              <input
                onChange={filteredData}
                type="text"
                className="input-field-dark"
              />
            </div>
          </div>
          <div className="p-2">
            <button
              data-bs-toggle="modal"
              data-bs-target="#filterModal"
              className="px-2"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #E6E6E6",
                color: "#E6E6E6",
              }}
            >
              Filter
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={() => {
                props.setupdateProfile(1);
                setAddUser({});
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="px-2"
              style={{
                backgroundColor: "transparent",
                borderRadius: "3px",
                border: "1px solid #5BDEAA",
                color: "#5BDEAA",
              }}
              // onClick={() => setAddUser({})}
            >
              Create Editor
            </button>
          </div>
        </div>
        {props?.isLoading || isFilterLoading ? (
          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
            Loading...
          </div>
        ) : (
          <>
            {editorsArray?.length == 0 ? (
              <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                No Record Found!
              </div>
            ) : (
              editorsArray?.map((res, index) => (
                <div
                  key={index}
                  onClick={() => {
                    props.setupdateProfile(2);
                    setPartialData(res);
                    setAddUser(res.editor_data);
                    setPreveiwProfilePic( res?.editor_data?.profile_pic !== null ? server_url + res?.editor_data?.profile_pic : null)
                  }}
                  className="px-2 py-1 mb-2 row-fonts cursor"
                  style={{ backgroundColor: "#0B2447", fontSize: "1rem" }}
                >
                  <div className="row g-0 d-flex justify-content-between align-items-center">
                    <div className="col-3">
                      <div className="d-flex align-items-center">
                        <span className="pe-1">{`# ${(editorsArray.length - index)
                      .toString()
                      .padStart(4, "0")}`}</span>
                        <div className="position-relative">
                          <img
                            className="rounded-circle profile-icon"
                            src={`${
                              res?.editor_data?.profile_pic
                                ? server_url + res?.editor_data?.profile_pic
                                : initialProfile
                            }`}
                            alt=""
                            height={42}
                            width={42}
                          />
                          <div
                            className="position-absolute d-flex justify-content-center align-items-center crown-position"
                            style={{
                              height: "14px",
                              width: "14px",
                              border: "2px solid #FF9100",
                              borderRadius: "50%",
                              backgroundColor: "#0B2447",
                              top: "0px",
                              left: "27px",
                            }}
                          >
                            <BiSolidCrown
                              fontSize={"0.49rem"}
                              style={{ color: "#FF9100" }}
                            />
                          </div>
                        </div>
                        <span
                          className="ps-1"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          {res?.editor_data?.name}
                        </span>
                      </div>
                    </div>
                    <div
                      className="d-flex gap-2 align-items-center col-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <div>{res?.editor_data?.username}</div>
                    </div>
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="d-flex align-items-center block-width col-3 gap-1"
                      style={{ minWidth: "7.5rem" }}
                    >
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ color: "#D2DB0B", fontSize: "1rem" }}
                      >
                        %{res?.editor_data?.success_rate}
                      </span>
                      {res?.editor_data?.gender == "Male" && (
                        <img src={gender_male} alt="" height={23} width={23} />
                      )}
                      {res?.editor_data?.gender == "Female" && (
                        <img
                          src={gender_female}
                          alt=""
                          height={23}
                          width={23}
                        />
                      )}
                      <span>{res?.editor_data?.age}</span>
                      <div className="">{res?.editor_data?.country}</div>
                    </div>
                    <div
                      className="d-flex align-items-center gap-1 col-3 justify-content-end eye-gap"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <span>
                        {moment(res?.editor_data?.created).format(
                          "DD-MM.YYYY - HH:mm"
                        )}
                      </span>
                      <img
                        className="icons-edit-eye"
                        src={circle_check}
                        alt=""
                        height={28}
                        width={28}
                      />
                      <img
                        className="icons-edit-eye"
                        src={eye}
                        alt=""
                        height={28}
                        width={28}
                      />
                    </div>
                  </div>
                  {props?.verifyRqst && (
                    <VerificationRequestsBtns
                      id={res?.editor_data?.id}
                      editorManagementApiData={props?.editorManagementApiData}
                    />
                  )}
                  {props?.deactiveRqst && (
                    <DeactivationRequestsBtns
                      id={res?.editor_data?.id}
                      editorManagementApiData={props.editorManagementApiData}
                    />
                  )}
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* CREATE & UPDATE EDITOR */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-body dark-mode p-3">
              <div className="d-flex position-relative my-2">
                <label
                  htmlFor="camera"
                  style={{
                    display: displaySelectedImg ? "none" : "block",
                  }}
                >
                  <div
                    className="my-1 cursor"
                    style={{
                      backgroundColor: preveiwProfilePic ? "transparent" : "#E6E6E6",
                      borderRadius: "50%",
                      height: "8rem",
                      width: "8rem",
                    }}
                  >
                    <img
                      style={{
                       width:"100%",
                       height:"100%",
                       borderRadius: "50%",
                       padding:!preveiwProfilePic ? "20px" : null,
                      }}
                      src={preveiwProfilePic ? preveiwProfilePic : camera}
                      // src={camera}
                      alt=""
                    />
                  </div>
                </label>
                <img
                  src={preveiwProfilePic}
                  alt=""
                  height={135}
                  width={135}
                  style={{
                    display: displaySelectedImg ? "block" : "none",
                    objectFit: "cover",
                    borderRadius: "50%  ",
                  }}
                />
                <input
                  type="file"
                  className="d-none"
                  id="camera"
                  onChange={(e) => handleAddProfile(e)}
                />
                <div
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    height: "1.78rem",
                    width: "1.78rem",
                    border: "3px solid #FFEE7D",
                    borderRadius: "50%",
                    backgroundColor: "#0B2447",
                    top: "6px",
                    left: "4.9rem",
                  }}
                >
                  <BiSolidCrown
                    fontSize={"0.8rem"}
                    style={{ color: "#FFEE7D" }}
                  />
                </div>
                <div
                  className={`${props.updateProfile === 2 ? "mt-3" : "mt-5"}`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <div className="col">
                    {props.updateProfile === 2 && (
                      <div className="ms-2 mb-2">
                        <button
                          className="px-3"
                          style={{
                            border: "1px solid #FFA200",
                            color: "#FFA200",
                            backgroundColor: "transparent",
                            borderRadius: "18px",
                            fontSize: "0.9rem",
                          }}
                        >
                          {partialData?.editor_data?.commentator_level
                            ?.charAt(0)
                            .toUpperCase() +
                            partialData?.editor_data?.commentator_level
                              ?.slice(1)
                              .toLowerCase()}
                        </button>
                      </div>
                    )}
                    <div className="d-flex justify-content-center mb-2">
                    <label
                  htmlFor="camera"
                  style={{
                    display: displaySelectedImg ? "none" : "block",
                  }}
                >
                      <span
                        className="mb-2 px-2"
                        style={{
                          backgroundColor: "#0B2447",
                          borderRadius: "2px",
                          padding:"5px"
                        }}
                      >
                        <img
                          className="mb-1"
                          src={upload}
                          alt=""
                          height={20}
                          width={20}
                        />
                        <span className="ps-2">Upload</span>
                      </span>
                      </label>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => {
                        // console.log(
                        //   "date:",
                        //   moment(e.target.value).format(
                        //     "YYYY-MM-DD HH:mm:SS.SSSSSSZ"
                        //   )
                        // );
                        setAddUser({
                          ...addUser,
                          membership_date: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                      value={addUser.membership_date}
                      className="px-2 py-1"
                      name="membership_date"
                      style={{
                        color: "white",
                        backgroundColor: "#0B2447",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
                {props.updateProfile === 2 && (
                  <div className="col p-2 ps-3">
                    <div className="text-end" style={{ fontSize: "1.3rem" }}>
                      Total Balance {partialData?.total_transection}
                    </div>
                    <div
                      onClick={() => {
                        setshowHistory(true);
                        handleTransectionHistory(partialData?.editor_data?.id);
                      }}
                      className="text-end"
                      style={{ fontSize: ".9rem", cursor: "pointer" }}
                    >
                      Transaction History
                    </div>
                    <div className="d-flex gap-4 justify-content-end my-2">
                      <div className="d-flex flex-column text-center">
                        <span>Subscribers</span>
                        <span>{partialData.Subscriber_Count}</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Subscriptions</span>
                        <span>{partialData.Subscription_Count}</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Followers</span>
                        <span>{partialData.Follower_Count}</span>
                      </div>
                      <div className="d-flex flex-column text-center">
                        <span>Following</span>
                        <span>{partialData.Following_Count}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {showHistory ? (
                <div className="p-2">
                  <div className="d-flex justify-content-between">
                    <div className="p-1 gap-3 d-flex ">
                      <img
                        src={leftArrow}
                        alt=""
                        height={20}
                        width={20}
                        onClick={() => setshowHistory(false)}
                      />
                      <div
                        onClick={() => setselectedHisory("subscriber")}
                        className=""
                        style={{
                          color:
                            selectedHisory === "subscriber" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Subscriber Income
                      </div>
                      <div
                        onClick={() => setselectedHisory("withdrawal")}
                        className=""
                        style={{
                          color:
                            selectedHisory === "withdrawal" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Withdrawal
                      </div>
                      <div
                        onClick={() => setselectedHisory("payment")}
                        className=""
                        style={{
                          color: selectedHisory === "payment" ? "#D2DB0B" : "",
                          cursor: "pointer",
                        }}
                      >
                        Payment
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="px-3 py-1"
                        style={{
                          color: "#FF9100",
                          backgroundColor: "transparent",
                          border: "1px solid #FF9100",
                          borderRadius: "4px",
                        }}
                      >
                        Export
                      </button>
                    </div>
                  </div>
                  <div
                    className="my-2"
                    style={{ overflowY: "scroll", height: "18rem" }}
                  >
                    {selectedHisory === "subscriber" && (
                      <>
                        {subscriberIncome?.length == 0 ? (
                          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                            No Record Found!
                          </div>
                        ) : (
                          subscriberIncome?.map((res, index) => (
                            <div
                              className="row g-0 my-2 dark-mode px-3"
                              style={{ backgroundColor: "#0B2447" }}
                            >
                              <div className="col d-flex align-items-center">
                                <span className="pe-2">{`# ${(index + 1)
                                  .toString()
                                  .padStart(4, "0")}`}</span>
                                <img
                                  src={
                                    res?.user?.profile_pic
                                      ? `${config.apiUrl}${res?.user?.profile_pic}`
                                      : initialProfile
                                  }
                                  className="rounded-circle"
                                  alt=""
                                  height={50}
                                  width={50}
                                />
                                <span className="ps-2">{res.user.name}</span>
                              </div>
                              <div className="col d-flex align-items-center gap-3 justify-content-center">
                                <div>{res.duration.split("-")[1]} Month</div>
                                <div>{res.duration}</div>
                                <div>{res.amount.toFixed(2)}</div>
                              </div>
                              <div className="col d-flex align-items-center justify-content-end">
                                <div>
                                  {moment(res.date).format(
                                    "DD-MM.YYYY - HH:mm"
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </>
                    )}
                    {selectedHisory === "withdrawal" && (
                      <>
                        {withdrawal?.length == 0 ? (
                          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                            No Record Found!
                          </div>
                        ) : (
                          withdrawal?.map((res, index) => (
                            <div
                              className="my-2 dark-mode px-3 py-2 pe-0 d-flex gap-5"
                              style={{
                                backgroundColor: "#0B2447",
                                fontSize: "0.9rem",
                              }}
                            >
                              <div className="">{res.id}</div>
                              <div className="">{res.account}</div>
                              <div className="">15-06-2023 - 16:37</div>
                              <div className="">3.500</div>
                              <div className="gap-0">
                                <img
                                  src={circle_check}
                                  alt=""
                                  height={25}
                                  width={25}
                                />
                              </div>
                            </div>
                          ))
                        )}
                      </>
                    )}
                    {selectedHisory === "payment" && (
                      <>
                        {payment?.length == 0 ? (
                          <div className="d-flex gap-1 my-2 pb-2 h-75 align-items-center justify-content-center">
                            No Record Found!
                          </div>
                        ) : (
                          payment?.map((res, index) => (
                          <div
                            className="row g-0 my-2 dark-mode px-3 py-2"
                            style={{
                              backgroundColor: "#0B2447",
                              fontSize: "0.9rem",
                            }}
                          >
                            <div className="col gap-5 d-flex">
                              <div>{`# ${(index + 1)
                                  .toString()
                                  .padStart(4, "0")}`}</div>
                              {res.subscription ? <div>{res.commentator_user.commentator_level.charAt(0).toUpperCase() + res.commentator_user.commentator_level.slice(1)} Subscription Plan</div> : null}
                              {res.highlight ? <div>Highlight Plan {res.duration}</div> : null}
                            </div>
                            <div className="col gap-5 d-flex justify-content-end">
                              <div>{moment(res.created).format(
                                    "DD-MM.YYYY - HH:mm"
                                  )}</div>
                              <div>{res.money}</div>
                            </div>
                          </div>
                        )))}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="row g-0 gap-3 my-2">
                    <div className="col d-flex flex-column">
                      <span>Name Surname</span>
                      <input
                        // onChange={submitEditorData}
                        onChange={(e) => {
                          submitEditorData(e);
                        }}
                        name="name"
                        value={addUser.name}
                        type="text"
                        className="darkMode-input form-control"
                      />
                      {validName ? (
                        <small className="text-danger">{validName}</small>
                      ) : null}
                    </div>
                    <div className="col d-flex flex-column">
                      <span>Username</span>
                      <input
                        onChange={(e) => {
                          submitEditorData(e);
                        }}
                        name="username"
                        value={addUser.username}
                        type="text"
                        className="darkMode-input form-control"
                      />
                      {validUsername ? (
                        <small className="text-danger">{validUsername}</small>
                      ) : null}
                    </div>
                    <div className="col d-flex flex-column">
                      <span>Phone</span>
                      <div class="input-group">
                        <span
                          class="input-group-text darkMode-input"
                          id="basic-addon1"
                          style={{ padding: ".375rem 0 .375rem .5rem" }}
                        >
                          +90
                        </span>
                        <input
                          onChange={(e) => {
                            submitEditorData(e);
                          }}
                          name="phone"
                          value={addUser.phone}
                          type="number"
                          class="form-control darkMode-input"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                        {validPhone ? (
                          <small className="text-danger">{validPhone}</small>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row g-0 gap-3">
                    <div className="col d-flex flex-column">
                      <span>Password</span>
                      <div className="darkMode-input input-group align-items-center">
                        <input
                          onChange={(e) => {
                            submitEditorData(e);
                          }}
                          name="password"
                          value={addUser.password}
                          // style={{-webkit-text-security: square;}}
                          style={{ width: "13rem" }}
                          className="darkMode-input form-control"
                          type={showPassword ? "text" : "password"}
                          // value={password}
                          // onChange={(e) => setPassword(e.target.value)}
                        />

                        {showPassword ? (
                          <div className="input-group-append">
                            <AiOutlineEyeInvisible
                              fontSize={"1.5rem"}
                              // style={{
                              //   position: "absolute",
                              //   top: "16.6rem",
                              //   left: "14rem",
                              // }}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        ) : (
                          <div className="input-group-append">
                            <AiOutlineEye
                              fontSize={"1.5rem"}
                              // style={{
                              //   position: "absolute",
                              //   top: "16.6rem",
                              //   left: "14rem",
                              // }}
                              onClick={() => setShowPassword(!showPassword)}
                            />
                          </div>
                        )}
                      </div>
                      {validPassword ? (
                        <small className="text-danger">{validPassword}</small>
                      ) : null}
                    </div>
                    <div className="col">
                      {/* <CustomDropdownEditor
                        onChange={submitEditorData}
                        name="country"
                        value={addUser.selectedCountry}
                        label="Country"
                        options={countryOptions}
                        selectedOption={
                          addUser.country ? addUser.country : selectedCountry
                        }
                        onSelectOption={handleCountrySelection}
                        isOpen={countryDropDown}
                        toggleDropdown={toggleCountryDropdown}
                      /> */}
                      <CustomDropdownEditor
                        label="Experience"
                        name="experience"
                        value={addUser.selectedDeneyim}
                        onChange={submitEditorData}
                        options={deneyimOptions}
                        selectedOption={
                          addUser.experience
                            ? addUser.experience
                            : selectedDeneyim
                        }
                        onSelectOption={handleDeneyimSelection}
                        isOpen={deneyimDropdown}
                        toggleDropdown={toggleDeneyimDropdown}
                      />
                      {validExp ? (
                        <small className="text-danger">{validExp}</small>
                      ) : null}
                    </div>
                    <div className="col">
                      <CustomDropdownEditor
                        onChange={submitEditorData}
                        name="city"
                        value={addUser.selectedCity}
                        label="City"
                        options={cityOptions}
                        selectedOption={
                          addUser.city ? addUser.city : selectedCity
                        }
                        onSelectOption={handleCitySelection}
                        isOpen={cityDropDown}
                        toggleDropdown={toggleCityDropdown}
                      />
                      {validCity ? (
                        <small className="text-danger">{validCity}</small>
                      ) : null}
                    </div>
                  </div>
                  <div className="row gap-3 g-0 my-2">
                    <div className="col">
                      <CustomDropdownEditor
                        onChange={submitEditorData}
                        name="category"
                        value={addUser.selectedCategory}
                        label="Category"
                        options={categoryOptions}
                        selectedOption={
                          addUser.category
                            ? Array.isArray(addUser.category)
                              ? addUser.category.join(", ")
                              : addUser.category
                            : selectedCategory
                        }
                        onSelectOption={handleCategorySelection}
                        isOpen={categoryDropdown}
                        toggleDropdown={toggleCategoryDropdown}
                      />
                      {validCategory ? (
                        <small className="text-danger">{validCategory}</small>
                      ) : null}
                    </div>
                    <div className="col">
                      <CustomDropdownEditor
                        onChange={submitEditorData}
                        name="gender"
                        value={addUser.selectedGender}
                        label="Gender"
                        options={genderOptions}
                        selectedOption={
                          addUser.gender ? addUser.gender : selectedGender
                        }
                        onSelectOption={handleGenderSelection}
                        isOpen={genderDropDown}
                        toggleDropdown={toggleGenderDropdown}
                      />
                      {validGender ? (
                        <small className="text-danger">{validGender}</small>
                      ) : null}
                    </div>
                    <div className="col">
                      <CustomDropdownEditor
                        onChange={submitEditorData}
                        name="age"
                        value={addUser.selectedAge}
                        label="Age"
                        options={ageOptions}
                        selectedOption={addUser.age ? addUser.age : selectedAge}
                        onSelectOption={handleAgeSelection}
                        isOpen={ageDropDown}
                        toggleDropdown={toggleAgeDropdown}
                      />
                      {validAge ? (
                        <small className="text-danger">{validAge}</small>
                      ) : null}
                    </div>
                  </div>
                  <div className="row g-0 my-2 gap-4">
                    <div className="col-7">
                      About
                      <div className="">
                        <span></span>
                        <div class="form-floating">
                          <textarea
                            onChange={submitEditorData}
                            name="about"
                            value={addUser.about == "null" ? "" : addUser.about}
                            style={{ height: "100px" }}
                            className="darkMode-input form-control"
                          ></textarea>
                        </div>
                        <span style={{ fontSize: "0.8rem" }}>
                          Max. 250 character
                        </span>
                      </div>
                      {validAbout ? (
                        <small className="text-danger">{validAbout}</small>
                      ) : null}
                    </div>
                    {props.updateProfile !== 2 && (
                      <div className="col-4 d-flex flex-column justify-content-center gap-2">
                        <div className="">
                          <img
                            name="level"
                            value="journeyman"
                            height={30}
                            width={30}
                            onClick={(e) => {
                              setIsJourneymanSelected(!isJourneymanSelected);
                              submitEditorData(e, "journeyman");
                              setLevelRadio("journeyman");
                            }}
                            src={
                              addUser.level == "journeyman"
                                ? selectedRadio
                                : Radio
                            }
                            alt=""
                            style={{ cursor: "pointer" }}
                          />
                          <span className="px-2">Journeyman</span>
                        </div>
                        <div className="">
                          <img
                            name="level"
                            value="master"
                            height={30}
                            width={30}
                            onClick={(e) => {
                              setIsExpertSelected(!isExpertSelected);
                              submitEditorData(e, "master");
                              setLevelRadio("master");
                            }}
                            src={
                              addUser.level == "master" ? selectedRadio : Radio
                            }
                            alt=""
                            style={{ cursor: "pointer" }}
                          />
                          <span className="px-2">Expert</span>
                        </div>
                        <div className="">
                          <img
                            name="level"
                            value="grandmaster"
                            height={30}
                            width={30}
                            onClick={(e) => {
                              setIsGrandmasterSelected(!isGrandmasterSelected);
                              submitEditorData(e, "grandmaster");
                              setLevelRadio("grandmaster");
                            }}
                            src={
                              addUser.level == "grandmaster"
                                ? selectedRadio
                                : Radio
                            }
                            alt=""
                            style={{ cursor: "pointer" }}
                          />
                          <span className="px-2">Grandmaster</span>
                        </div>
                        <div className="">
                          {validLevel ? (
                            <small className="text-danger">{validLevel}</small>
                          ) : null}
                        </div>
                      </div>
                    )}

                    <div
                      className={`d-flex justify-content-center my-2 ${
                        props.updateProfile === 2 && "gap-3"
                      }`}
                    >
                      {props.updateProfile === 2 ? (
                        <>
                          <button
                            // data-bs-dismiss="modal"
                            onClick={() => {
                              handleDeactive(
                                partialData.editor_data?.id,
                                "remove"
                              );
                              props.setupdateProfile(1);
                              setAddUser({
                                name: "",
                                username: "",
                                phone: "",
                                password: "",
                                experience: "",
                                city: "",
                                category: "",
                                gender: "",
                                age: "",
                                about: "",
                                membership_date: "",
                              });
                              clearError();
                              setPreveiwProfilePic(null)
                            }}
                            className="px-3 py-1"
                            style={{
                              color: "#FF5757",
                              backgroundColor: "transparent",
                              border: "1px solid #FF5757",
                              borderRadius: "4px",
                            }}
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => {
                              handleDeactive(
                                partialData.editor_data?.id,
                                partialData.editor_data?.is_active
                                  ? "deactive"
                                  : "active"
                              );
                              props.setupdateProfile(1);
                              setAddUser({
                                name: "",
                                username: "",
                                phone: "",
                                password: "",
                                experience: "",
                                city: "",
                                category: "",
                                gender: "",
                                age: "",
                                about: "",
                                membership_date: "",
                              });
                              setPreveiwProfilePic(null)
                            }}
                            // data-bs-dismiss="modal"
                            className="px-3 py-1"
                            style={{
                              color: "#FF9100",
                              backgroundColor: "transparent",
                              border: "1px solid #FF9100",
                              borderRadius: "4px",
                            }}
                          >
                            {partialData.editor_data?.commentator_status == 'active'
                              ? "Active"
                              : "Deactive"} 
                          </button>
                          <button
                            onClick={() => {
                              handleUpdateEditor(
                                partialData.editor_data?.id,
                                addUser.id
                              );
                              setPreveiwProfilePic(null)
                            }}
                            // data-bs-dismiss="modal"
                            className="px-3 py-1"
                            style={{
                              color: "#D2DB08",
                              backgroundColor: "transparent",
                              border: "1px solid #D2DB08",
                              borderRadius: "4px",
                            }}
                          >
                            Update
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            handleNewEditor();
                            setPreveiwProfilePic(null)
                            }}
                          // data-bs-dismiss="modal"
                          className="px-3 py-1"
                          style={{
                            color: "#D2DB08",
                            backgroundColor: "transparent",
                            border: "1px solid #D2DB08",
                            borderRadius: "4px",
                          }}
                        >
                          Create
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              <img
                onClick={() => {
                  setCountryDropDown(false);
                  setCityDropDown(false);
                  setCategoryDropdown(false);
                  setGenderDropDown(false);
                  setAgeDropDown(false);
                  props.setupdateProfile(1);
                  clearError();
                  clearEditorData();
                  setshowHistory(false);
                  setAddUser({
                    name: "",
                    username: "",
                    phone: "",
                    password: "",
                    experience: "",
                    city: "",
                    category: "",
                    gender: "",
                    age: "",
                    about: "",
                    membership_date: "",
                  });
                  setPreveiwProfilePic(null)
                }}
                data-bs-dismiss="modal"
                src={cross}
                alt=""
                style={{
                  position: "absolute",
                  top: "-1rem",
                  right: "-1.1rem",
                  cursor: "pointer",
                }}
                height={45}
                width={45}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <div
        class="modal fade"
        id="filterModal"
        tabindex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body dark-mode position-relative">
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Level"
                    options={LevelOptions}
                    selectedOption={selectedLevelFilter}
                    onSelectOption={handleLevelFilterSelection}
                    isOpen={levelFilterDropDown}
                    toggleDropdown={toggleLevelFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Success Rate"
                    options={SuccessRateFilterOptions}
                    selectedOption={selectedSuccessRateFilter}
                    onSelectOption={handleSuccessRateFilterSelection}
                    isOpen={successRateFilterDropDown}
                    toggleDropdown={toggleSuccessRateFilterDropdown}
                  />
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Score Point"
                    options={ScorePointFilterOptions}
                    selectedOption={selectedScorePointFilter}
                    onSelectOption={handleScorePointFilterSelection}
                    isOpen={scorePointFilterDropDown}
                    toggleDropdown={toggleScorePointFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <div className="my-2">
                    <span>City</span>
                    <div
                      className={`${"customDropdown-dark-mode"} p-1 text-center`}
                      onClick={toggleCityFilterDropdown}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{selectedCityFilter}</span>
                    </div>
                    <div
                      className={`customDropdown-content-dark-mode p-2 flex-column d-flex text-center ${
                        cityFilterDropDown ? "d-block" : "d-none"
                      }`}
                      style={{
                        width: "45%",
                        cursor: "pointer",
                      }}
                    >
                      {CityFilterOptions.map((option, index) => (
                        <span
                          className="dpcontent-dark-mode my-1 p-2"
                          key={index}
                          onClick={() => {
                            handleCityFilterSelection(option);
                            toggleCityFilterDropdown();
                          }}
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-0 p-2 gap-3">
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Gender"
                    options={GenderFilterOptions}
                    selectedOption={selectedGenderFilter}
                    onSelectOption={handleGenderFilterSelection}
                    isOpen={genderFilterDropDown}
                    toggleDropdown={toggleGenderFilterDropdown}
                  />
                </div>
                <div className="col d-flex flex-column">
                  <CustomDropdown
                    label="Age"
                    options={ageFilterOptions}
                    selectedOption={selectedAgeFilter}
                    ap-2
                    onSelectOption={handleAgeFilterSelection}
                    isOpen={ageFilterDropDown}
                    toggleDropdown={toggleAgeFilterDropdown}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-2">
                <button
                  data-bs-dismiss="modal"
                  onClick={() => handleEditorFiltor()}
                  className="px-3 py-1"
                  style={{
                    color: "#D2DB08",
                    backgroundColor: "transparent",
                    border: "1px solid #D2DB08",
                    borderRadius: "4px",
                  }}
                >
                  Show
                </button>
              </div>
            </div>
            <img
              onClick={() => {
                setLevelFilterDropDown(false);
                setSuccessRateFilterDropDown(false);
                setScorePointFilterDropDown(false);
                setCityFilterDropDown(false);
                setAgeFilterDropDown(false);
                setGenderFilterDropDown(false);
              }}
              data-bs-dismiss="modal"
              src={cross}
              alt=""
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1.1rem",
                cursor: "pointer",
              }}
              height={45}
              width={45}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorManagemenet;
