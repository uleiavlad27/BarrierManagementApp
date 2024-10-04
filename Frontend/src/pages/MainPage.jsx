import AddCar from "../components/AddCar"
import DeleteCar from '../components/DeleteCar'
import ShowCar from "../components/ShowCar"
import ShowLogs from '../components/ShowLogs'


const MainPage = () => {






    return (
        <>
            <div className="m-12 border-4 rounded-xl border-gray-300 bg-slate-50">
                <AddCar />
                <div>
                    <DeleteCar />
                </div>
                <div className="flex w-full ">
                    <div className="w-1/4">
                        <ShowCar />
                    </div>

                    <div className="w-3/4">
                        <ShowLogs />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage