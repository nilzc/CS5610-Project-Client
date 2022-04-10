import './index.css';

const Search = ({inputOnChangeHandler, submitHandler}) => {
    return (
        <div>

                <div className="flexbox101">
                    <div className="search">
                        <h3>Search For Movies</h3>
                        <div>
                        <input type="text" placeholder="Enter A Movie Name To Add In List :)" required  onChange={(e) => inputOnChangeHandler(e)} />
                        </div>
                    </div>
                </div>

            {submitHandler && <button className={"btn btn-primary"} onClick={submitHandler}>Submit</button>}
        </div>
    )
};
export default Search;