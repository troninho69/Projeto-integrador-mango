import "./Status.css";

export default function Status(props) {
  return (
    <>
      <div className="flex flex-col items-center cursor-pointer flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-white">
          <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
            <img src={props.img} className="w-full h-full object-cover"></img>
          </div>
        </div>
      </div>
    </>
  );
}
