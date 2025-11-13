import "./TabsMusicas.css"
import MusicasCards from "../MusicasCards/Index";
import teste from "../../../assets/img/OIP.webp";

export default function TabsMusicas() {
    return (
        <div className="flex mb-6 mx-5 justify-center">
            <div class="grid grid-cols-4 gap-4 flex-shrink-0">
                <MusicasCards img={teste}/>
                <MusicasCards/>
                <MusicasCards/>
                <MusicasCards/>
            </div>
        </div>
    )
}