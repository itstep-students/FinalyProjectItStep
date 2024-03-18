const LanguagesSelect = ({options, value, onChange, languages}) => {
    return (
        <div className='flex h-8 items-center mt-16 mr-10 gap-4'>
            <p className='text-stone-900 text-2xl font-sans'>{languages.language}:</p>
            <select value={value} onChange={event => onChange(event.target.value)}
                    className=' h-8 bg-transparent text-stone-800 text-xl font-bold font-sans'>
                {options.map((item, index) => <option className='bg-stone-400 border-none' key={index}
                                                      value={item.value}>{item.lang}</option>)}
            </select>
        </div>
    );
};

export default LanguagesSelect;