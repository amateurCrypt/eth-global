// import viteLogo from '/vite.svg'
import ethLogo from '/eth-logo.svg'

export default function NavBar() {
    return (
        <div className="navbar">
            <img  className="logo" src={ethLogo} />
            <h1 className='nav-head'>D-risk</h1>
        </div>
    )
}