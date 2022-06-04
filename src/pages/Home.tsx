import { useEffect,useState } from "react";
import { API_URL,API_KEY,IMAGE_URL } from "../config/config"
import MainImage from "../components/MainImage"
import GridCards from "../components/GridCards";
import { Link } from "react-router-dom";


export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies([...response.results])
            setMainMovieImage(response.results[0])
        })
    },[])

    return (
        <>
            <MainImage 
            image={`${IMAGE_URL}w780${MainMovieImage?.backdrop_path}`}
            title={MainMovieImage?.original_title}
            text={MainMovieImage?.overview}/>
            <section>
                <div className="w-4/5 my-4 mx-auto">
                    <h2 className="text-2xl font-bold">최신 인기 영화</h2>
                    <hr/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-3 w-5/6 m-auto">
                    {Movies && Movies.map((movie,index) => (
                        <Link to={`/movies/${movie.id}`} key={index}><GridCards 
                        image={movie.poster_path ? `${IMAGE_URL}w500${movie.poster_path}`: null}
                        movieName={movie.original_title}
                        /></Link>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className="btn btn-secondary text-xl">더 가져오기!</button>
                </div>
            </section>
        </>
    );
};

export default HomePage;

