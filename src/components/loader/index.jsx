import './styles.css'

const Loader = () => {
    return (
        // <div className="loaderContainer">
        //     <h2 data-text='Loading...'>Loading...</h2>
        // </div>
        <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
        </div>
    )
}

export default Loader;