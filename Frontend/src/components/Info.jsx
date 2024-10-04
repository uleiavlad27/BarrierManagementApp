import Description from "./Description";
import Map from "./Map";

const Info = () => {
    return (
        <div className="h-screen bg-slate-100 flex flex-col items-center">
            <div className="flex flex-row w-full h-1/2 max-w-7xl">
                
                <div className="w-1/2 h-full p-4 flex justify-center">
                    <Description />
                </div>
                <div className="w-1/2 h-full p-4 flex justify-center">
                    <div className="border-4 rounded-lg w-full h-full">
                        <Map />
                    </div>
                </div>
            </div>
            <div className="text-center m-6">
                <a 
                    href="https://maps.app.goo.gl/k8rUGufdT1eZeXxH6"
                    className="text-white border-2 p-4 rounded-xl bg-cyan-700 hover:bg-cyan-800 transition-all"
                >
                    Get Directions
                </a>
            </div>
        </div>
    );
}

export default Info;
