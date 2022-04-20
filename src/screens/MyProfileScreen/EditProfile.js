import {CLOUD_NAME, getDateYYYYMMDD} from "../../services/utils";

const EditProfile = ({
                         user =
                             {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "123456"},
                         inputOnChangeHandler, saveOnClickHandler, fileUploadHandler
                     }) => {
    return (
        <>
            <div className={`row`}>
                <div className={"col-12"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-4 bg-light p-3"}>
                            <div className={"row justify-content-center"}>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Username:</div>
                                    <input className={"form-control"} type={"text"} value={user.username ? user.username : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "username")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>First Name:</div>
                                    <input className={"form-control"} type={"text"} value={user.firstName ? user.firstName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "firstName")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Last Name:</div>
                                    <input className={"form-control"} type={"text"} value={user.lastName ? user.lastName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "lastName")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Phone:</div>
                                    <input className={"form-control"} type={"text"} value={user.phone ? user.phone : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "phone")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    <div className={"mb-2"}>Date of Birth:</div>
                                    <input className="form-control"
                                           type="date" value={user.dateOfBirth ? getDateYYYYMMDD(user.dateOfBirth) : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "dateOfBirth")}/>
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