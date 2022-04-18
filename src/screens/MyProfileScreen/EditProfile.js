const EditProfile = ({
                         user =
                             {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "123456"},
                         inputOnChangeHandler, saveOnClickHandler
                     }) => {
    return (
        <>
            <div className={`row`}>
                <div className={`col-4`} ></div>
                <div className={`bg-light col-4 p-3`}  align={`center`} >
                    <div>
                        <label className={"form-label m-2 fw-bold"} align={`left`}>
                            Username:
                            <input className={"form-control"} type={"text"} value={user.username ? user.username : ""}
                                   onChange={(e) => inputOnChangeHandler(e, "username")}/>
                        </label>
                    </div>
                    <div>
                        <label className={"form-label m-2  fw-bold"} align={`left`}>
                            First Name:
                            <input className={"form-control"} type={"text"} value={user.firstName ? user.firstName : ""}
                                   onChange={(e) => inputOnChangeHandler(e, "firstName")}/>
                        </label>
                    </div>
                    <div>
                        <label className={"form-label m-2  fw-bold"} align={`left`}>
                            Last Name:
                            <input className={"form-control"} type={"text"} value={user.lastName ? user.lastName : ""}
                                   onChange={(e) => inputOnChangeHandler(e, "lastName")}/>
                        </label>
                    </div>
                    <div>
                        <label className={"form-label m-2  fw-bold "} align={`left`}>
                            Phone:
                            <input className={"form-control"} type={"text"} value={user.phone ? user.phone : ""}
                                   onChange={(e) => inputOnChangeHandler(e, "phone")}/>
                        </label>
                    </div>
                    <button className={"btn btn-primary m-2 w-50"} onClick={saveOnClickHandler}>Save</button>
                </div>
            </div>

        </>
    )
};
export default EditProfile;