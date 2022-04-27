import {CLOUD_NAME, getDateYYYYMMDD, MY, MY_PROFILE_URL, UPLOAD_PRESET} from "../../services/utils";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import * as cloudServices from "../../services/cloudinaryServices";
import * as userServices from "../../services/userService";
import {useNavigate} from "react-router-dom";

const EditProfile = ({refresh}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "", firstName: "", lastName: "", phone: ""});
    const findProfile = useCallback(
        () => {
            authService.profile().then((u) => {
                // remove password
                delete u["password"];
                setUser(u);
            }).catch(e => alert(e.response.data.error));
        }, []
    );
    const fileUploadHandler = (e, field) => {
        if (e.target.files) {
            const tempUser = {...user}
            tempUser[field] = e.target.files[0];
            setUser(tempUser);
        }
    }
    const inputOnChangeHandler = (e, field) => {
        const tempUser = {...user};
        tempUser[field] = e.target.value;
        setUser(tempUser);
    }
    const saveOnClickHandler = async (e) => {
        if (user.profilePhoto instanceof File) {
            const formData = new FormData();
            formData.append("file", user.profilePhoto);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await cloudServices.uploadImage(formData).catch(alert);
            user.profilePhoto = res.public_id;
        }
        if (user.headerImage instanceof File) {
            const formData = new FormData();
            formData.append("file", user.headerImage);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await cloudServices.uploadImage(formData).catch(alert);
            user.headerImage = res.public_id;
        }
        if (!user.password || !user.password.trim()) {
            delete user.password;
        }
        await userServices.updateUser(MY, user).catch(err => alert(err.response.data.error));
        await refresh()
        navigate(MY_PROFILE_URL);
        alert("Profile updated!");
    }
    useEffect(findProfile, [findProfile]);
    return (
        <>
            <div className={"row"}>
                <div className={"col-12"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-4 bg-light p-3"}>
                            <div className={"row justify-content-center"}>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Username:</div>
                                    <input className={"form-control"} type={"text"} value={user.username ? user.username : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "username")}
                                           placeholder={"username"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Password:</div>
                                    <input className={"form-control"} type={"password"} value={user.password ? user.password : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "password")}
                                           placeholder={"password"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>First Name:</div>
                                    <input className={"form-control"} type={"text"} value={user.firstName ? user.firstName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "firstName")}
                                           placeholder={"first name"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Last Name:</div>
                                    <input className={"form-control"} type={"text"} value={user.lastName ? user.lastName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "lastName")}
                                           placeholder={"last name"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Email:</div>
                                    <input className={"form-control"} type={"email"} value={user.email ? user.email : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "email")}
                                           placeholder={"email"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Phone:</div>
                                    <input className={"form-control"} type={"text"} value={user.phone ? user.phone : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "phone")}
                                           placeholder={"phone"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Date of Birth:</div>
                                    <input className="form-control"
                                           type="date" value={user.dateOfBirth ? getDateYYYYMMDD(user.dateOfBirth) : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "dateOfBirth")}
                                           placeholder={"date of birth"}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Profile Photo:</div>
                                    <input type="file" accept={".jpg,.jpeg,.png"} className="form-control"
                                           onChange={(e) => fileUploadHandler(e, "profilePhoto")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Header Image:</div>
                                    <input type="file" accept={".jpg,.jpeg,.png"} className="form-control"
                                           onChange={(e) => fileUploadHandler(e, "headerImage")}/>
                                </label>
                                <button className={"col-4 mt-3 mb-2 btn btn-primary w-50"} onClick={saveOnClickHandler}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
export default EditProfile;