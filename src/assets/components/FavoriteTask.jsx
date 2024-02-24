import FavoriteIcon from "./FavoriteIcon.jsx";
import dateIcon from '/calendar.svg';
import clockIcon from '/clock.svg';
import {options} from "./dateOptions.js";

export default function FavoriteTask({favorite, onAddFavorite, handleDeleteFavorite, remove}) {
    let currentLang = 'en-US';
    const formatDate = new Date().toLocaleDateString(currentLang, options);

    let colorFlag = {date: '', time: ''};
    const currentMs = new Date().getTime();

    const ONE_WEEK_MS = 604800000;

    function timeChecker(item) {
        if (item.time === '—') {
            colorFlag.time = ' text-gray-600';
        }
    }

    return (
        <>
            {favorite.length > 0 && <ul className="rounded-lg">{favorite.map(item => {
                let itemMs = new Date(item.dueDate).getTime();
                if ((item.dueDateFormat === formatDate) || currentMs - itemMs >= 0) {
                    colorFlag.date = ' text-red-600';
                    colorFlag.time = ' text-red-600';
                    timeChecker(item);
                } else if (itemMs - currentMs <=  ONE_WEEK_MS) {
                    colorFlag.date = ' text-green-600';
                    colorFlag.time = ' text-green-600';
                    timeChecker(item);
                } else if ((itemMs - currentMs >  ONE_WEEK_MS) || (item.dueDate === '')){
                    colorFlag.date = ' text-gray-600';
                    colorFlag.time = ' text-gray-600';
                }
                return <li className="text-xl rounded-lg bg-stone-300 my-4 p-2 border-4 border-solid border-yellow-500" key={item.id}>
                    <div className="flex justify-between">
                        <span className="break-all mx-0 my-auto">{item.text}</span>
                        <div className="flex"> <button onClick={() => handleDeleteFavorite(item.id)} className=" px-4 py-3 font-medium text-black font-sans hover:text-red-700 transition-colors">Clear</button>
                            <FavoriteIcon remove={() => remove(item.id)} isFavorite={true} handleDeleteFavorite={handleDeleteFavorite} onAddFavorite={() => onAddFavorite(item.id)} task={favorite}/></div>
                    </div>
                    <div className="font-bold flex gap-5">
                        <div className="flex justify-center items-center gap-2">
                            <img src={dateIcon} alt="date"/><span className={`font-medium ${colorFlag.date}`}>{item.dueDateFormat}</span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <img src={clockIcon} alt="date"/><span className={`font-medium ${colorFlag.time}`}>{item.time}</span>
                        </div>
                    </div>
                </li>})}</ul>}
        </>
    );
}