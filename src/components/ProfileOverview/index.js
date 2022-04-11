const ProfileOverview = ({
                             user =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: ""}
                         }) => {
    return (
        <>
            <div>
                <h2>Public:</h2>
                {user.username &&
                    <div className={`fw-bold`}>Username:<span className={`fw-normal `}>{user.username}</span></div>
                }
                {user.firstName &&
                    <div className={`fw-bold`}>First Name:<span className={`fw-normal ps-1`}>{user.firstName}</span></div>
                }
                {user.lastName &&
                    <div className={`fw-bold`}>Last Name:<span className={`fw-normal ps-1`}>{user.lastName}</span></div>
                }
            </div>
            <br/>
            <div>
                <h2>Private:</h2>
                {user.phone &&
                    <div className={`fw-bold`}>Phone Number:<span className={`fw-normal ps-1`}>{user.phone}</span></div>
                }
            </div>
        </>

    )
};
export default ProfileOverview;