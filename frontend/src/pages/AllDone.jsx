import { Link } from "react-router-dom"

export default function AllDone() {

    return (
        <>
            <h1>ordine effettuato con successo</h1>
            <button><Link to='/'>Torna alla Home</Link> </button>

        </>
    )
}