export default function Card({ children, flipped, opened, ...rest }) {
  return (
    <button
      className={`flex font-bold relative items-center group justify-center text-6xl h-[140px] perspective-1000 transition-all ${ !(flipped || opened) ? 'hover:-translate-y-0.5 hover:scale-105' : '' }`}
      {...rest}
    >
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 z-10">
        <svg className={`w-20 h-20 text-emerald-500 delay-500 duration-100 opacity-0 ${opened ? 'scale-100 opacity-75' : 'scale-0'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>
      </div>
      <div className={`rounded-md flex text-emerald-800 items-center justify-center absolute w-full h-full inset-0 bg-white backface-hidden transition-all duration-500 ${flipped || opened ? 'rotate-y-0' : 'rotate-y-180'} ${opened ? 'opacity-80' : ''}`}>
        {flipped || opened ? children : null}
      </div>
      <div className={`rounded-md absolute w-full h-full inset-0 duration-500 bg-emerald-700 backface-hidden ${flipped || opened ? 'rotate-y-180' : 'rotate-y-0'}`}></div>
    </button>
  )
}
