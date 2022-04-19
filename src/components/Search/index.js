import './index.css';

const Search = ({inputOnChangeHandler, submitHandler}) => {
    return (
        <div className={"m-3"}>
            <div className="search">
                <h4 className={`text-primary`}>Search For Movies</h4>
                <div className={"d-inline-block"}>
                <input className="form-control mb-3 mt-2" type="text" placeholder="Enter A Movie Name" required
                       onChange={(e) => inputOnChangeHandler(e)} />
                </div>
            </div>
            {submitHandler && <button className={"btn btn-primary mb-3"} onClick={submitHandler}>Submit</button>}
        </div>
    )
};
export default Search;