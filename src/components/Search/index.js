import './index.css';

const Search = ({inputOnChangeHandler, submitHandler}) => {
    return (
        <div>

                <div class="flexbox101">
                    <div class="search">
                        <h3>Search For Movies</h3>
                        <div>
                        <input type="text" placeholder="Enter A Movie Name To Add In List :)" required  onChange={(e) => inputOnChangeHandler(e)} />
                        </div>
                    </div>
                </div>
                {/* <input className={"form-control"} type={"text"}
                       onChange={(e) => inputOnChangeHandler(e)}/> */}

            {/* <button className={"btn btn-primary"} onClick={submitHandler}>Submit</button> */}
        </div>
    )
};
export default Search;