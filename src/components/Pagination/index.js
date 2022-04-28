const Pagination = ({currPage, setCurrPage, pages, setPages, allowNextPages}) => {
    const pageOnClick = (e) => {
        const pageNum = parseInt(e.target.textContent);
        changePage(pageNum);
    }
    const changePage = (pageNum) => {
        setCurrPage(pageNum)
        if (pageNum === 1) {
            setCurrPage(1);
            setPages([1, 2, 3, 4, 5]);
        } else if (pageNum >= pages.at(4)) {
            pageNum = pages.at(4)
            const newPages = [];
            for (let i = 0; i < 5; i++) {
                newPages.push(pageNum + i);
            }
            setPages(newPages);
        } else if (pageNum <= pages.at(0)) {
            pageNum = pages.at(0);
            const newPages = [];
            for (let i = 4; i >= 0; i--) {
                newPages.push(pageNum - i);
            }
            setPages(newPages);
        }
    }
    const firstOnClick = () => {
        changePage(1);
    }
    const previousOnClick = () => {
        if (currPage > 1) {
            changePage(currPage-1)
        }
    }
    const nextOnClick = () => {
        changePage(currPage+1)
    }
    return (
        <nav className={"p-4 pb-1"}>
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <div className="page-link" onClick={firstOnClick}>First</div>
                </li>
                <li className="d-none d-md-block page-item">
                    <div className="page-link" onClick={previousOnClick}>Previous</div>
                </li>
                {
                    pages.map((p, nth) =>
                        <li key={nth} className={`page-item ${currPage === p ? "active" : ""} ${!allowNextPages && p > currPage ? "disabled" : ""}`}>
                            <div className="page-link" onClick={pageOnClick}>{p}</div>
                        </li>)
                }
                <li className={`d-none d-md-block page-item ${allowNextPages ? "" : "disabled"}`}>
                    <div className={"page-link"} onClick={nextOnClick}>Next</div>
                </li>
            </ul>
        </nav>
    )
};
export default Pagination;