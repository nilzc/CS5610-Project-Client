import './index.css';

const Search = ({inputOnChangeHandler, submitHandler}) => {
    return (
        <div>

                <div className="flexbox101">
                    <div className="search">
                        <h4 className={`text-primary`}>Search For Movies</h4>
                        <div>
                        <input className="mb-3 mt-2" type="text" placeholder="Enter A Movie Name To Add In List :)" required  onChange={(e) => inputOnChangeHandler(e)} />
                        </div>
                    </div>
                </div>

            {submitHandler && <button className={"btn btn-primary mb-3"} onClick={submitHandler}>Submit</button>}
        </div>
    )
};
export default Search;