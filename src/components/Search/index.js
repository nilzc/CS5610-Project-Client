const Search = ({inputOnChangeHandler, submitHandler}) => {
    return (
        <div>
            <label className={"form-label"}>
                Search:
                <input className={"form-control"} type={"text"}
                       onChange={(e) => inputOnChangeHandler(e)}/>
            </label>
            <button className={"btn btn-primary"} onClick={submitHandler}>Submit</button>
        </div>
    )
};
export default Search;