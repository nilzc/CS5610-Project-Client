const ProfileOverview = ({
                             user =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: ""}
                         }) => {
    return (
        <div style={{marginTop: '20px'}}>
            Public:
            {user.username && <div>Username: {user.username}</div>}
            {user.firstName && <div>First Name: {user.firstName}</div>}
            {user.lastName && <div>Last Name: {user.lastName}</div>}
            Private:
            {user.phone && <div>Phone (private): {user.phone}</div>}
        </div>
    )
};
export default ProfileOverview;