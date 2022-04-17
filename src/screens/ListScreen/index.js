import {useParams} from "react-router-dom";

const ListScreen = () => {
    let params = useParams();
    return (
        <div >
            List id: {params.lid ? params.lid : ""}
        </div>
    )
};
export default ListScreen;