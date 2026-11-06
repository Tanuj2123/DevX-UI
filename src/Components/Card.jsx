import { USER_DEFAULT_URL } from "../utils/constants";


const Card = ({data})=>{

    const {photoUrl,name,age,gender} = data;
    return (
        <div className="card card-side w-full max-w-md overflow-hidden rounded-2xl bg-base-300 shadow-lg m-3">
            <figure className="w-36 shrink-0 p-3">
                <img
                className="h-full min-h-48 w-full rounded-xl object-cover"
                src={photoUrl?photoUrl:USER_DEFAULT_URL}
                alt={`${name}'s profile`}
                />
            </figure>

            <div className="card-body justify-between gap-3 p-4">
                <div>
                <h2 className="card-title text-2xl font-bold">{name}</h2>
                <p className="mt-1 text-sm text-base-content/70">
                    {age} years old <span aria-hidden="true">·</span> {gender}
                </p>
                </div>

                <div className="card-actions">
                <button type="button" className="btn  btn-sm rounded-full px-5">
                    Ignore
                </button>
                <button type="button" className="btn btn-secondary btn-sm rounded-full px-5">
                    Send
                </button>
                </div>
            </div>
        </div>
    )
}

export default Card;