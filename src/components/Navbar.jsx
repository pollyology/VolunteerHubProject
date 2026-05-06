import MButton from "./MButton";

function Navbar() {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            
            {/* Left Side Links */}
            <div>
                <MButton style={{ marginLeft: '5px' }} text="Back" linkTo="/back" />
                <MButton text="Volunteer Hub" linkTo="/" />
            </div> 
            
            {/* Right Side Links */}
            <div>
                <MButton text="Home" linkTo="/" />
                <MButton text="About" linkTo="/about" /> 
                <MButton text="Login" linkTo="/login" /> 
            </div> 
            
        </nav>
    );
}

export default Navbar;