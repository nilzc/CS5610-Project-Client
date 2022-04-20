import {getDateYYYYMMDD} from "../../services/utils";

const EditProfile = ({
                         user =
                             {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "123456"},
                         inputOnChangeHandler, saveOnClickHandler
                     }) => {
    return (
        <>
            <div className={`row`}>
                <div className={"col-12"}>
                    <div className={"row justify-content-center"}>
                        <div className={"col-4 bg-light p-3"}>
                            <div className={"row justify-content-center"}>
                                <label className={"col-10 form-label fw-bold"}>
                                    Username:
                                    <input className={"form-control"} type={"text"} value={user.username ? user.username : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "username")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    First Name:
                                    <input className={"form-control"} type={"text"} value={user.firstName ? user.firstName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "firstName")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    Last Name:
                                    <input className={"form-control"} type={"text"} value={user.lastName ? user.lastName : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "lastName")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    Phone:
                                    <input className={"form-control"} type={"text"} value={user.phone ? user.phone : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "phone")}/>
                                </label>
                                <label className={"col-10 form-label fw-bold"}>
                                    Date of birth:
                                    <input className="form-control"
                                           type="date" value={user.dateOfBirth ? getDateYYYYMMDD(user.dateOfBirth) : ""}
                                           onChange={(e) => inputOnChangeHandler(e, "dateOfBirth")}/>
                                </label>
                                <button className={"col-4 m-3 btn btn-primary w-50"} onClick={saveOnClickHandler}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
export default EditProfile;